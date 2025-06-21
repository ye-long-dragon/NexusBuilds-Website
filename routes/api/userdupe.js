import express from 'express';
import User from "../../models/user.js";
import bcrypt from 'bcryptjs';

const router = express.Router();

//create user
router.post("/user",async (req, res) => {
    const {username, email, password} = req.body;

    try{
        const result =await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, 10) // Hash the password
        });

        res.status(201).json({message: "User created successfully", user: result});
    }
    catch(error){
        if(error.errorResponse.errmsg.includes("E11000 duplicate key error collection")){
            return res.status(400).json({message: "User already exists"});
        }

        res.status(500).json({message: "Internal server error", error: error.message});
    }
});

//login user
router.post("/login", async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await User.where({email}).findOne();

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        const result = bcrypt.compareSync(password, user.password);
        if(!result) {
            return res.status(401).json({message: "Invalid password"});
        }

        req.session.user = {
            id: user._id,
            username: user.username,
        }

        res.json({ message: "Login successful"});
    }
    catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
});