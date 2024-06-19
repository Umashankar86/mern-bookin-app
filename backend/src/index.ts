import express, { Request, Response } from 'express';
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose';
import UserRoute from './routes/users';
import AuthRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import verifyToken from './middleware/auth';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import myHotelRoutes from './routes/my-hotels';
import hotelRoutes from "./routes/hotels";
import bookingRoutes from "./routes/my-booking"
// Ensure your environment variables are set correctly
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SEC
});

// Connect to MongoDB
mongoose.connect(process.env.MANGO as string)
  .then(() => console.log("Connected to database:", process.env.MANGO))
  .catch(err => console.error("Database connection error:", err));

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Global logging middleware
app.use((req: Request, res: Response, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log(`Query params: ${JSON.stringify(req.query)}`);
  next();
});

// Static files
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoute);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});

export default verifyToken;
