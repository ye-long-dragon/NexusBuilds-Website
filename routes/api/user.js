import express from 'express';
import User from "../../models/user.js"
const router = express.Router();

router.post("/users", async (req,res)=>{
    const user = req.body;

    const result = await User.create(user);
    return res.status(201).json();
})

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

router.get('/', async (req, res) => {
    const user = req.session.user;

    if (!user) {
        return res.render('Landing-Page/index', { username: null });
    }

    res.render('Landing-Page/index', {
        username: user.username
    });
})

export default router;