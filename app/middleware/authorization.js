const { verify } = require('../config/plugin.jwt')

// request protect strategy http的请求保护策略
const rps = () => (req, res, next) => {
  const token = req.get('Authorization')
  if (token) {
    const user = verify(token.split(' ')[1])
    if (user) {
      req.user = user
      return next()
    } else {
      return next({ error: true, code: 401, message: '无效的身份认证信息' })
    }
  } else {
    return next({ error: true, code: 401, message: "未提供身份认证信息" })
  }
}

// socket protect strategy socket的请求保护策略
const sps = () => (socket, next) => {
  const token = socket.handshake.query.token
  if (token) {
    try {
      const user = verify(token)
      if (user) {
        socket.user = user
        return next()
      } else {
        return next({ error: true, code: 401, message: 'socket无效的身份认证信息' })
      }
    } catch (error) {
      return next({ error: true, code: 401, message: 'socket无效的身份认证信息' })
    }

  } else {
    return next({ error: true, code: 401, message: "socket未提供身份认证信息" })
  }
}

module.exports = {
  rps,
  sps
}