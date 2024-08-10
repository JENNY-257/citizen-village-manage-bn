import jwt from 'jsonwebtoken';

export const isLoggedIn = async(req,res,next) => {
    
    try {

        // check if auth header exists
        if(req.headers.authorization){
            // parse the token from headder
            //split the header and get token
            const token = req.headers.authorization.split(" ")[1];
            if(token){
                const payload = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRETE);
                if(payload){
                    // store  user data in request object
                    req.user = payload;
                    next();
                }
                else{
                    return res.status(400).json({message:"token verification failed"})
                }
            }
            else{
                return res.status(400).json({message:"malformed auth header"});
            }
        }
        else{
            return res.status(400).json({message:"please login"});
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message});
    }
}