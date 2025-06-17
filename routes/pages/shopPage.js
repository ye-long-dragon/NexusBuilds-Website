import express from 'express';
const shopPage = express.Router();

shopPage.get('/',(req,res)=>{
    res.render("Shop-Page/index");
})

shopPage.get('/product/payment',(req,res)=>{
    res.render("payment/index");
})

export default shopPage;