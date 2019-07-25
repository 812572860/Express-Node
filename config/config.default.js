const config = {
  postgreConfig: {
    database: 'lyx',
    username: 'postgres',
    password: 'libragy',
    port: 5432
  },
  jwtConfig: {
    secret: 'linyx',
    expiresIn: '30 days'
  }
}

module.exports = config