import express, { Request, Response } from "express";
import User from "../models/user"
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post("/register",
[check("FirstName","First Name is required").isString()
,check("LastName","Last Name is required").isString(),
check("email","email is required").isEmail(),
check("password","password atleast 6 or more charecters").isLength({min:6})],
async (req: Request, res: Response) => {
    const errors=validationResult(req);
    if(!errors.isEmpty())
        {
            return res.status(400).json({message:errors.array()})
        }
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // If user does not exist, proceed with user creation
        user = new User(req.body);
        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.Mode_ENV === "production",
            maxAge: 86400000
        });

        return res.status(200).send({message:"User registered"});
    } catch (error) {
        console.log(error);
         res.status(500).send({message:"Something went wrong"})
    }
});

export default router;
