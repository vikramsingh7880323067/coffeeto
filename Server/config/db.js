

import mongoose from "mongoose";
import colors from "colors"

const connectDB= async ()=>{
    mongoose.set('strictQuery', false);
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