require('dotenv').config()
const cors = require('cors');
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const route = require('./routes/web_routes')
const http = require("http");
const socketIo = require("socket.io");
const Emitter = require('events')



const PORT = process.env.PORT || 5000

const app = express() 

app.use(cors())

// const corsOptions ={
//     origin:
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
    
// }

mongoose.connect(process.env.DATABASE,{ 
                useNewUrlParser: true, 
                useCreateIndex:true, 
                useUnifiedTopology: true, 
                useFindAndModify : true
             }).then(() => {
                console.log('Database connected...')
             }).catch((err) => {
                    console.log('Connection failed...')
             })


// Global Middelwares 
// app.use(require("cors")())
//// "server": "nodemon index.js --ignore client"



app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }) )
app.use(route)

// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

const server = http.createServer(app);

const io = socketIo(server,{
    cors: {
        origin: `${process.env.ENDPOINT}`,
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin"],
        credentials: true
    }
})

io.on("connection", socket => { 
    
    socket.on('join', (orderId) => {
        socket.join(orderId)
    })
    
    socket.on("disconnect", () => {});
});

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

server.listen(PORT,() => {
    console.log(`sever listening on ${PORT}`)
})