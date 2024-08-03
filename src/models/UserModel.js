import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    
      firstName:{
        type:String,
        required:true
      },

      lastName:{
        type:String,
        required:true
      },

      email:{
        type:String,
        required:true
      },

      password:{
        type:String,
        required:true
      },
      role:{
        type:String,
        default:'user'
      },

      maritalStatus:{
        type:String,
        enum:['single','maried'],
        required:true
      },

      title:{
        type:String,
        enum:['Mother','Father','Child'],
        required:true
      },
    
      isActive:{
        type:String,
        default:true
      },
      verified:{
        type:Boolean,
        default:false
      }
});

const User = mongoose.model('User',userSchema);
export default User;