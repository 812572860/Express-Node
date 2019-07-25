const jwt = require('jsonwebtoken')
const config = require('./config.default').jwtConfig

const sign = (payload) => jwt.sign(payload, config.secret, { expiresIn: config.expiresIn })

const verify = (token) => jwt.verify(token, config.secret)

module.exports = {
  sign,
  verify
}