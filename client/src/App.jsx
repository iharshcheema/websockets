import { useState, useEffect, useMemo } from 'react'
import { io } from 'socket.io-client'

function App() {
  const socket = useMemo(() => io('http://localhost:3000'), [])

  const submitHandler = (e) => {
    e.preventDefault()
    socket.emit('message', { message, room })
    setMessage('')
  }

  const handleRoomJoin = (e) => {
    e.preventDefault()
    socket.emit('join-room', roomname)
    setRoomname('')
  }

  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('')
  const [messages, setMessages] = useState([])
  const [roomname, setRoomname] = useState('')

  useMemo(() => {
    console.log(messages)
  }, [messages])

  // this will run when a socket connects
  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected with the id ${socket.id}`)
    })

    socket.on('welcome', (data) => {
      console.log(data)
    })
    socket.on('received-message', (data) => {
      console.log(data.message)
      setMessages((messages) => [...messages, data.message])
    })

    return () => {
      socket.disconnect()
      console.log('user disconnected')
    }
  }, [])

  return (
    <>
      <h1>Chat app</h1>

      <div>
        {/* joining a room  */}
        <h2>Join a room</h2>
        <form onSubmit={handleRoomJoin}>
          <label htmlFor="">Room name</label>
          <input
            type="text"
            value={roomname}
            onChange={(e) => setRoomname(e.target.value)}
          />
          <button type="submit">Join room</button>
        </form>
        <h2>Send a message </h2>

        {/* sending a message  */}
        <form onSubmit={submitHandler}>
          <label htmlFor="">message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <label htmlFor="">roomId</label>

          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
      {/* showing messages  */}
      <div>
        {messages.map((value) => {
          return <p key={Math.random()}>{value}</p>
        })}
      </div>
    </>
  )
}

export default App
