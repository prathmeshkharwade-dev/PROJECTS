import { createContext, useContext, useState, useEffect } from 'react'
import { itemService } from '../services/itemService'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [items,      setItems]      = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading,    setLoading]    = useState(false)
  const [query,      setQuery]      = useState('')

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

  const addItem    = (item) => setItems(prev => [...prev, item])
  const removeItem = (id)   => setItems(prev => prev.filter(i => (i._id || i.id) !== id))

  const filteredItems = query
    ? items.filter(i =>
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        i.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : items

  return (
    <AppContext.Provider value={{
      items, filteredItems, loading,
      selectedId, setSelectedId,
      query, setQuery,
      addItem, removeItem, fetchItems,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)