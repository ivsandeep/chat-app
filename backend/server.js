const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const { chats } = require('./data/data');
const connectDB = require("./config/db.js");
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
// const { notFound } = require("./middlewares/errorMiddleware.js");
const app = express();
dotenv.config();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));


// cors: {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST'],
//     },


app.use(express.json())// to accept JSON data
connectDB();




const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send("API is running");
})


app.get('/api/chats', (req, res) => {
    res.send(chats);
})

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);










const server = app.listen(PORT, console.log("server started at Port 5000"));


const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    }
})



io.on('connection', (socket) => {
    console.log('connected to socket.io')

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    })

    socket.on('join-chat', (room) => {
        socket.join(room);
        console.log("user joined room" + room);
    })

    socket.on('new-message', (newMessage) => {
        let chat = newMessage.chat;
        chat.users.forEach(user => {
            if (user._id == newMessage.sender._id) return;
            socket.in(user._id).emit('message-received', newMessage)
        })
    })

    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop-typing', (room) => socket.in(room).emit('stop-typing'));
    socket.off("setup", () => {
        console.log("Userr disconnected");
        socket.leave(userData._id);
    })
})



