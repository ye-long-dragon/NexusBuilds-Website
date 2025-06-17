import express from 'express';
const userProfile = express.Router();

userProfile.get('/',(req,res)=>{
    res.render('UserProfile');
});

export default userProfile;