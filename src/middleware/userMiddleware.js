import jwt from 'jsonwebtoken';
import Token from '../models/blackList.js';

export const isLoggedIn = async(req,res,next) => {
    
    try {

        // check if auth header exists
        if(req.headers.authorization){
            // parse the token from headder
            //split the header and get token
            const token = req.headers.authorization.split(" ")[1];
            if(token){
                const payload =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRETE);
                if(payload){
                    // store  user data in request object
                    req.user = payload;
                    next();
                }
                else{
                    return res.status(400).json({
                    message:"token verification failed"})
                }
            }
            else{
                return res.status(400).json({
                message:"malformed auth header"});
            }
        }
        else{
            return res.status(400).json({
            message:"please login"});
        }
        
    } catch (error) {
        return res.status(500).json({
        error:error.message});
    }
}

export const checkBlackList = async(req, res, next) => {

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
        const blackListToken = await Token.findOne({token});
        if(blackListToken){
            return res.status(400).json({
            message:"You sesion has expired please login"});
        }
        next()
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }

}

export const checkUserRole = (roles) => {

    return async(req,res,next)=>{
        try {
            if(!req.user){
                return res.status(404).json(
                {message:"Unauthorize!please login"});
            }
            const userRole = req.user.role;
            if(!roles.includes(userRole)){
                return res.status(403).json(
                {message:"Access denied"});
            }
            next();
        } catch (error) {
            return res.status(500).json(
            {error:error.message});
        }
    }
}
