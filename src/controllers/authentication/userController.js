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
        // generate access token during create accoumt
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

       // save the user to the database

        await newUser.save();

               
        return res.status(200).json({
            message:"Your account has been created succesfully",newUser,accessToken});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error creating user" });
    }

}


export const userLogin = async(req,res) =>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            res.status(404).json({message:"invalid email"});
        }
        // Compare the body enterd by the suer if
        //  it is mach with the saved user email
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(400).json({
                 message: 'Invalid password' });
          }

        const token = jwt.sign({ email:email },
                 process.env.ACCESS_TOKET_SECRETE);
        return res.status(200).json({
             message: 'Login successful', token });
          
    } catch (error) {
       return res.status(500).json({message:"error for login"}) 
    }
}
