import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Security from './pages/Security'
import Register from './pages/Register'
import Login from './pages/Login'
import MakePayment from './pages/MakePayment'
import MyPayments from './pages/MyPayments'

export default function App() {
  return (
    <div className="min-h-screen p-6">
      <nav className="mb-6">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/about" className="mr-4">About Us</Link>
        <Link to="/security" className="mr-4">Security</Link>
        <Link to="/register" className="mr-4">Register</Link>
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/make-payment" className="mr-4">Make Payment</Link>
        <Link to="/my-payments">My Payments</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/security" element={<Security />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/make-payment" element={<MakePayment />} />
        <Route path="/my-payments" element={<MyPayments />} />
      </Routes>
    </div>
  )
}
