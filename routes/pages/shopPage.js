import express from 'express';
const shopPage = express.Router();

shopPage.get('/',(req,res)=>{
    res.render("shop/index");
})

shopPage.get('/product/payment',(req,res)=>{
    res.render("payment/index");
})

export default shopPage;