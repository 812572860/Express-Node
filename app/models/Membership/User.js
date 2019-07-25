const Sequelize = require('sequelize');
const bcrypt = require('bcrypt')
const sequelize = require('../../database/pgDB');

const Op = Sequelize.Op

const User = sequelize.define('User', {
  username: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      // isNull: {args: false, message: '用户名不能为空'}
      notEmpty: { msg: '用户名不能为空' }
    }
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { args: false, message: '密码不能为空' }
    }
  },
  uniqueCode: {
    type: Sequelize.TEXT,
    unique: true,
    field: 'unique_code'
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
    tableName: '_User',
    underscored: true,
    timestamps: true
  });

User.hook('beforeSave', function (user) {
  if (user.changed('password')) {
    // 进行密码加密
    return bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash
    })
  }
})

/** 添加静态方法 */

User.isDuplicate = (user, callback) => {
  const query = {
    username: user.username
  }
  if(user.id) {
    query.id = { [Op.ne]: user.id }
  }
  User.findOne({
    where: query
  }).then(result => {
    if (result) {
      callback({ error: true, message: '用户名已存在' })
    } else {
      callback(null, user)
    }
  }).catch(err => {
    callback({ error: true, message: '用户查询失败', err })
  })
}

/** 添加实例方法 */

User.prototype.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password).then((res) => {
    if (res) {
      callback(null, this.get({ plain: true }))
    } else {
      callback({ error: true, message: '密码错误' })
    }
  })
}

module.exports = User;