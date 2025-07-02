import express from 'express';
import User from "../../models/user.js";
// import bcrypt from 'bcryptjs';

const router = express.Router();


// get user
router.get('/users/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({email});

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// post user 
router.post("/users", async (req,res)=>{
    const user = req.body;

    const result = await User.create(user);
    return res.status(201).json();
})

// logout
router.post("/logout", async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
        return res.status(500).json({ message: "Logout Failed" });
        }

        res.clearCookie("connect.sid"); // ✅ Optional but recommended
        return res.json({ message: "Logout Successful" });
    });

    return res.status(201).json()
});

router.get('/', async (req, res) => {
    const user = req.session.user;

    const formattedDate = new Date(req.user.dateOfBirth).toISOString().split("T")[0];
    req.session.user.dateOfBirth = formattedDate;

    if (!user) {
        return res.render('Landing-Page/index', { user: null });
    }

    res.render('Landing-Page/index', {
        user: user
    });
})


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// get user
router.get('/users/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({email});

        req.session.user = user;
        req.session.email = email;

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// post user 
router.post("/users", async (req,res)=>{
    const user = req.body;

    const result = await User.create(user);
    return res.status(201).json();
})



export default router;


