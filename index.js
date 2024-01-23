const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const initWebRouter = require('./src/router/web');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const PORT = 1906;
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection',(socket) => {
    console.log("User connect");
    socket.on('userId',(userId) => {
        console.log('Connect with userId :' ,userId);
    })

    socket.on('disconnect',() => {
        console.log('User disconnect');
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


initWebRouter(app);
app.listen(PORT,() => {
    console.log("Server listening on port " + PORT);
});