import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import ItemCard from './ItemCard'
import TypeFilter from './TypeFilter'
import Collections from './Collections'

export default function Sidebar() {
  const { filteredItems, selectedId, setSelectedId } = useApp()
  const [typeFilter, setTypeFilter] = useState(null)

  const visible = typeFilter
    ? filteredItems.filter(i => i.type === typeFilter)
    : filteredItems

  return (
    <aside
      className="w-64 flex flex-col overflow-hidden shrink-0"
      style={{
        background:   'var(--surface)',
        borderRight:  '1px solid var(--border)',
        height:       '100%',
        minHeight:    0,
      }}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 shrink-0"
        style={{ borderBottom: '1px solid var(--border)' }}>
        <p className="text-[9px] uppercase tracking-widest font-semibold mb-3"
          style={{ color: 'var(--tx3)' }}>Library</p>
        <TypeFilter active={typeFilter} onChange={setTypeFilter} />
      </div>

      {/* Items list — scrollable */}
      <div className="flex-1 overflow-y-auto py-2" style={{ minHeight: 0 }}>
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40"
            style={{ color: 'var(--tx3)' }}>
            <div className="text-3xl mb-2 opacity-30">◎</div>
            <span className="text-xs">Nothing saved yet</span>
          </div>
        ) : (
          visible.map((item, i) => (
            <div key={item._id || item.id}
              className="animate-slide-up"
              style={{ animationDelay: `${i * 40}ms` }}>
              <ItemCard
                item={item}
                selected={(item._id || item.id) === selectedId}
                onClick={() => setSelectedId(item._id || item.id)}
              />
            </div>
          ))
        )}
      </div>

      {/* Collections — fixed at bottom */}
      <div className="shrink-0 overflow-y-auto" style={{ maxHeight: '40%', minHeight: 0 }}>
        <Collections />
      </div>

      {/* Footer */}
      <div className="shrink-0 px-4 py-3"
        style={{ borderTop: '1px solid var(--border)', color: 'var(--tx3)' }}>
        <p className="text-[10px]">{visible.length} items</p>
      </div>
    </aside>
  )
}