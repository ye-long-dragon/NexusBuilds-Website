import express from 'express';
import unauthFailSafe from "../../middleware/unauthFailSafe.js";

const userProfile = express.Router();

userProfile.get('/', unauthFailSafe, (req, res) => {
    const user = req.session.user || {}; // ✅ fallback to empty object

    /*res.render('userprofile/index', {
        user
    });*/

    if (!user) {
        return res.render('Userprofile/index', { 
            email: null,
            username: null
        });
    } 

    res.render('Userprofile/index', {
        email: user.email,
        username: user.username,
    })

    
});


export default userProfile;