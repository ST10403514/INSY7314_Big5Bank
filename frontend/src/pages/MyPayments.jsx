import { useEffect, useState } from 'react'
import axios from 'axios'

export default function MyPayments() {
  const [payments, setPayments] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPayments = async () => {
      const token = localStorage.getItem('token')
      if(!token) return setError('You must be logged in')

      try {
        const res = await axios.get('/api/payments/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setPayments(res.data)
      } catch(err) {
        setError(err.response?.data?.error || 'Server error')
      }
    }
    fetchPayments()
  }, [])

  if(error) return <div className="alert alert-error mt-4">{error}</div>

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">My Payments</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <ul className="space-y-2">
          {payments.map(p => (
            <li key={p._id} className="border p-2 rounded">
              <div><strong>Amount:</strong> {p.amount} {p.currency}</div>
              <div><strong>Payee:</strong> {p.payeeAccount}</div>
              <div><strong>SWIFT:</strong> {p.swift}</div>
              <div><strong>Status:</strong> {p.status}</div>
              <div><strong>Created:</strong> {new Date(p.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
