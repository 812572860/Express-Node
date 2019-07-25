const express = require('express')
const bodyParser = require('body-parser')

const app = express()
// const server = require('http').Server(app)
// const io = require('socket.io')(server)

const jsonParser = bodyParser.json()
const urlencodeParser = bodyParser.urlencoded({extended: false})


app.listen(3001, () => console.log('Example app listening on port 3001!'))

app.get('/', function(req, res) {
  res.send('hello, this is the homepage')
})

app.post('/form', jsonParser, function(req, res) {
  console.dir(req.body)
  res.send(req.body)
})

// io.on('connection', function(socket) {
//   socket.emit('news', {hello: 'world'})
//   socket.on('my other events', function(data) {
//     console.log(data)
//   })
// })