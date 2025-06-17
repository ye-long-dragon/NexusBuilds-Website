import express from 'express';
const shopPage = express.Router();

shopPage.get('/',(req,res)=>{
    res.render("Shop-Page");
})

shopPage.get('/product/payment',(req,res)=>{
    res.render("payment");
})

shopPage.get('/product',(req,res)=>{
    res.render("productPage");
})

export default shopPage;