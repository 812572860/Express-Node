let io

const ioServer = {
  init: (server) => {
    io = require('socket.io')(server)
    return io
  },
  singleTon: (server) => {
    if(!io) {
      io = require('socket.io')(server)
    }
    return io
  }
}

module.exports = ioServer