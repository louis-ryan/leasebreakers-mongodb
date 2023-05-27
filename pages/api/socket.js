// import { Server } from 'Socket.IO'

// const SocketHandler = (req, res) => {
//   if (res.socket.server.io) {
//   } else {
//     const io = new Server(res.socket.server)
//     res.socket.server.io = io

//     io.on('connection', socket => {

//       socket.on('join-room', room => {
//         socket.join(room)
//       })

//       socket.on('input-change', (msg, room) => {
//         socket.to(room).emit('update-input', msg)
//       })
//     })

//   }
//   res.end()
// }

// export default SocketHandler