import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from '../../models/UserModel.js';


export const registerUser = async(req,res) =>{

    try {
        const {firstName,lastName,email,password,
            role,maritalStatus,title,isActive} = req.body;

        const existingUser = await User.findOne({email:email});

        // check if the user exists in database

        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        //  hashing pasword
        const saltArounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltArounds);

        // save the user to the database
        const accessToken = jwt.sign(
            {email:email},
            process.env.ACCESS_TOKET_SECRETE,
            )
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            role,
            maritalStatus,
            title,
            isActive
        });

        
        await newUser.save();

               
        return res.status(200).json({
            message:"Your account has been created succesfully",newUser,accessToken});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error creating user" });
    }

}

