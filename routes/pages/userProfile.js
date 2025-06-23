import express from 'express';
const userProfile = express.Router();

userProfile.get('/',(req,res)=>{
    const user = req.session.user;

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