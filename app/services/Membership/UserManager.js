const async = require('async')
const jwt = require('../../config/plugin.jwt')

class UserManager {
  constructor(db) {
    this.db = db || require('../../models/Membership/User')
  }

  // 注册用户
  signIn(args, callback) {
    const user = this.db.build({...args})
    async.waterfall([
      (cb) => {
        return user.validate().then(() => {
        cb(null, {})
      }).catch(err => {
        cb({err: true, message: err.message})
      })},
      (_, cb) => this.db.isDuplicate(user, cb),
      (_, cb) => {
        user.save().then(res => {
          cb(null, res.get({
            plain: true
          }))
        }).catch(err => {
          cb({error: true, message: '用户注册失败', info: err})
        })
      }
    ], function(err, res) {
      callback(err, res)
    })
  }

  // 修改用户信息
  update(args, callback) {
    async.waterfall([
      // 获取用户信息
      (cb) => this.db.findById(args.id).then(user => {
        if(user) {
          cb(null, user.set({...args}))
        } else {
          cb({error: true, message: '该用户不存在'})
        }
      }).catch(err => {
        cb({error: true, message: '用户查询失败', err})
      }),
      // validate验证
      (user, cb) => {
        return user.validate().then(res => {
        cb(null, user)
      }).catch(err => {
        cb({err: true, message: err.message})
      })},
      // 唯一校验
      (user, cb) => this.db.isDuplicate(user, cb),
      // 提交新信息
      (user, cb) => user.save().then(res=> {
        cb(null, res.get({plain: true}))
      }).catch(err => {
        cb({error: true, message: '用户信息修改失败', err})
      })
    ], function(err, res) {
      callback(err, res)
    })
  }
   // 修改密码

  //登录
  loginIn(args, callback) {
    const {username, password} = args

    async.waterfall([
      // 获取用户信息
      (cb) => this.db.findAll({
        where: {username}
      }).then(res => {
        if(res && res.length) {
          cb(null, res[0])
        } else {
          cb({error: true, message: '用户名不存在'})
        }
        
      }).catch(err => {
        cb({error: true, message: '用户获取失败'})
      }),
      // 比较密码
      (user, cb) => user.comparePassword(password, cb),
      (user, cb) => {
        cb(null, {message: '登录成功', info: jwt.sign(user)})
      }
    ], function(err, res) {
      callback(err, res)
    })
  }
}

module.exports = UserManager