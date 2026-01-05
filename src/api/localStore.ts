import adminSeed from '@/data/admins.json'
import sponsorSeed from '@/data/sponsors.json'

export type Sponsor = {
  id: string
  name: string
  image: string
  status: boolean
  createdAt: string
  updatedAt: string
}

export type AdminUser = {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: string
  updatedAt: string
}

export type AdminSession = {
  id: string
  name: string
  email: string
  loginAt: string
}

const SPONSOR_STORAGE_KEY = 'bloco-sponsors'
const ADMIN_STORAGE_KEY = 'bloco-admins'
const ADMIN_SESSION_KEY = 'bloco-admin-session'
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET ?? ''
const PUBLIC_IMAGE_PREFIX = `${import.meta.env.BASE_URL}img/`

const isBrowser = typeof window !== 'undefined'
const resolveImage = (value: string) => {
  if (!value) {
    return value
  }
  if (value.startsWith('data:')) {
    return value
  }
  if (value.startsWith('http')) {
    return value
  }
  const fileName = value.split('/').pop()?.split('?')[0] ?? value
  const normalized = value.includes('/assets/')
    ? fileName.replace(/^(.*?)-[A-Za-z0-9_-]{8}(\.[^.]+)$/, '$1$2')
    : fileName
  return `${PUBLIC_IMAGE_PREFIX}${normalized}`
}

const apiFetch = async <T>(input: string, init?: RequestInit) => {
  if (!isBrowser) {
    return null
  }
  try {
    const response = await fetch(input, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    })
    if (!response.ok) {
      return null
    }
    return (await response.json()) as T
  } catch {
    return null
  }
}

const parseJSON = <T>(value: string | null, fallback: T): T => {
  if (!value) {
    return fallback
  }
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

const normalizeSponsors = (value: unknown): Sponsor[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return null
      }
      const item = entry as Partial<Sponsor>
      if (!item.id || !item.name || !item.image) {
        return null
      }
      const createdAt =
        typeof item.createdAt === 'string'
          ? item.createdAt
          : new Date().toISOString()
      const updatedAt =
        typeof item.updatedAt === 'string' ? item.updatedAt : createdAt
      return {
        id: String(item.id),
        name: String(item.name),
        image: resolveImage(String(item.image)),
        status: typeof item.status === 'boolean' ? item.status : true,
        createdAt,
        updatedAt,
      }
    })
    .filter(Boolean) as Sponsor[]
}

const fetchSponsorsFromApi = async () => {
  const sponsors = await apiFetch<Sponsor[]>('/api/sponsors')
  if (!sponsors) {
    return null
  }
  const normalized = normalizeSponsors(sponsors)
  saveSponsors(normalized)
  return normalized
}

const normalizeAdmins = (value: unknown): AdminUser[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return null
      }
      const item = entry as Partial<AdminUser>
      if (!item.id || !item.email || !item.passwordHash) {
        return null
      }
      const createdAt =
        typeof item.createdAt === 'string'
          ? item.createdAt
          : new Date().toISOString()
      const updatedAt =
        typeof item.updatedAt === 'string' ? item.updatedAt : createdAt
      return {
        id: String(item.id),
        name: String(item.name ?? 'Admin'),
        email: String(item.email),
        passwordHash: String(item.passwordHash),
        createdAt,
        updatedAt,
      }
    })
    .filter(Boolean) as AdminUser[]
}

const fetchAdminsFromApi = async () => {
  const admins = await apiFetch<AdminUser[]>('/api/admins')
  if (!admins) {
    return null
  }
  const normalized = normalizeAdmins(admins)
  saveAdmins(normalized)
  return normalized
}

const ensureSponsorsSeeded = (): Sponsor[] => {
  const seeded = normalizeSponsors(sponsorSeed)
  if (isBrowser) {
    window.localStorage.setItem(SPONSOR_STORAGE_KEY, JSON.stringify(seeded))
  }
  return seeded
}

const ensureAdminsSeeded = (): AdminUser[] => {
  const seeded = normalizeAdmins(adminSeed)
  if (isBrowser) {
    window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(seeded))
  }
  return seeded
}

const loadSponsors = (): Sponsor[] => {
  if (!isBrowser) {
    return normalizeSponsors(sponsorSeed)
  }
  const stored = parseJSON<unknown>(
    window.localStorage.getItem(SPONSOR_STORAGE_KEY),
    null,
  )
  const normalized = normalizeSponsors(stored)
  if (normalized.length === 0) {
    return ensureSponsorsSeeded()
  }
  return normalized
}

const loadAdmins = (): AdminUser[] => {
  if (!isBrowser) {
    return normalizeAdmins(adminSeed)
  }
  const stored = parseJSON<unknown>(
    window.localStorage.getItem(ADMIN_STORAGE_KEY),
    null,
  )
  const normalized = normalizeAdmins(stored)
  if (normalized.length === 0) {
    return ensureAdminsSeeded()
  }
  return normalized
}

const saveSponsors = (sponsors: Sponsor[]) => {
  if (!isBrowser) {
    return
  }
  window.localStorage.setItem(
    SPONSOR_STORAGE_KEY,
    JSON.stringify(normalizeSponsors(sponsors)),
  )
}

const saveAdmins = (admins: AdminUser[]) => {
  if (!isBrowser) {
    return
  }
  window.localStorage.setItem(
    ADMIN_STORAGE_KEY,
    JSON.stringify(normalizeAdmins(admins)),
  )
}

