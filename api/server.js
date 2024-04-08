import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import path from 'path'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';


dotenv.config();

const PORT = process.env.PORT || 7000;

const __dirname = path.resolve();




app.use(express.json()); //to parse the incoming requests with json payloads (from req.body)
app.use(cookieParser()); //to have access to the cookie 

app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
 
app.use(express.static(path.join(__dirname, "/client/dist")));
//running our frontend from the server
app.get("*",(req,res)=> {
    res.sendFile(path.join(__dirname, "client","dist","index.html"));
});

server.listen(PORT,() => {

     connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
} 
)
