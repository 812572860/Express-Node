const express = require('express')
const logger = require('morgan');
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser')

const socket = require('./app/config/plugin.socket')

const { rps, sps } = require('./app/middleware/authorization')
const dbContext = require('./app/database/pgDB')
const faliure = require('./app/middleware/failure')
// router
const authRoutes = require('./app/routes/users')
const otherRoutes = require('./app/routes/index')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'app', 'plublic')))

app.use('/auth', authRoutes)
app.use(rps()) // 之后所有的请求均需要经过身份认证
app.use(otherRoutes)

// 统一错误处理
app.use(faliure)

const server = app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
  // if(process.env.NODE_ENV === "production") {
    dbContext.authenticate().then(() => {
      console.log('数据库连接成功')
    }).catch(err => {
      console.log("数据库连接失败", err)
    })
  // }
})

const io = socket.init(server)
io.use(sps())
io.on('connection', socket => {
  socket.emit('message', {type: 'append', message: "hello, " + socket.user.username})
})
// io.use((err, socket, next) => {
//   if(err) {
//     console.log(err)
//   }
//   next()
// })
