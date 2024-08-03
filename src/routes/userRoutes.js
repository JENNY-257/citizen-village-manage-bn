import { Router } from 'express';
import { registerUser } from '../controllers/authentication/userController.js';
import { signupSchemaValidation } from '../validations/userValidation.js';

const userRoute = Router();

userRoute.post('/signup',signupSchemaValidation,registerUser);

export default userRoute;