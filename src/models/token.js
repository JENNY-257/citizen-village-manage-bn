import mongoose, { Schema } from "mongoose";
import User from "./UserModel";

const userToken = mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:User,
        required:true,
    },

    token:{
        type:String,
        required:true,
    },
},{timestamps:true});

const Token = mongoose.Schema('token','userToken');

 export default Token;