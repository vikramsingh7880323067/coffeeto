
import colors from "colors"
import mongoose from "mongoose";

const connectDB= async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(
            `Conneted To Mongodb Databse ${conn.connection.host}`.bgBlue.white
          );

    }
    catch(error){
        console.log(`Error in MongoDb ${error}`.bgRed.white);
    }
}

export default connectDB;