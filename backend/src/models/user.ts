import mongoose from "mongoose";
import bcrypt from  "bcryptjs";
import { UserType } from "../shared/types";

const userSchema =new mongoose.Schema({
    email: { type:String, required:true, unique :true},
    password: { type:String, required:true},
    FirstName: { type:String, required:true},
    LastName: { type:String, required:true},


},{timestamps:true});

userSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8);
    }
    next();
})

const User= mongoose.model<UserType>("User",userSchema);

export default User;