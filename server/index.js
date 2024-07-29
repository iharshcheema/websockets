const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('http')
const app = express()
const port = 3000
const server = createServer(app)
// create circuit
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

app.get('/', (req, res) => {
  res.send('Hello, WebSockets!')
})

// when a socket will get connected to the circuit
io.on('connection', (socket) => {
  console.log(`Socket with id: ${socket.id} connected`)

  // when a socket joins
  socket.emit('welcome', `Hi ${socket.id} ! Welcome to the server`)

  // this will send all the sockets present in the circuit except the socket that connects(useful in texts like he joined etc.)
  socket.broadcast.emit('welcome', `${socket.id} joined the server`)

  socket.on('message', (data) => {
    console.log(data)
    // this will send the message to all the sockets in the same room
    // io.emit('received-message', data)

    // this will send the message to all the sockets in the same room, excluding the sender
    // socket.broadcast.emit('received-message', data)

    // this will send the message to all the sockets in the specified room
    io.to(data.room).emit('received-message', data)
  })

  // joining a room

  socket.on('join-room', (data) => {
    socket.join(data)
  })

  // when a socket disconnects
  socket.on('disconnect', () => {
    console.log(`user:${socket.id} disconnected`)
  })
})

server.listen(port, () => {
  console.log(`app listening on port: ${port}`)
})
