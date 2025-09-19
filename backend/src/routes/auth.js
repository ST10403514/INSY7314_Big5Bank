const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { patterns } = require('../validators')

const router = express.Router()
const SALT_ROUNDS = 12

router.post('/register', async (req,res)=>{
  try{
    const { fullName, idNumber, accountNumber, username, password } = req.body
    if(!patterns.fullName.test(fullName) || !patterns.idNumber.test(idNumber) || !patterns.accountNumber.test(accountNumber) || !patterns.username.test(username)){
      return res.status(400).json({ error: 'Validation failed' })
    }
    const existing = await User.findOne({ $or:[{ username }, { accountNumber }] })
    if(existing) return res.status(400).json({ error: 'User or account exists' })
    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    const u = await User.create({ fullName, idNumber, accountNumber, username, passwordHash: hash })
    return res.json({ message: 'registered', userId: u._id })
  }catch(e){
    console.error(e); res.status(500).json({ error: 'server error' })
  }
})

router.post('/login', async (req,res)=>{
  try{
    const { username, password } = req.body
    const u = await User.findOne({ username })
    if(!u) return res.status(401).json({ error: 'invalid' })
    const ok = await bcrypt.compare(password, u.passwordHash)
    if(!ok) return res.status(401).json({ error:'invalid' })
    const token = jwt.sign({ sub: u._id, role: u.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '1h' })
    return res.json({ token })
  }catch(e){ console.error(e); res.status(500).json({ error:'server error' }) }
})

module.exports = router
