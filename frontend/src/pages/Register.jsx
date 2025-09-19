import { useState } from 'react'
import axios from 'axios'

import { patterns } from '../lib/validators' // make sure this points to your validators file

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!patterns.fullName.test(fullName)) newErrors.fullName = 'Invalid full name'
    if (!patterns.idNumber.test(idNumber)) newErrors.idNumber = 'ID Number must be 13 digits'
    if (!patterns.accountNumber.test(accountNumber)) newErrors.accountNumber = 'Account Number must be 8-20 digits'
    if (!patterns.username.test(username)) newErrors.username = 'Username must be 4-30 letters/numbers/_'
    if (!password) newErrors.password = 'Password is required'

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    try {
      const res = await axios.post('/api/auth/register', {
        fullName,
        idNumber,
        accountNumber,
        username,
        password
      })
      setSuccess('Registered successfully! You can now login.')
      setErrors({})
    } catch (err) {
      setErrors({ form: err.response?.data?.error || 'Server error' })
      setSuccess('')
    }
  }

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto mt-10">
      {errors.form && <div className="alert alert-error mb-4">{errors.form}</div>}
      {success && <div className="alert alert-success mb-4">{success}</div>}

      <input
        placeholder="Full Name"
        value={fullName}
        onChange={e => setFullName(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

      <input
        placeholder="ID Number"
        value={idNumber}
        onChange={e => setIdNumber(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      {errors.idNumber && <p className="text-red-500 text-sm">{errors.idNumber}</p>}

      <input
        placeholder="Account Number"
        value={accountNumber}
        onChange={e => setAccountNumber(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="input input-bordered w-full mb-2"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

      <button type="submit" className="btn btn-primary w-full mt-2">Register</button>
    </form>
  )
}
