import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { itemService } from '../services/itemService'
import api from '../services/api'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [items,        setItems]        = useState([])
  const [selectedId,   setSelectedId]   = useState(null)
  const [loading,      setLoading]      = useState(false)
  const [query,        setQuery]        = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [searching,    setSearching]    = useState(false)

  const token = localStorage.getItem('token')

  const fetchItems = async () => {
    if (!token) return
    try {
      setLoading(true)
      const { data } = await itemService.getAll()
      setItems(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchItems()
  }, [])

  // Semantic search with debounce
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults(null)
      return
    }

    const timer = setTimeout(async () => {
      setSearching(true)
      try {
        const { data } = await api.get(`/search?q=${encodeURIComponent(query)}`)
        setSearchResults(data)
      } catch {
        setSearchResults(null)
      } finally {
        setSearching(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  const addItem    = (item) => setItems(prev => [...prev, item])
  const removeItem = (id)   => setItems(prev => prev.filter(i => (i._id || i.id) !== id))

  const filteredItems = query
    ? (searchResults || items.filter(i =>
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        i.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      ))
    : items

  return (
    <AppContext.Provider value={{
      items, filteredItems, loading, searching,
      selectedId, setSelectedId,
      query, setQuery,
      addItem, removeItem, fetchItems,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)