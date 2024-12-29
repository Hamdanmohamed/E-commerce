import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
dotenv.config();

connectDB()


const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



const PORT = process.env.PORT




app.use("/api/users",userRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})