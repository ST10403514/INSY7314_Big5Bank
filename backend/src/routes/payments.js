const express = require('express')
const Payment = require('../models/Payment')
const User = require('../models/User')
const auth = require('../middleware/auth')
const { patterns } = require('../validators')

const router = express.Router()

// Create payment (customer) - requires auth
router.post('/', auth, async (req,res)=>{
  try{
    const { amount, currency, provider, payeeAccount, swift } = req.body
    if(!patterns.amount.test(String(amount)) || !patterns.swift.test(swift) || !patterns.accountNumber.test(payeeAccount)){
      return res.status(400).json({ error:'validation failed' })
    }
    const p = await Payment.create({ customerId: req.user.sub, amount: Number(amount), currency, provider, payeeAccount, swift })
    return res.json(p)
  }catch(e){ console.error(e); res.status(500).json({ error:'server error' }) }
})

// Get my payments
router.get('/me', auth, async (req,res)=>{
  try{
    const payments = await Payment.find({ customerId: req.user.sub }).sort({ createdAt:-1 })
    res.json(payments)
  }catch(e){ console.error(e); res.status(500).json({ error:'server error' }) }
})

// Employee: get pending payments (role check)
router.get('/pending', auth, async (req,res)=>{
  try{
    if(req.user.role !== 'employee') return res.status(403).json({ error:'forbidden' })
    const payments = await Payment.find({ status:'pending' }).populate('customerId','fullName accountNumber username').limit(200)
    res.json(payments)
  }catch(e){ console.error(e); res.status(500).json({ error:'server error' }) }
})

// Employee verify payment
router.post('/:id/verify', auth, async (req,res)=>{
  try{
    if(req.user.role !== 'employee') return res.status(403).json({ error:'forbidden' })
    const p = await Payment.findById(req.params.id)
    if(!p) return res.status(404).json({ error:'not found' })
    p.status = 'verified'
    await p.save()
    // Here the app would forward to SWIFT —OUT OF SCOPE
    res.json({ ok:true })
  }catch(e){ console.error(e); res.status(500).json({ error:'server error' }) }
})

module.exports = router
