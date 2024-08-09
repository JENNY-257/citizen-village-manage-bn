import { Router } from 'express';
import {
registerUser, 
sendEmailToUser, 
userLogin, 
userResetPassword, 
verifyuserEmail 
} 
from '../controllers/authentication/userController.js';

import { 
emailSchemaValidation,
loginSchemaValidation,
signupSchemaValidation,
resetPasswordValidation 
}
from '../validations/userValidation.js';

const userRoute = Router();

userRoute.post('/signup', signupSchemaValidation,registerUser);
userRoute.get('/verify-email/:accessToken',verifyuserEmail);
userRoute.post('/login', loginSchemaValidation,userLogin);
userRoute.post('/send-email',emailSchemaValidation,sendEmailToUser);
userRoute.post('/reset-password/:token',resetPasswordValidation,userResetPassword);

export default userRoute;