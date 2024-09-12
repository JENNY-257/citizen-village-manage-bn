import User from "../../models/UserModel.js";
import mongoose from "mongoose";

export const adminAssignRole = async(req,res) => {

    try {
      const {userId} = req.params;

      // Check if id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
         return res.status(400).json(
         { message: "Invalid user ID format" });
      }
      const {userRole} = req.body;
      const validRoles = ['admin','village leader','villager','visitor'];
      
      if (!validRoles.includes(userRole)) {
        return res.status(400).json({
            message: "Invalid role "
        });
    }
      const user = await User.findOneAndUpdate(
                                {_id:userId},
                                {$set:{role:userRole}},
                                {new:true});
      if(!user){
        return res.status(404).json(
        {message:"User not found"});
      }
      const upddatedRole = user.role;
      return res.status(200).json(
      {message:"user updated succcefully",upddatedRole});

    } catch (error) {
        return res.status(500).json(
        {message:"error for assigning role"});
    }

}

export const getAllUsers = async(req,res) => {

  try {

    const users = await User.find();

    if(users.length == 0){
      return res.status(404).json(
      {message:"Users not found"});
    }

    return res.status(201).json(
    {message:"Thank you for getting all users",users})

  } catch (error) {
    return res.status(500).json(
    {message:"error for getting users"});
  }

}

export const getSingleUser = async(req,res) => {

  try {

    const {id} = req.params;

    // Check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json(
       { message: "Invalid user ID format" });
    }
    const user = await User.findById(id);
    if(!user){
      return res.status(404).json(
      {message:"User not found"});
    }
    
    return res.status(200).json(
    {message:"Successfully",user});
    
  } catch (error) {
    return res.status(500).json(
    {message:"error for getting user"});
  }

}


export const deleteUser = async(req,res) => {
      
  try {
    const {userId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(userId)){

      return res.status(400).json(
      {message:"invalid user ID"});

    }

    const user = await User.findById(userId);

    if(!user){

      return res.status(404).json(
      {message:"User not found"});

    }

    await User.deleteOne({_id:userId})

    return res.status(200).json(
    {message:"user deleted successfully"});

  } catch (error) {

    return res.status(500).json(
    {message:"error for deleting user"});
    
  }

}