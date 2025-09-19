import React, {useState} from 'react'
import axios from 'axios'
export default function Login(){
  const [form,setForm]=useState({username:'', password:''})
  const [msg,setMsg]=useState('')
  const submit=async e=>{ e.preventDefault(); try{ const r=await axios.post('/api/auth/login', form); setMsg('Logged in'); }catch(err){ setMsg(err.response?.data?.error || String(err)) } }
  return (<div><h2 className='text-xl mb-4'>Login</h2><form onSubmit={submit} className='max-w-md'><input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} className='input input-bordered w-full mb-2' placeholder='username' /><input type='password' value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className='input input-bordered w-full mb-2' placeholder='password' /><button className='btn btn-primary'>Login</button></form>{msg && <p className='mt-2'>{msg}</p>}</div>) }