import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    //authorisation
    cors :{
        origin : ["http://localhost:3000"],
        methods : ["GET", "POST"],
    },
});

export const getReceiverSockedId = (receiverId) => {
    return userSocketMap[receiverId];
}
//the match between userid and socketid this help us to know wich socket the user is connected to
const userSocketMap = {}; //{ key userId :value socketId}
//connexion to the server via socket     
io.on('connection',(socket)=> {
    console.log("a user connected", socket.id);
    //userid extracted from socket id this can be useful to identify a user connected to this socket 
    //and do actions in terms of his identity
    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId] = socket.id;
      //inform all the online users
    io.emit("getOnlineUsers",Object.keys(userSocketMap));


 socket.on("disconnected",()=> {
    console.log("user disconnected", socket.id);

    delete userSocketMap[userId];
    // inform all the online users
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
 });   
});

export {app,io,server};

