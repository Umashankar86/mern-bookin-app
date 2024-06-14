import express,{Request, Response} from 'express';
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose';
import UserRoute from './routes/users';
import AuthRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import verifyToken from './middleware/auth';
import path from 'path';
mongoose.connect(process.env.MANGO as string).then(()=>console.log("Connected to database:", process.env.MANGO))

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
}));

app.use(express.static(path.join(__dirname,"../../frontend/dist")))
app.use("/api/auth",AuthRoutes)
app.use("/api/user",UserRoute)

app.listen(9000, ()=>{
         console.log("server is running");
})

export default verifyToken;