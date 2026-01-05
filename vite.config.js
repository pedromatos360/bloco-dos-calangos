import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const readJsonFile = (filePath, fallback) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

const writeJsonFile = (filePath, data) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

const mimeToExtension = (mimeType) => {
  const value = String(mimeType || '').toLowerCase()
  if (value.includes('image/jpeg') || value.includes('image/jpg')) return '.jpg'
  if (value.includes('image/png')) return '.png'
  if (value.includes('image/webp')) return '.webp'
  if (value.includes('image/gif')) return '.gif'
  if (value.includes('image/svg+xml')) return '.svg'
  if (value.includes('image/avif')) return '.avif'
  if (value.includes('image/bmp')) return '.bmp'
  return '.png'
}

const sanitizeFileName = (value) => {
  const base = path.basename(String(value || ''))
  const normalized = base.replace(/[^a-zA-Z0-9._-]/g, '_')
  return normalized || ''
}

const ensureExtension = (fileName, extension) => {
  if (!fileName) {
    return ''
  }
  return path.extname(fileName) ? fileName : `${fileName}${extension}`
}

const uniqueFileName = (dir, fileName) => {
  if (!fileName) {
    return ''
  }
  let candidate = fileName
  let counter = 1
  const ext = path.extname(fileName)
  const stem = path.basename(fileName, ext)
  while (fs.existsSync(path.join(dir, candidate))) {
    candidate = `${stem}-${counter}${ext}`
    counter += 1
  }
  return candidate
}

const parseDataUrl = (value) => {
  const match = String(value || '').match(/^data:([^;]+);base64,(.+)$/)
  if (!match) {
    return null
  }
  return {
    mimeType: match[1],
    buffer: Buffer.from(match[2], 'base64'),
  }
}

const fetchImageBuffer = async (imageUrl) => {
  const response = await fetch(imageUrl)
  if (!response.ok) {
    throw new Error('image_download_failed')
  }
  const buffer = Buffer.from(await response.arrayBuffer())
  const mimeType = response.headers.get('content-type') || ''
  return { buffer, mimeType }
}

const readBody = (req) =>
  new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      if (!body) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(body))
      } catch {
        resolve(null)
      }
    })
  })

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

