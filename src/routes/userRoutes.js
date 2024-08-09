import { Router } from 'express';
import { registerUser, userLogin, verifyuserEmail } from '../controllers/authentication/userController.js';
import { loginSchemaValidation, signupSchemaValidation } from '../validations/userValidation.js';

const userRoute = Router();

userRoute.post('/signup', signupSchemaValidation,registerUser);
userRoute.get('/verify-email/:accessToken',verifyuserEmail);
userRoute.post('/login', loginSchemaValidation,userLogin);

export default userRoute;