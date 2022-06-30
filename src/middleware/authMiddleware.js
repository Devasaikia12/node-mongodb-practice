const jwt = require('jsonwebtoken')
const User = require('../models/usersModel')

const auth = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = await jwt.verify(token, 'secret')
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(404).send({ message: 'Not authorize, token failed' })
    }
  } else {
    res.status(404).send({ message: 'Not authorize, no token' })
  }
}

module.exports = auth
