import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;


//test route
app.get("/",(req,res) => {
    //the root route is localhost:5000
res.send("Hello worldd!");
});

app.use(express.json()); //to parse the incoming requests with json payloads (from req.body)
app.use(cookieParser()); //to have access to the cookie 

app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes)


app.listen(PORT,() => {

     connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
} 
)
