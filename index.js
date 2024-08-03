import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import userRoute from './src/routes/userRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(
    cors({
        origin:"*",
    })
);

app.use(bodyParser.json());

connectDB();

app.use('/api/v1/users', userRoute);

app.listen(PORT,() =>{
  console.log(`Server started on ${PORT}`);
})