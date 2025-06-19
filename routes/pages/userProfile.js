import express from 'express';
const userProfile = express.Router();

userProfile.get('/',(req,res)=>{
    const user = req.session.user;

    if (!user) {
        return res.render('userprofile/index', { 
            email: null,
            username: null
        });
    } 

    res.render('userprofile/index', {
        email: user.email,
        username: user.username,
    })
    
});

export default userProfile;