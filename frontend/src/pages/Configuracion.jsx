import React, { useEffect, useState } from 'react'
import api from '../api/api.js'

export default function Configuracion() {
  const [parqueadero, setParqueadero] = useState(null)
  const [form, setForm] = useState({})
  const [msg, setMsg] = useState({ tipo:'', texto:'' })
  const [guardando, setGuardando] = useState(false)

  useEffect(() => { api.get('/parqueaderos').then(r=>{if(r.data.length>0){setParqueadero(r.data[0]);setForm(r.data[0])}}).catch(()=>setMsg({tipo:'error',texto:'No se pudo cargar.'})) }, [])

  async function guardar(e) {
    e.preventDefault(); setGuardando(true)
    try { const {data}=await api.put(`/parqueaderos/${parqueadero.id}`,form); setParqueadero(data); setMsg({tipo:'success',texto:'Configuracion guardada.'}) }
    catch { setMsg({tipo:'error',texto:'No se pudo guardar.'}) }
    finally { setGuardando(false) }
  }

  if (!parqueadero) return <p style={{color:'var(--text-secondary)'}}>Cargando...</p>
  return (
    <div>
      <div className="page-header"><h1>Configuracion</h1><p>Ajustes generales del sistema</p></div>
      {msg.texto && <div className={`alert ${msg.tipo==='error'?'alert-error':'alert-success'}`}>{msg.texto}</div>}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
        <div className="card">
          <div className="card-title">Datos del parqueadero</div>
          <form onSubmit={guardar}>
            <div className="form-group"><label>Nombre</label><input value={form.nombre||''} onChange={e=>setForm({...form,nombre:e.target.value})} required /></div>
            <div className="form-group"><label>Direccion</label><input value={form.direccion||''} onChange={e=>setForm({...form,direccion:e.target.value})} /></div>
            <div className="form-group"><label>Telefono</label><input value={form.telefono||''} onChange={e=>setForm({...form,telefono:e.target.value})} /></div>
            <div className="form-group"><label>Capacidad total</label><input type="number" value={form.capacidad||''} onChange={e=>setForm({...form,capacidad:Number(e.target.value)})} /></div>
            <button type="submit" className="btn btn-primary" style={{width:'100%'}} disabled={guardando}>{guardando?'Guardando...':'Guardar cambios'}</button>
          </form>
        </div>
        <div className="card">
          <div className="card-title">Informacion del sistema</div>
          <table><tbody>
            {[['Version','1.0.0'],['Backend','Spring Boot 3.2.5'],['Frontend','React 18 + Vite 5'],['Base de datos','MySQL 8'],['Puerto backend','8080'],['Puerto frontend','5173']].map(([c,v])=>(
              <tr key={c}><td style={{color:'var(--text-secondary)',paddingRight:16,width:160}}>{c}</td><td>{v}</td></tr>
            ))}
          </tbody></table>
        </div>
      </div>
    </div>
  )
}
