const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

require('dotenv').config()

const PORT = process.env.PORT

let usersList = []
let roomsList = []

io.on('connection', socket => {

  io.emit('FETCH_ROOMS_LIST', roomsList)

  const findByUsername = username => {
    let user = usersList.find(elem => elem.username == username)
    if (user) {
      return user
    }
  }

  const findUsernameBySocketId = socketId => {
    let user = usersList.find(elem => elem.socket_id == socketId)
        if (user) {
          return user
        }
  }

  const handleConnect = data => {
    let user = findByUsername(data.username)
    socket.join(data.room)

    if (!roomsList.find(elem => elem == data.room)) {
      roomsList = [...roomsList, data.room]
      io.emit('FETCH_ROOMS_LIST', roomsList)
    }

    if (!user) {
      user = {
        socket_id: socket.id,
        username: data.username,
        picture: `https://robohash.org/${Math.random().toString(36).substring(2)}`,
        room : data.room
      }
      usersList.push(user)
    }

    else {
      let updatedUser = usersList.findIndex(elem => elem.username == data.username)
      usersList[updatedUser].socket_id = socket.id

      if (!user.room == data.room) {
        usersList[updatedUser].room = data.room
      }
    }

    io.to(data.room).emit('CHAT_MESSAGE', {
      text: 'joined the room.',
      user: user,
      type: 'SERVER_MESSAGE_JOIN'
    })
    io.to(data.room).emit('ROOM_UPDATE_DATA', usersList)
  }

  const handleChatMessage = (data) => {
    io.to(data.room).emit('CHAT_MESSAGE', {
      text: data.text,
      user: findUsernameBySocketId(socket.id),
      type: 'USER_MESSAGE'
    })
  }

  const handleDisconnect = () => {
    let user = findUsernameBySocketId(socket.id)

    if (typeof user !== 'undefined') {

      io.to(user.room).emit('CHAT_MESSAGE', {
        text: 'left the room.',
        user: findUsernameBySocketId(socket.id),
        type: 'SERVER_MESSAGE_LEAVE'
      })

      usersList.splice(usersList.findIndex(elem => elem.username == user.username), 1)

      io.emit('ROOM_USERS_LIST', usersList)
    }
  }

  socket.on('ROOM_USER_CONNECT', data => handleConnect(data))
  socket.on('CHAT_MESSAGE', data => handleChatMessage(data))
  socket.on('disconnect', () => handleDisconnect())

  socket.on('HOME_USER_CONNECT', username => {
    usersList[username] = {
      'picture': `https://robohash.org/${Math.random().toString(36).substring(2)}`
    }

    io.emit('IRC_USERS_LIST', usersList)
    io.emit('IRC_ROOMS_LIST', roomsList)
  })

})

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})