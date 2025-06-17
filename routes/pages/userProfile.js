import express from 'express';
const userProfile = express.Router();

userProfile.get('/',(req,res)=>{
    res.render('userprofile/index');
});

export default userProfile;