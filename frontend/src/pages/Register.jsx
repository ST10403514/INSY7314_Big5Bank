import React, {useState} from 'react'
import axios from 'axios'
import { validateRegister } from '../lib/validators'

export default function Register(){
  const [form,setForm] = useState({ fullName:'', idNumber:'', accountNumber:'', username:'', password:'' })
  const [msg,setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const errors = validateRegister(form)
    if(Object.keys(errors).length){ setMsg('Fix validation errors on form'); return }
    try{
      const res = await axios.post('/api/auth/register', form)
      setMsg(res.data.message || 'Registered')
    }catch(err){ setMsg(err.response?.data?.error || String(err)) }
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Register</h2>
      <form onSubmit={submit} className="max-w-md space-y-3">
        <input required placeholder="Full name" value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} className="input input-bordered w-full" />
        <input required placeholder="ID Number" value={form.idNumber} onChange={e=>setForm({...form,idNumber:e.target.value})} className="input input-bordered w-full" />
        <input required placeholder="Account Number" value={form.accountNumber} onChange={e=>setForm({...form,accountNumber:e.target.value})} className="input input-bordered w-full" />
        <input required placeholder="Username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} className="input input-bordered w-full" />
        <input required type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="input input-bordered w-full" />
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  )
}
