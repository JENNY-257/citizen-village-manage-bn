import mongoose from "mongoose";
const blaclListSchema =  new mongoose.Schema({

    token:{
        type:String,
        required:true,
        ref:"User"
    },
},{timestamps:true});

const Token = mongoose.model('Token', blaclListSchema);

 export default Token;