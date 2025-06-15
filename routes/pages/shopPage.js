import express from 'express';
const shopPage = express.Router();

shopPage.get('/',(req,res)=>{
    res.render("Shop-Page/index");
})

export default shopPage;