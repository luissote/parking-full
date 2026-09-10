import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import api from '../api/api.js'

function fmt(v) { return '$' + Number(v||0).toLocaleString('es-CO') }

export default function Reportes() {
  const [datos, setDatos] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { api.get('/reportes/resumen').then(r=>setDatos(r.data)).catch(()=>setError('No se pudo cargar los reportes.')) }, [])
  if (error) return <div className="alert alert-error">{error}</div>
  if (!datos) return <p style={{color:'var(--text-secondary)'}}>Cargando...</p>

  const barras = Object.entries(datos.ingresos30Dias).slice(-14).map(([dia,valor])=>({dia,valor:Number(valor)}))
  const tipos = [{ name:'Carros', value:Number(datos.carros), color:'#4d8ef7' },{ name:'Motos', value:Number(datos.motos), color:'#8b6ef7' }]
  const espaciosPie = [
    { name:'Disponibles', value:Number(datos.espaciosDisponibles), color:'#3ddc84' },
    { name:'Ocupados',    value:Number(datos.espaciosOcupados),    color:'#4d8ef7' },
    { name:'Reservados',  value:Number(datos.espaciosReservados),  color:'#8b6ef7' },
  ]

  return (
    <div>
      <div className="page-header"><h1>Reportes</h1><p>Estadisticas generales del sistema</p></div>
      <div className="kpi-grid" style={{marginBottom:22}}>
        <div className="card kpi-card">
          <div><div className="kpi-label">Total recaudado</div><div className="kpi-value" style={{color:'var(--accent-green)'}}>{fmt(datos.totalRecaudado)}</div><div className="kpi-sub">desde el inicio del sistema</div></div>
          <div className="kpi-icon" style={{background:'rgba(61,220,132,0.15)'}}>$</div>
        </div>
        <div className="card kpi-card">
          <div><div className="kpi-label">Total vehiculos atendidos</div><div className="kpi-value" style={{color:'var(--accent-blue)'}}>{datos.totalVehiculos}</div><div className="kpi-sub">{datos.carros} carros — {datos.motos} motos</div></div>
          <div className="kpi-icon" style={{background:'rgba(77,142,247,0.15)'}}>=</div>
        </div>
        <div className="card kpi-card">
          <div><div className="kpi-label">Espacios disponibles</div><div className="kpi-value" style={{color:'var(--accent-purple)'}}>{datos.espaciosDisponibles}</div><div className="kpi-sub">{datos.espaciosOcupados} ocupados — {datos.espaciosReservados} reservados</div></div>
          <div className="kpi-icon" style={{background:'rgba(139,110,247,0.15)'}}>P</div>
        </div>
      </div>
      <div className="content-grid">
        <div className="card">
          <div className="card-title">Ingresos ultimos 14 dias</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barras}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2c42" />
              <XAxis dataKey="dia" stroke="#8a97ab" fontSize={11} />
              <YAxis stroke="#8a97ab" fontSize={11} />
              <Tooltip formatter={v=>fmt(v)} contentStyle={{background:'#111c30',border:'1px solid #1f2c42',borderRadius:8}} />
              <Bar dataKey="valor" fill="#3ddc84" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:18}}>
          <div className="card">
            <div className="card-title">Vehiculos por tipo</div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart><Pie data={tipos} dataKey="value" innerRadius={40} outerRadius={60} paddingAngle={2}>
                {tipos.map((d,i)=><Cell key={i} fill={d.color} />)}
              </Pie><Tooltip contentStyle={{background:'#111c30',border:'1px solid #1f2c42',borderRadius:8}} /></PieChart>
            </ResponsiveContainer>
            <div style={{display:'flex',gap:16,justifyContent:'center',fontSize:13}}>
              {tipos.map(d=><span key={d.name}><span style={{color:d.color}}>●</span> {d.name}: {d.value}</span>)}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Estado de espacios</div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart><Pie data={espaciosPie} dataKey="value" innerRadius={40} outerRadius={60} paddingAngle={2}>
                {espaciosPie.map((d,i)=><Cell key={i} fill={d.color} />)}
              </Pie><Tooltip contentStyle={{background:'#111c30',border:'1px solid #1f2c42',borderRadius:8}} /></PieChart>
            </ResponsiveContainer>
            {espaciosPie.map(d=>(
              <div key={d.name} style={{display:'flex',justifyContent:'space-between',fontSize:13,marginTop:6}}>
                <span><span style={{color:d.color}}>●</span> {d.name}</span><span>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
