import { useState, createContext, useContext, useCallback } from "react"

export const CacheContext = createContext({ getCache: () => null, setCache: () => {}, store: {} })

export const CacheProvider = ({ children }) => {
  const [store, setStore] = useState({})

  const getCache = (key) => {
    return store[key]
  }

  const setCache = (key, value) => {
    setStore((store) => ({
      ...store,
      [key]: value,
    }))
  }

  return (
    <CacheContext.Provider value={{ getCache, setCache, store }}>
      {children}
    </CacheContext.Provider>
  )
}

const BasePathContext = createContext()

export const BasePathProvider = ({ value, children }) => {
  return <BasePathContext.Provider value={value}>{children}</BasePathContext.Provider>
}

export const useResource = (path, { root } = {}) => {
  const basePath = useContext(BasePathContext)
  const { getCache, setCache } = useContext(CacheContext)

  const [fetching, setFetching] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [destroying, setDestroying] = useState(false)

  const fullPath = basePath + path

  const resource = getCache(fullPath)

  const fetchResource = useCallback(async () => {
    setFetching(true)

    const response = await fetch(fullPath)
    const data = await response.json()

    if (root) {
      setCache(fullPath, data[root])
    }
    else {
      setCache(fullPath, data)
    }

    setFetching(false)
  }, [])

  const updateResource = (id, attributes) => {}
  const destroyResource = (id) => {}

  return [
    resource,
    {
      fetchResource,
      updateResource,
      destroyResource,
      fetching,
      updating,
      destroying
    },
  ]
}

export const useCollection = (path, { root } = {}) => {
  const basePath = useContext(BasePathContext)
  const { getCache, setCache } = useContext(CacheContext)
  const [fetching, setFetching] = useState(false)

  const fullPath = basePath + path

  const collection = getCache(fullPath)

  const fetchCollection = useCallback(async () => {
    setFetching(true)

    const response = await fetch(fullPath)

    const data = await response.json()

    if (root) {
      setCache(fullPath, data[root])
    }
    else {
      setCache(fullPath, data)
    }

    setFetching(false)
  }, [])

  return [collection, { fetchCollection, fetching }]
}
