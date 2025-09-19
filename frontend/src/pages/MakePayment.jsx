import React, {useState} from 'react'
import axios from 'axios'
import { patterns } from '../lib/validators'

export default function MakePayment(){
  const [form,setForm]=useState({ amount:'', currency:'USD', provider:'SWIFT', payeeAccount:'', swift:'' })
  const [msg,setMsg]=useState('')
  const submit=async e=>{ e.preventDefault(); if(!patterns.amount.test(form.amount) || !patterns.swift.test(form.swift)){ setMsg('Validation failed'); return } try{ const r=await axios.post('/api/payments', form); setMsg('Payment created') }catch(err){ setMsg(err.response?.data?.error || String(err)) } }
  return (<div><h2 className='text-xl mb-4'>Make Payment</h2><form onSubmit={submit} className='max-w-md space-y-2'><input placeholder='Amount' value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} className='input input-bordered w-full' /><input placeholder='Payee Account' value={form.payeeAccount} onChange={e=>setForm({...form,payeeAccount:e.target.value})} className='input input-bordered w-full' /><input placeholder='SWIFT' value={form.swift} onChange={e=>setForm({...form,swift:e.target.value})} className='input input-bordered w-full' /><select value={form.currency} onChange={e=>setForm({...form,currency:e.target.value})} className='select select-bordered w-full'><option>USD</option><option>ZAR</option><option>EUR</option></select><button className='btn btn-primary' type='submit'>Pay Now</button></form>{msg && <p className='mt-2'>{msg}</p>}</div>) }