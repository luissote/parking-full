import React from 'react'
import Sidebar from './Sidebar.jsx'

export default function Layout({ usuario, onLogout, children }) {
  return (
    <div className="app-layout">
      <Sidebar onLogout={onLogout} />
      <main className="main-content">{children}</main>
    </div>
  )
}
