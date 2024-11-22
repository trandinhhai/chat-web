const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messagesRoutes")
const socket = require("socket.io")
const app = express()
require("dotenv").config()

app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes)
app.use("/api/message", messageRoutes)

mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log('kết nối database thành công')
}).catch((err)=>{
    console.log(err.message)
})

const server = app.listen(process.env.PORT, ()=> {
    console.log(`khởi chạy node thành công`)
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        Credential: true,

    }
})
global.onlineUsers = new Map()

io.on("connection", (socket) => {
    global.chatSocket = socket
    socket.on("add-user",(userId) => {
        onlineUsers.set(userId, socket.id)
    })
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve", data.message)
        }
    })
})