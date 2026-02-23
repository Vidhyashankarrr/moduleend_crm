import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import CasesModel from "../models/CasesModel.js";

dotenv.config();

export const login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password_hash;
    let user = await UserModel.findOne({ email: email }).select('-__v');
    if (!user) {
        return res.status(400).json({ message: "User with this email doesn't find!! please register before login" })
    }
    let isMatch = await bcrypt.compare(password, user.password_hash)
    if (isMatch) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, { expiresIn: "1d" })//any unique data/property,a secret code and expire time. This will create a token when login and send as response
        res.status(200).json({
            message: "Logged in successfully",
            token
        })
    } else {
        return res.status(400).json({ msg: "The provided email or password is not matching" })
    }
}

export const profile = async (req,res)=>{
    const user = req.user.toObject(); // convert to plain JS object
    let cases = await CasesModel.find({assigned_to:user._id})
   res.status(200).json({user:{...user,casesAssigned:cases}})
}