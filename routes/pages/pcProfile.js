import express from 'express';
const pcProfile = express.Router();

pcProfile.get('/',(req,res)=>{
    res.render("PcProfile");
})

export default pcProfile;