import mongoose from "mongoose";


const connectToMongoDB = async() => {
    try {
     await mongoose.connect(process.env.MONGO_DB_URL2);
     console.log("connected to mongodb");
    }catch(error) {
       console.log("error connecting to mongodb")
    }
}

export default connectToMongoDB;