const createLocalJsonApi = ({ dataDir, adminSecret }) => {
  const sponsorsPath = path.join(dataDir, 'sponsors.json')
  const adminsPath = path.join(dataDir, 'admins.json')
  const imagesDir = path.join(process.cwd(), 'public', 'img')

  const createId = () =>
    `sp_${Date.now()}_${Math.random().toString(16).slice(2)}`

  const saveImageBuffer = (buffer, fileName) => {
    fs.mkdirSync(imagesDir, { recursive: true })
    const safeName = sanitizeFileName(fileName)
    const finalName = uniqueFileName(imagesDir, safeName)
    fs.writeFileSync(path.join(imagesDir, finalName), buffer)
    return finalName
  }

  const persistImage = async ({ image, imageUrl, fileName }) => {
    const source =
      typeof imageUrl === 'string' && imageUrl.trim()
        ? imageUrl.trim()
        : typeof image === 'string'
          ? image.trim()
          : ''
    if (!source) {
      return ''
    }
    if (source.startsWith('data:')) {
      const parsed = parseDataUrl(source)
      if (!parsed) {
        return ''
      }
      const extension = mimeToExtension(parsed.mimeType)
      const baseName = ensureExtension(
        sanitizeFileName(fileName) ||
          `img_${Date.now()}_${Math.random().toString(16).slice(2)}`,
        extension,
      )
      return saveImageBuffer(parsed.buffer, baseName)
    }
    if (source.startsWith('http')) {
      const { buffer, mimeType } = await fetchImageBuffer(source)
      const extension = mimeToExtension(mimeType)
      let urlName = ''
      try {
        urlName = path.basename(new URL(source).pathname)
      } catch {
        urlName = ''
      }
      const baseName = ensureExtension(
        sanitizeFileName(fileName) || sanitizeFileName(urlName) || '',
        extension,
      )
      const finalName =
        baseName ||
        `img_${Date.now()}_${Math.random().toString(16).slice(2)}${extension}`
      return saveImageBuffer(buffer, finalName)
    }
    return path.basename(source)
  }

  const setup = (middlewares) => {
    middlewares.use('/api/sponsors', async (req, res, next) => {
      const url = new URL(req.url ?? '/', 'http://localhost')
      const segments = url.pathname.split('/').filter(Boolean)
      const id = segments[0]

      if (req.method === 'GET' && !id) {
        const sponsors = readJsonFile(sponsorsPath, [])
        sendJson(res, 200, sponsors)
        return
      }

      if (req.method === 'POST' && !id) {
        const body = await readBody(req)
        if (
          !body ||
          typeof body.name !== 'string' ||
          (typeof body.image !== 'string' && typeof body.imageUrl !== 'string')
        ) {
          sendJson(res, 400, { error: 'invalid_payload' })
          return
        }
        let storedImage = ''
        try {
          storedImage = await persistImage({
            image: body.image,
            imageUrl: body.imageUrl,
            fileName: body.fileName,
          })
        } catch {
          sendJson(res, 400, { error: 'invalid_image' })
          return
        }
        if (!storedImage) {
          sendJson(res, 400, { error: 'invalid_image' })
          return
        }
        const now = new Date().toISOString()
        const sponsors = readJsonFile(sponsorsPath, [])
        const sponsor = {
          id: typeof body.id === 'string' ? body.id : createId(),
          name: body.name,
          image: storedImage,
          status: typeof body.status === 'boolean' ? body.status : true,
          createdAt: now,
          updatedAt: now,
        }
        sponsors.push(sponsor)
        writeJsonFile(sponsorsPath, sponsors)
        sendJson(res, 201, sponsor)
        return
      }

      if (req.method === 'PATCH' && id) {
        const body = await readBody(req)
        const sponsors = readJsonFile(sponsorsPath, [])
        const index = sponsors.findIndex((entry) => entry.id === id)
        if (index < 0) {
          sendJson(res, 404, { error: 'not_found' })
          return
        }
        const current = sponsors[index]
        const nextName =
          typeof body?.name === 'string' && body.name.trim()
            ? body.name.trim()
            : current.name
        let nextImage = current.image
        if (
          typeof body?.image === 'string' ||
          typeof body?.imageUrl === 'string'
        ) {
          try {
            const storedImage = await persistImage({
              image: body.image,
              imageUrl: body.imageUrl,
              fileName: body.fileName,
            })
            if (storedImage) {
              nextImage = storedImage
            }
          } catch {
            sendJson(res, 400, { error: 'invalid_image' })
            return
          }
        }
        const updated = {
          ...current,
          name: nextName,
          status:
            typeof body?.status === 'boolean' ? body.status : current.status,
          image: nextImage,
          updatedAt: new Date().toISOString(),
        }
        sponsors[index] = updated
        writeJsonFile(sponsorsPath, sponsors)
        sendJson(res, 200, sponsors)
        return
      }

      next()
    })

    middlewares.use('/api/admins', async (req, res, next) => {
      const url = new URL(req.url ?? '/', 'http://localhost')
      const segments = url.pathname.split('/').filter(Boolean)
      const action = segments[0]

      if (req.method === 'GET' && !action) {
        const admins = readJsonFile(adminsPath, [])
        sendJson(res, 200, admins)
        return
      }

      if (req.method === 'POST' && action === 'reset') {
        const body = await readBody(req)
        if (
          !body ||
          typeof body.email !== 'string' ||
          typeof body.passwordHash !== 'string' ||
          typeof body.resetKey !== 'string'
        ) {
          sendJson(res, 400, { error: 'invalid_payload' })
          return
        }
        if (!adminSecret || body.resetKey !== adminSecret) {
          sendJson(res, 403, { error: 'invalid_key' })
          return
        }
        const admins = readJsonFile(adminsPath, [])
        const index = admins.findIndex(
          (entry) =>
            String(entry.email).toLowerCase() === body.email.toLowerCase(),
        )
        if (index < 0) {
          sendJson(res, 404, { error: 'not_found' })
          return
        }
        const updated = {
          ...admins[index],
          passwordHash: body.passwordHash,
          updatedAt: new Date().toISOString(),
        }
        admins[index] = updated
        writeJsonFile(adminsPath, admins)
        sendJson(res, 200, updated)
        return
      }

      next()
    })
  }

  return {
    name: 'local-json-api',
    configureServer(server) {
      setup(server.middlewares)
    },
    configurePreviewServer(server) {
      setup(server.middlewares)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const adminSecret = env.VITE_ADMIN_SECRET ?? ''
  const dataDir = fileURLToPath(new URL('./src/data', import.meta.url))

  return {
    plugins: [react(), createLocalJsonApi({ dataDir, adminSecret })],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
