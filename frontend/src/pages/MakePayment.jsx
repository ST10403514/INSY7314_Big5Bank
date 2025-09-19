import { useState } from 'react'
import axios from 'axios'

export default function MakePayment() {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [payeeAccount, setPayeeAccount] = useState('')
  const [swift, setSwift] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handlePayment = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(
        '/api/payments',
        { amount, currency, payeeAccount, swift },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage(`Payment created: ${res.data.payment.id}`)
      setAmount('')
      setPayeeAccount('')
      setSwift('')
    } catch (err) {
      setError(err.response?.data?.error || 'Server error')
    }
  }

  return (
    <form onSubmit={handlePayment} className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Make Payment</h2>

      {message && <div className="alert alert-success mb-4">{message}</div>}
      {error && <div className="alert alert-error mb-4">{error}</div>}

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="input input-bordered w-full mb-2"
        required
      />

      <input
        placeholder="Currency"
        value={currency}
        onChange={e => setCurrency(e.target.value)}
        className="input input-bordered w-full mb-2"
        required
      />

      <input
        placeholder="Payee Account"
        value={payeeAccount}
        onChange={e => setPayeeAccount(e.target.value)}
        className="input input-bordered w-full mb-2"
        required
      />

      <input
        placeholder="SWIFT"
        value={swift}
        onChange={e => setSwift(e.target.value)}
        className="input input-bordered w-full mb-2"
        required
      />

      <button type="submit" className="btn btn-primary w-full">Make Payment</button>
    </form>
  )
}
