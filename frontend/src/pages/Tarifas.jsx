import React, { useEffect, useState } from 'react'
import api from '../api/api.js'

export default function Tarifas() {
  const [tarifas, setTarifas] = useState([])
  const [editId, setEditId] = useState(null)
  const [val, setVal] = useState('')
  const [msg, setMsg] = useState({ tipo:'', texto:'' })

  useEffect(() => { api.get('/tarifas').then(r=>setTarifas(r.data)).catch(()=>setMsg({tipo:'error',texto:'No se pudo cargar.'})) }, [])

  async function guardar(t) {
    try { await api.put(`/tarifas/${t.id}`,{...t,valorHora:Number(val)}); setEditId(null); setMsg({tipo:'success',texto:'Tarifa actualizada.'}); const {data}=await api.get('/tarifas'); setTarifas(data) }
    catch { setMsg({tipo:'error',texto:'Error al actualizar.'}) }
  }
  return (
    <div>
      <div className="page-header"><h1>Tarifas</h1><p>Valor por hora segun tipo de vehiculo</p></div>
      {msg.texto && <div className={`alert ${msg.tipo==='error'?'alert-error':'alert-success'}`}>{msg.texto}</div>}
      <div className="card">
        <table>
          <thead><tr><th>Tipo</th><th>Valor por hora</th><th>Accion</th></tr></thead>
          <tbody>
            {tarifas.map(t=>(
              <tr key={t.id}>
                <td><span className={`badge ${t.tipoVehiculo==='CARRO'?'badge-blue':'badge-purple'}`}>{t.tipoVehiculo}</span></td>
                <td>{editId===t.id?<input type="number" value={val} onChange={e=>setVal(e.target.value)} style={{width:120,padding:'6px 10px',borderRadius:6,background:'var(--bg-panel-2)',border:'1px solid var(--border-color)',color:'var(--text-primary)'}} />:`$${Number(t.valorHora).toLocaleString('es-CO')}`}</td>
                <td>{editId===t.id?<button className="btn btn-primary" onClick={()=>guardar(t)}>Guardar</button>:<button className="btn btn-secondary" onClick={()=>{setEditId(t.id);setVal(t.valorHora)}}>Editar</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
