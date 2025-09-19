const jwt = require('jsonwebtoken')
module.exports = function(req,res,next){
  const auth = req.headers.authorization
  if(!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error:'unauth' })
  const token = auth.split(' ')[1]
  try{
    const data = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
    req.user = data
    next()
  }catch(e){ return res.status(401).json({ error:'unauth' }) }
}