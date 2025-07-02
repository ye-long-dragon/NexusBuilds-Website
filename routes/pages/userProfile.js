import express from 'express';
import unauthFailSafe from "../../middleware/unauthFailSafe.js";

const userProfile = express.Router();

userProfile.get('/', unauthFailSafe, (req,res)=>{
    const user = req.session.user;

    if (!user) {
        return res.render('userprofile/index', { 
            email: null,
            username: null
        });
    } 

    res.render('userprofile/index', {
        user
    })
    
});

export default userProfile;