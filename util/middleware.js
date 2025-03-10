const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Session, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        console.log(authorization.substring(7))
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      } catch (error){
        console.log(error)
        return res.status(401).json({ error: 'token invalid' })
      }
    } else {
      return res.status(401).json({ error: 'token missing' })
    }

    const sessions = await Session.findAll({
      where: {
        token: authorization.substring(7),
      },
    })
    if (!sessions[0]) return res.status(401).json({ error: 'Invalid session' })
    
    const user = await User.findByPk(sessions[0].userId)
    
    if (!user.active) return res.status(401).json({ error: 'User account disabled' })

    next()
  }

  module.exports = { tokenExtractor }