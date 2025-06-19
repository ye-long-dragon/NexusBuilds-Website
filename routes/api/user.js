import express from 'express';
import User from "../../models/user.js"
const router = express.Router();

router.post("/users", async (req,res)=>{
    const user = req.body;

    const result = await User.create(user);
    return res.status(201).json();
})

export default router;