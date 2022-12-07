require("dotenv").config();
const cors = require('cors')
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express()
const port = process.env.PORT || 3000
const routers = require('./routes')
const {handleError} = require('./middlewares/errors')
const httpServer = createServer(app);

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const io = new Server(httpServer,{
  cors:{
    origin :'http://localhost:5173'
  }
})

io.on("connection",(socket)=>{
  console.log('connection on')
  socket.on('chat message', email => {
    console.log(email)
    socket.broadcast.emit('send message', email)
  })
})

app.use(routers)
app.use(handleError)

httpServer.listen(port)
// app.listen(port,() => {
//   console.log(`app launching on port  ${port}`)
// })
