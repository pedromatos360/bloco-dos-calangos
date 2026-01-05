type Sponsor = {
  id: string
  name: string
  logo_url: string
  order: number
  src?: string
  alt?: string
}

type SiteConfig = {
  id: string
  music_url?: string
  music_enabled?: boolean
}

type User = {
  email: string
}

type Store = {
  sponsors: Sponsor[]
  siteConfig: SiteConfig | null
  user: User | null
}

const STORE_KEY = 'base44-mock-store'
let memoryStore: Store | null = null

const getStore = (): Store => {
  if (memoryStore) {
    return memoryStore
  }

  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(STORE_KEY)
      if (raw) {
        memoryStore = JSON.parse(raw) as Store
        return memoryStore
      }
    } catch {
      // Ignore storage errors and fall back to defaults.
    }
  }

  memoryStore = { sponsors: [], siteConfig: null, user: null }
  return memoryStore
}

const saveStore = (next: Store) => {
  memoryStore = next
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(next))
    } catch {
      // Ignore storage errors.
    }
  }
}

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

export const base44 = {
  auth: {
    async me() {
      const store = getStore()
      if (!store.user) {
        throw new Error('Not authenticated')
      }
      return store.user
    },
    async isAuthenticated() {
      const store = getStore()
      return Boolean(store.user)
    },
    redirectToLogin(redirectPath?: string) {
      const store = getStore()
      store.user = { email: 'pedrovictor.net@gmail.com' }
      saveStore(store)
      if (typeof window !== 'undefined' && redirectPath) {
        window.location.assign(redirectPath)
      }
    },
    logout() {
      const store = getStore()
      store.user = null
      saveStore(store)
    },
  },
  entities: {
    Sponsor: {
      async list(_orderKey?: string, limit?: number) {
        const store = getStore()
        const items = [...store.sponsors].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0),
        )
        return typeof limit === 'number' ? items.slice(0, limit) : items
      },
      async create(data: Omit<Sponsor, 'id'>) {
        const store = getStore()
        const sponsor: Sponsor = { ...data, id: createId() }
        store.sponsors = [...store.sponsors, sponsor]
        saveStore(store)
        return sponsor
      },
      async delete(id: string) {
        const store = getStore()
        store.sponsors = store.sponsors.filter((item) => item.id !== id)
        saveStore(store)
      },
    },
    SiteConfig: {
      async list() {
        const store = getStore()
        return store.siteConfig ? [store.siteConfig] : []
      },
      async create(data: Omit<SiteConfig, 'id'>) {
        const store = getStore()
        const config: SiteConfig = { ...data, id: createId() }
        store.siteConfig = config
        saveStore(store)
        return config
      },
      async update(id: string, data: Partial<SiteConfig>) {
        const store = getStore()
        const current = store.siteConfig ?? { id }
        store.siteConfig = { ...current, ...data, id }
        saveStore(store)
        return store.siteConfig
      },
    },
  },
  integrations: {
    Core: {
      async UploadFile({ file }: { file: File }) {
        if (!file) {
          throw new Error('No file provided')
        }
        const file_url = await fileToDataUrl(file)
        return { file_url }
      },
    },
  },
}
