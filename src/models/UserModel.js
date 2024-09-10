import mongoose from "mongoose";
import generateProfilePicture from "../service/defaultProfile.js";

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
        enum:['admin','village leader','villager','visitor'],
        default:'villager'
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
      profile:{
        type:String,
        default:function(){
            return generateProfilePicture(this.firstName,this.lastName);
        }
      },
    
      isActive:{
        type:Boolean,
        default:true
      },
      verified:{
        type:Boolean,
        default:false
      }
},{timestamps:true});

const User = mongoose.model('User',userSchema);
export default User;