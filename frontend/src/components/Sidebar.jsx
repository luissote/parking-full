import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',              label: 'Principal',     icon: '#'   },
  { to: '/parqueaderos',  label: 'Parqueaderos',  icon: 'P'   },
  { to: '/espacios',      label: 'Espacios',      icon: '[ ]' },
  { to: '/reservaciones', label: 'Reservaciones', icon: '<>'  },
  { to: '/vehiculos',     label: 'Vehiculos',     icon: '='   },
  { to: '/tarifas',       label: 'Tarifas',       icon: '$'   },
  { to: '/reportes',      label: 'Reportes',      icon: '~'   },
  { to: '/usuarios',      label: 'Usuarios',      icon: '&'   },
  { to: '/configuracion', label: 'Configuracion', icon: '*'   },
]

export default function Sidebar({ onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Park<span>ing</span></div>
      <nav className="sidebar-nav">
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
          >
            <span>{l.icon}</span> {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer" onClick={onLogout}>[ Cerrar sesion ]</div>
    </aside>
  )
}
