import UserModel from "../models/UserModel.js"
import bcrypt from 'bcrypt';

//get users

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}).select('-__v').limit(10);//only fetch 10 users
        res.json({ users: users });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while fetching data",
            error: error.message
        })
    }

}

//get one user with id

export const getAUser = async (req, res) => {
    try {

        let id = req.params.id;
        const user = await UserModel.findById(id).select('-__v');
        res.status(200).json({ user });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while fetching data",
            error: error.message
        })
    }
}

//add a user

export const addUser = async (req, res) => {
    try {
        const {name,email,password_hash,username,role} = req.body;
        //to check whether the suer is alredy existing
        const isExisting = await UserModel.findOne({ email: email })
        if (isExisting) {
            return res.status(400).json({ message: "User already exist with this email" })
        }
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password_hash, salt)
        await UserModel.create(
            {
                name,
                email,
                role,
                username,
                password_hash:hashedPassword
            }
        )
        res.status(201).json({
            message: "User created successfully",
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while adding data",
            error: error.message
        })
    }
}

//delete a user

export const deleteUser = async (req, res) => {
    try {

        let id = req.params.id;
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while deleting data",
            error: error.message
        })
    }
}

//update a user

export const updateUser = async (req, res) => {
    try {

        let id = req.params.id;
        let { name, username, password_hash, email, role } = req.body;
        let updatedUser = await UserModel.findByIdAndUpdate(id, { name, username, password_hash, email, role }, { new: true });////{new:true} to get the updated value in user
        res.status(200).json({
            message: "Usre updated",
            updatedUser
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Something went wrong while updating data",
            error: error.message
        })
    }
}

