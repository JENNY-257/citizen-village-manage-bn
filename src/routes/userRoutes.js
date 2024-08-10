import { Router } from 'express';
import {
registerUser, 
sendEmailToUser, 
updatePassword, 
userLogin, 
userLogout, 
userResetPassword, 
verifyuserEmail 
} 
from '../controllers/authentication/userController.js';

import { 
emailSchemaValidation,
loginSchemaValidation,
signupSchemaValidation,
resetPasswordValidation, 
updateValidation
}
from '../validations/userValidation.js';
import { checkBlackList, isLoggedIn } from '../middleware/userMiddleware.js';

const userRoute = Router();

userRoute.post('/signup', signupSchemaValidation,registerUser);
userRoute.get('/verify-email/:accessToken',verifyuserEmail);
userRoute.post('/login', loginSchemaValidation,userLogin);
userRoute.post('/send-email',emailSchemaValidation,sendEmailToUser);
userRoute.post('/reset-password/:token',resetPasswordValidation,userResetPassword);
userRoute.patch('/update-password',updateValidation,isLoggedIn,checkBlackList,updatePassword);
userRoute.post('/logout',userLogout);
export default userRoute;