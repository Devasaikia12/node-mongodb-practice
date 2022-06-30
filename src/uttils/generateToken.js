const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, 'secret', {
    expiresIn: '7d',
  })
}
module.exports = generateToken
