import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from '../../models/UserModel.js';
import { sendEmail } from '../../utils/sendEmail.js';
import Token from '../../models/blackList.js';

// create user account

export const registerUser = async(req,res) =>{

    try {
        const {firstName,lastName,email,password,
            role,maritalStatus,title,isActive} = req.body;

        const existingUser = await User.findOne({email:email});

        // check if the user exists in database

        if(existingUser){
            return res.status(400).json({
            message:"User already exists"});
        }
        //  hashing pasword
        const saltArounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltArounds);
        // generate access token during create accoumt
       
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

        const createdUser = await newUser.save();
        // create user token
        const accessToken = jwt.sign(
            {email:email},
            process.env.ACCESS_TOKEN_SECRETE,
            )
        const url = `${process.env.FRONTEND_URL}/api/v1/users/verify-email/${accessToken}`;
        // send link for activate user email acount
        const mailOptions = {
            to:createdUser.email,
            subject: "Email activation Link",
            html: `
                 <p style="font-size:15px;">Dear ${createdUser.firstName} ${createdUser.lastName},</p>
                 <p>Welcome to the Citizen Village Management System. Please click the link below to activate your account:</p>
                 <a style="background-color: rgb(30 58 138); color: white;  padding: 20px; border-radius: 10px; display: inline-block; text-decoration: none;" href="${url}">Activate your account</a>`
        };
            try {
                await sendEmail(mailOptions);
    
            } catch (error) {
                return res.status(500).json({
                message:"failed to send email verification"})
            }
    
            return res.status(200).json({
            message:"user created succesfully please verify your email"
        })
        
    } catch (error) {
        return res.status(500).json({
        message: "Error creating user" });
    }

}


// verify user email

 export const verifyuserEmail = async(req,res) => {

    try {
        const {accessToken} = req.params;
        const verifyToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRETE);
        const {email} = verifyToken;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
            message:"User not found"});
        }
        
        if(user.verified == true){
            return res.status(200).json({
            message:"email aleady verified"});  
        }
        await User.updateOne(user, { verified: true });
        return res.status(200).json({
        message:"email verified sucessfully"});
    } catch (error) {
        return res.status(500).json({
        message:"error for verrifying email"});
    }

}
// user login to the system

export const userLogin = async(req,res) =>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            res.status(404).json({
            message:"invalid email"});
        }
        // Compare the body enterd by the suer if
        //  it is mach with the saved user email
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(400).json({
            message: 'Invalid password' });
          }

          if(user.verified!=true){
            return res.status(400).json({
            message:"Email is not verified"});
        }

        const token = jwt.sign({ email:email,role:user.role },
                 process.env.ACCESS_TOKEN_SECRETE);
        return res.status(200).json({
        message: 'Login successful', token });
          
    } catch (error) {
        console.log(error)
       return res.status(500).json({
       message:"error for login"}) 
    }
}
// send email to reset password

export const sendEmailToUser = async(req,res) => {

    try {

        const {email} = req.body;
        const userEmail = await User.findOne({email:email});
        if(!userEmail){
            return res.status(404).json({
            message:"User not found"});
        }
        if(userEmail.verified!=true){
            return res.status(400).json({
            message:"Email is not verified"});
        }
        const token = jwt.sign({email:email},process.env.ACCESS_TOKEN_SECRETE);
        const url = `${process.env.FRONTEND_URL}/api/v1/users/reset-password/${token}`;

        const mailOptions = {
            to:userEmail.email,
            subject: "Email reset password Link",
            html: `
                 <p style="font-size:15px;">Dear ${userEmail.firstName} ${userEmail.lastName},</p>
                 <p>Welcome to the Citizen Village Management System. Please click the link below to reset your password:</p>
                 <a style="background-color: rgb(30 58 138); color: white;  padding: 20px; border-radius: 10px; display: inline-block; text-decoration: none;" href="${url}">Reset password</a>`
        };
        try {
            await sendEmail(mailOptions);
        } catch (error) {
            return res.status(500).json({
            message:"Failed to send email reset password"});
        }

        return  res.status(200).json({
        message:"Check on your email to reset password"})
         
    } catch (error) {
        return res.status(500).json({
        message:"Error for sending email to user"});
    }

}


// user reset password

export const userResetPassword = async(req,res) => {

    try {
        const {token} = req.params;
        const {newPassword, confirmPassword} = req.body;

        const verifyToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRETE);
        const {email} = verifyToken;
        const user = await User.findOne({email});

        if(!user){
            return res.status(500).json({
            message:"User not found"})
        }
        

        if(newPassword != confirmPassword){
            return res.status(400).json({
            message:"password must much with new password"});
        }

        const hashPassword = await bcrypt.hash(newPassword,10);

        user.password = hashPassword;
        await user.save();
        return res.status(200).json({
        message:"Password reset succesfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        message:"Error for reseting password"});
    }

}


export const updatePassword = async(req, res) => {
    try {
        const {currentPassword, newPassword, confirmPassword} = req.body;

        const token = req.headers.authorization.split(" ")[1];
        const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE);
        const {email} = verifyToken;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
            message:"user not found"});
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
            message: "Current password is incorrect" });
        }
  
        if(newPassword !== confirmPassword){
            return res.status(400).json({
            message:"new password must much with confirm password"});
        }
         
        const updatedPassword = await bcrypt.hash(newPassword, 10);

        user.password = updatedPassword;
        await user.save();
        return res.status(201).json({
        message:"Password updated succesfully"});

    } catch (error) {
       return res.status(500).json({
       message:"Error for updating password"}); 
    }
}

// user logout
export const userLogout = async(req, res) =>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(404).json({
            message:"Aurhorization header is missing"});
        }
        const token = authHeader.split(" ")[1];

        if(!token){
            return res.status(404).json({
            message:"Invalid authorization format"});
        }

        const newBlackList = new Token({
            token
        })
        await newBlackList.save();
        return res.status(201).json({
        message:"User logout succesfully"});

    } catch (error) {
        return res.status(500).json({
        message:"Error for logout acount"});
    }
}