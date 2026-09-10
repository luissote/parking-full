import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { PieChart, Pie, Cell } from 'recharts'
import api from '../api/api.js'

function fmt(v) { return '$' + Number(v||0).toLocaleString('es-CO') }

export default function Dashboard({ usuario }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { api.get('/dashboard/resumen').then(r => setData(r.data)).catch(() => setError('No se pudo cargar el dashboard.')) }, [])
  if (error) return <div className="alert alert-error">{error}</div>
  if (!data) return <p style={{ color:'var(--text-secondary)' }}>Cargando...</p>

  const linea = Object.entries(data.ingresosUltimos7Dias).map(([dia,valor]) => ({ dia, valor }))
  const pie = [
    { name:'Disponibles', value:data.espaciosDisponibles, color:'#3ddc84' },
    { name:'Ocupados',    value:data.espaciosOcupados,    color:'#4d8ef7' },
    { name:'Reservados',  value:data.espaciosReservados,  color:'#8b6ef7' },
  ]
  return (
    <div>
      <div className="page-header"><h1>Bienvenido, {usuario.nombre}</h1><p>Resumen general del sistema</p></div>
      <div className="kpi-grid">
        <div className="card kpi-card">
          <div><div className="kpi-label">Ingresos hoy</div><div className="kpi-value" style={{color:'var(--accent-green)'}}>{fmt(data.ingresosHoy)}</div><div className="kpi-sub">{data.vehiculosHoy} vehiculos hoy</div></div>
          <div className="kpi-icon" style={{background:'rgba(61,220,132,0.15)'}}>$</div>
        </div>
        <div className="card kpi-card">
          <div><div className="kpi-label">Espacios disponibles</div><div className="kpi-value" style={{color:'var(--accent-blue)'}}>{data.espaciosDisponibles}</div><div className="kpi-sub">de {data.espaciosTotal} espacios</div></div>
          <div className="kpi-icon" style={{background:'rgba(77,142,247,0.15)'}}>P</div>
        </div>
        <div className="card kpi-card">
          <div><div className="kpi-label">Vehiculos activos</div><div className="kpi-value" style={{color:'var(--accent-purple)'}}>{data.vehiculosActivos}</div><div className="kpi-sub">dentro del parqueadero</div></div>
          <div className="kpi-icon" style={{background:'rgba(139,110,247,0.15)'}}>=</div>
        </div>
      </div>
      <div className="content-grid">
        <div className="card">
          <div className="card-title">Ingresos ultimos 7 dias</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={linea}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2c42" />
              <XAxis dataKey="dia" stroke="#8a97ab" fontSize={12} />
              <YAxis stroke="#8a97ab" fontSize={12} />
              <Tooltip formatter={v => fmt(v)} contentStyle={{background:'#111c30',border:'1px solid #1f2c42',borderRadius:8}} />
              <Line type="monotone" dataKey="valor" stroke="#3ddc84" strokeWidth={2} dot={{r:3}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title">Estado de espacios</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={pie} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={2}>
              {pie.map((d,i) => <Cell key={i} fill={d.color} />)}
            </Pie><Tooltip contentStyle={{background:'#111c30',border:'1px solid #1f2c42',borderRadius:8}} /></PieChart>
          </ResponsiveContainer>
          {pie.map(d => (
            <div key={d.name} style={{display:'flex',justifyContent:'space-between',fontSize:13,marginTop:8}}>
              <span><span style={{color:d.color}}>●</span> {d.name}</span><span>{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