const createId = () =>
  `sp_${Date.now()}_${Math.random().toString(16).slice(2)}`

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

export const hashAdminPassword = async (email: string, password: string) => {
  if (!ADMIN_SECRET) {
    throw new Error('VITE_ADMIN_SECRET is missing')
  }
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(ADMIN_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${email}:${password}`),
  )
  return toHex(signature)
}

export const getSponsors = async () => {
  const sponsors = await fetchSponsorsFromApi()
  if (sponsors) {
    return sponsors
  }
  return loadSponsors()
}

export const addSponsor = async (payload: {
  name: string
  file?: File | null
  imageUrl?: string
}) => {
  const { name, file, imageUrl } = payload
  if (!file && !imageUrl) {
    throw new Error('Imagem obrigatoria')
  }
  const image = imageUrl?.trim()
    ? imageUrl.trim()
    : await fileToDataUrl(file as File)
  const fileName =
    file?.name ||
    (typeof imageUrl === 'string'
      ? imageUrl.split('/').pop()?.split('?')[0]
      : undefined)
  const apiSponsor = await apiFetch<Sponsor>('/api/sponsors', {
    method: 'POST',
    body: JSON.stringify({ name, image, fileName }),
  })
  if (apiSponsor) {
    return normalizeSponsors([apiSponsor])[0] ?? apiSponsor
  }
  const now = new Date().toISOString()
  const sponsors = loadSponsors()
  const sponsor: Sponsor = {
    id: createId(),
    name,
    image,
    status: true,
    createdAt: now,
    updatedAt: now,
  }
  const updated = [...sponsors, sponsor]
  saveSponsors(updated)
  return sponsor
}

export const toggleSponsorStatus = async (id: string, status: boolean) => {
  const apiSponsors = await apiFetch<Sponsor[]>(`/api/sponsors/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
  if (apiSponsors) {
    return normalizeSponsors(apiSponsors)
  }
  const sponsors = loadSponsors()
  const now = new Date().toISOString()
  const updated = sponsors.map((sponsor) =>
    sponsor.id === id
      ? { ...sponsor, status, updatedAt: now }
      : sponsor,
  )
  saveSponsors(updated)
  return updated
}

export const updateSponsorName = async (id: string, name: string) => {
  const trimmed = name.trim()
  if (!trimmed) {
    throw new Error('Nome obrigatorio')
  }
  const apiSponsors = await apiFetch<Sponsor[]>(`/api/sponsors/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ name: trimmed }),
  })
  if (apiSponsors) {
    return normalizeSponsors(apiSponsors)
  }
  const sponsors = loadSponsors()
  const now = new Date().toISOString()
  const updated = sponsors.map((sponsor) =>
    sponsor.id === id
      ? { ...sponsor, name: trimmed, updatedAt: now }
      : sponsor,
  )
  saveSponsors(updated)
  return updated
}

export const getAdminSession = (): AdminSession | null => {
  if (!isBrowser) {
    return null
  }
  const session = parseJSON<AdminSession | null>(
    window.localStorage.getItem(ADMIN_SESSION_KEY),
    null,
  )
  if (!session || typeof session !== 'object') {
    return null
  }
  return session
}

export const loginAdmin = async (email: string, password: string) => {
  const admins = (await fetchAdminsFromApi()) ?? loadAdmins()
  const admin = admins.find(
    (entry) => entry.email.toLowerCase() === email.toLowerCase(),
  )
  if (!admin) {
    return null
  }
  const hash = await hashAdminPassword(admin.email, password)
  if (hash !== admin.passwordHash) {
    return null
  }
  const session: AdminSession = {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    loginAt: new Date().toISOString(),
  }
  if (isBrowser) {
    window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
  }
  return session
}

export const resetAdminPassword = async (payload: {
  email: string
  newPassword: string
  resetKey: string
}) => {
  const { email, newPassword, resetKey } = payload
  if (!ADMIN_SECRET) {
    throw new Error('VITE_ADMIN_SECRET is missing')
  }
  if (!resetKey || resetKey !== ADMIN_SECRET) {
    return null
  }
  const admins = (await fetchAdminsFromApi()) ?? loadAdmins()
  const index = admins.findIndex(
    (entry) => entry.email.toLowerCase() === email.toLowerCase(),
  )
  if (index < 0) {
    return null
  }
  const admin = admins[index]
  const passwordHash = await hashAdminPassword(admin.email, newPassword)
  const apiUpdated = await apiFetch<AdminUser>('/api/admins/reset', {
    method: 'POST',
    body: JSON.stringify({
      email: admin.email,
      passwordHash,
      resetKey,
    }),
  })
  if (apiUpdated) {
    const normalized = normalizeAdmins([apiUpdated])[0] ?? apiUpdated
    const nextAdmins = [...admins]
    nextAdmins[index] = normalized
    saveAdmins(nextAdmins)
    return normalized
  }
  const updated: AdminUser = {
    ...admin,
    passwordHash,
    updatedAt: new Date().toISOString(),
  }
  const nextAdmins = [...admins]
  nextAdmins[index] = updated
  saveAdmins(nextAdmins)
  return updated
}

export const logoutAdmin = () => {
  if (!isBrowser) {
    return
  }
  window.localStorage.removeItem(ADMIN_SESSION_KEY)
}
