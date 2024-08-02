import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const mongoURI = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
           
              useNewUrlParser:true,
              useUnifiedTopology:true,  
     
            } );
            console.log("Mongodb connected successfully");
    } catch (error) {
        console.error("Mongodb failed to connect");
        console.error(error)
    }
}
export default connectDB;