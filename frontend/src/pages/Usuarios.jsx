import React, { useEffect, useState } from 'react'
import api from '../api/api.js'

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [modal, setModal] = useState(false)
  const [msg, setMsg] = useState({ tipo:'', texto:'' })
  const [form, setForm] = useState({ nombre:'', email:'', password:'', rol:'OPERADOR' })

  useEffect(() => { cargar() }, [])
  async function cargar() { try { const {data}=await api.get('/usuarios'); setUsuarios(data) } catch { setMsg({tipo:'error',texto:'No se pudo cargar.'}) } }
  async function crear(e) {
    e.preventDefault()
    try { await api.post('/usuarios',form); setModal(false); setForm({nombre:'',email:'',password:'',rol:'OPERADOR'}); setMsg({tipo:'success',texto:'Usuario creado.'}); cargar() }
    catch(err) { setMsg({tipo:'error',texto:err.response?.data?.mensaje||'Error al crear.'}) }
  }
  async function eliminar(id) {
    if (!window.confirm('Eliminar este usuario?')) return
    try { await api.delete(`/usuarios/${id}`); setMsg({tipo:'success',texto:'Usuario eliminado.'}); cargar() }
    catch { setMsg({tipo:'error',texto:'No se pudo eliminar.'}) }
  }

  return (
    <div>
      <div className="page-header"><h1>Usuarios</h1><p>Gestion de usuarios del sistema</p></div>
      {msg.texto && <div className={`alert ${msg.tipo==='error'?'alert-error':'alert-success'}`}>{msg.texto}</div>}
      <div className="toolbar">
        <div style={{color:'var(--text-secondary)',fontSize:13}}>{usuarios.length} usuarios</div>
        <button className="btn btn-primary" onClick={()=>{setModal(true);setMsg({tipo:'',texto:''})}}>+ Nuevo usuario</button>
      </div>
      <div className="card">
        <table>
          <thead><tr><th>#</th><th>Nombre</th><th>Correo</th><th>Rol</th><th>Accion</th></tr></thead>
          <tbody>
            {usuarios.length===0 && <tr><td colSpan="5" style={{color:'var(--text-secondary)'}}>No hay usuarios.</td></tr>}
            {usuarios.map(u=>(
              <tr key={u.id}>
                <td>{u.id}</td><td>{u.nombre}</td><td>{u.email}</td>
                <td><span className={`badge ${u.rol==='ADMIN'?'badge-green':'badge-blue'}`}>{u.rol}</span></td>
                <td><button className="btn btn-danger" style={{fontSize:12,padding:'5px 10px'}} onClick={()=>eliminar(u.id)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="modal-overlay" onClick={()=>setModal(false)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <h2 style={{marginBottom:16}}>Nuevo usuario</h2>
            <form onSubmit={crear}>
              <div className="form-group"><label>Nombre</label><input value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} required /></div>
              <div className="form-group"><label>Correo</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></div>
              <div className="form-group"><label>Contrasena</label><input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required /></div>
              <div className="form-group"><label>Rol</label>
                <select value={form.rol} onChange={e=>setForm({...form,rol:e.target.value})}>
                  <option value="ADMIN">Admin</option>
                  <option value="OPERADOR">Operador</option>
                </select>
              </div>
              <div style={{display:'flex',gap:10}}><button type="button" className="btn btn-secondary" style={{flex:1}} onClick={()=>setModal(false)}>Cancelar</button><button type="submit" className="btn btn-primary" style={{flex:1}}>Crear</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
