const Sequelize = require('sequelize')
const config = require('../config/config.default').postgreConfig

// const dbContext = new Sequelize('postgres://postgres:libragy@localhost:5432/caojiatan')
const dbContext = new Sequelize(config.database, config.username, config.password, {
  dialect: 'postgres',
  port: config.port
})

module.exports = dbContext