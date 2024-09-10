import User from "../../models/UserModel.js";


export const adminAssignRole = async(req,res) => {

    try {
      const {userId} = req.params;
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
      return res.status(201).json(
      {message:"user updated succcefully",upddatedRole});

    } catch (error) {
        console.log(`${error}`);
        return res.status(500).json(
        {message:"error for assigning role"});
    }

}


