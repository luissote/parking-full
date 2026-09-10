import React, { useEffect, useState } from 'react'
import api from '../api/api.js'

const estados = ['DISPONIBLE','OCUPADO','RESERVADO']
function badge(e) { return e==='DISPONIBLE'?'badge-green':e==='OCUPADO'?'badge-blue':'badge-purple' }

export default function Espacios() {
  const [espacios, setEspacios] = useState([])
  const [modal, setModal] = useState(false)
  const [msg, setMsg] = useState({ tipo:'', texto:'' })
  const [form, setForm] = useState({ codigo:'', tipo:'CARRO', estado:'DISPONIBLE' })

  useEffect(() => { cargar() }, [])
  async function cargar() { try { const {data}=await api.get('/espacios'); setEspacios(data) } catch { setMsg({tipo:'error',texto:'No se pudo cargar.'}) } }
  async function cambiarEstado(id, estado) { try { await api.put(`/espacios/${id}/estado`,{estado}); cargar() } catch { setMsg({tipo:'error',texto:'Error al cambiar estado.'}) } }
  async function crear(e) {
    e.preventDefault()
    try { await api.post('/espacios',form); setModal(false); setForm({codigo:'',tipo:'CARRO',estado:'DISPONIBLE'}); setMsg({tipo:'success',texto:'Espacio creado.'}); cargar() }
    catch(err) { setMsg({tipo:'error',texto:err.response?.data?.mensaje||'Error al crear.'}) }
  }
  async function eliminar(id) {
    if (!window.confirm('Eliminar este espacio?')) return
    try { await api.delete(`/espacios/${id}`); cargar() } catch { setMsg({tipo:'error',texto:'Error al eliminar.'}) }
  }
  return (
    <div>
      <div className="page-header"><h1>Espacios</h1><p>Gestiona los espacios del parqueadero</p></div>
      {msg.texto && <div className={`alert ${msg.tipo==='error'?'alert-error':'alert-success'}`}>{msg.texto}</div>}
      <div className="toolbar"><div style={{color:'var(--text-secondary)',fontSize:13}}>{espacios.length} espacios</div><button className="btn btn-primary" onClick={()=>setModal(true)}>+ Nuevo espacio</button></div>
      <div className="card">
        <div className="grid-espacios">
          {espacios.map(esp=>(
            <div key={esp.id} className="espacio-box">
              <div style={{fontWeight:700,fontSize:16}}>{esp.codigo}</div>
              <small>{esp.tipo}</small>
              <div style={{margin:'10px 0'}}><span className={`badge ${badge(esp.estado)}`}>{esp.estado}</span></div>
              <select value={esp.estado} onChange={e=>cambiarEstado(esp.id,e.target.value)} style={{width:'100%',fontSize:12,padding:'6px 8px',borderRadius:6,background:'var(--bg-panel-2)',color:'var(--text-primary)',border:'1px solid var(--border-color)'}}>
                {estados.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
              <button className="btn btn-danger" style={{width:'100%',marginTop:8,fontSize:11,padding:'6px 0'}} onClick={()=>eliminar(esp.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <div className="modal-overlay" onClick={()=>setModal(false)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <h2 style={{marginBottom:16}}>Nuevo espacio</h2>
            <form onSubmit={crear}>
              <div className="form-group"><label>Codigo</label><input value={form.codigo} onChange={e=>setForm({...form,codigo:e.target.value.toUpperCase()})} placeholder="Ej: A-11" required /></div>
              <div className="form-group"><label>Tipo</label><select value={form.tipo} onChange={e=>setForm({...form,tipo:e.target.value})}><option value="CARRO">Carro</option><option value="MOTO">Moto</option></select></div>
              <div className="form-group"><label>Estado inicial</label><select value={form.estado} onChange={e=>setForm({...form,estado:e.target.value})}>{estados.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
              <div style={{display:'flex',gap:10}}><button type="button" className="btn btn-secondary" style={{flex:1}} onClick={()=>setModal(false)}>Cancelar</button><button type="submit" className="btn btn-primary" style={{flex:1}}>Crear</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
