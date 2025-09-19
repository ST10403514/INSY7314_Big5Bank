import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/login', { username, password })
      localStorage.setItem('token', res.data.token)  // <--- Save JWT
      navigate('/my-payments') // redirect to MyPayments page
    } catch (err) {
      setError(err.response?.data?.error || 'Server error')
    }
  }

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10">
      {error && <div className="alert alert-error mb-4">{error}</div>}
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="input input-bordered w-full mb-2" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input input-bordered w-full mb-2" />
      <button type="submit" className="btn btn-primary w-full">Login</button>
    </form>
  )
}
