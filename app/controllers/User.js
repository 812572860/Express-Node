const {write} = require('../utils/response')

const UserManager = require('../services/Membership/UserManager')

exports.signIn = (req, res, next) => {
  new UserManager().signIn(req.body, write.bind(null, res))
}

exports.loginIn = (req, res, next) => {
  new UserManager().loginIn(req.body, write.bind(null, res))
}

exports.updateUser = (req, res, next) => {
  new UserManager().update(req.body, write.bind(null, res))
}