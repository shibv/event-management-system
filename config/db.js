import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected Successfully !!")
        
    } catch (error) {
        console.log(error);
        process.exit(1); // Exit process with failure
    }
   
}

export default connectDB;