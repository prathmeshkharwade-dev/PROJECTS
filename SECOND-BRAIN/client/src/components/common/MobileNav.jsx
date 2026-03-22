import { useNavigate } from 'react-router-dom'

export default function MobileNav({ onToggleSidebar, onNewItem, sidebarOpen }) {
  const navigate = useNavigate()

  const tabs = [
    {
      label: 'Graph',
      action: onToggleSidebar,
      active: !sidebarOpen,
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" strokeWidth={2}/>
          <circle cx="4"  cy="6"  r="2" strokeWidth={2}/>
          <circle cx="20" cy="6"  r="2" strokeWidth={2}/>
          <circle cx="4"  cy="18" r="2" strokeWidth={2}/>
          <circle cx="20" cy="18" r="2" strokeWidth={2}/>
          <line x1="12" y1="9"  x2="5"  y2="7"  strokeWidth={1.5}/>
          <line x1="12" y1="9"  x2="19" y2="7"  strokeWidth={1.5}/>
          <line x1="12" y1="15" x2="5"  y2="17" strokeWidth={1.5}/>
          <line x1="12" y1="15" x2="19" y2="17" strokeWidth={1.5}/>
        </svg>
      ),
    },
    {
      label: 'Library',
      action: onToggleSidebar,
      active: sidebarOpen,
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: 'Add',
      action: onNewItem,
      active: false,
      isMain: true,
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      label: 'Profile',
      action: () => navigate('/profile'),
      active: false,
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ]

  return (
    <nav
      className="md:hidden flex items-center justify-around px-4 py-2 shrink-0"
      style={{
        background:   'var(--surface)',
        borderTop:    '1px solid var(--border)',
        paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      }}
    >
      {tabs.map(tab => (
        <button
          key={tab.label}
          onClick={tab.action}
          className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all"
          style={{
            color:      tab.active ? '#7C6FCD' : 'var(--tx3)',
            background: tab.isMain
              ? 'linear-gradient(135deg,#7C6FCD,#E879A0)'
              : tab.active ? 'rgba(124,111,205,0.12)' : 'transparent',
            boxShadow:  tab.isMain ? '0 4px 15px rgba(124,111,205,0.4)' : 'none',
            color:      tab.isMain ? '#fff' : tab.active ? '#7C6FCD' : 'var(--tx3)',
          }}
        >
          {tab.icon}
          <span className="text-[9px] font-medium">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}