import React, {useEffect, useState} from 'react'
import axios from 'axios'
export default function MyPayments(){
  const [payments,setPayments]=useState([])
  useEffect(()=>{ axios.get('/api/payments/me').then(r=>setPayments(r.data||[])).catch(()=>{}) },[])
  return (<div><h2 className='text-xl mb-4'>My Payments</h2><ul>{payments.map(p=> <li key={p._id} className='mb-2 p-2 border rounded'>{p.amount} {p.currency} → {p.payeeAccount} (status: {p.status})</li>)}</ul></div>) }