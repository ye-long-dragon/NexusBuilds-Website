import express from 'express';
const userProfile = express.Router();

userProfile.get('/',(req,res)=>{
    res.render('UserProfile/index');
});

export default userProfile;