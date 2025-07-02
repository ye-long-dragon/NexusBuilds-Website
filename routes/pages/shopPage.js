import express from 'express';
import Product from '../../models/product.js';
const shopPage = express.Router();

shopPage.get('/', (req, res) => {
    res.render("shop/index", { products: [] });
});

shopPage.get('/product/payment',(req,res)=>{
    res.render("payment/index");
})


shopPage.get('/product',(req,res)=>{
    res.render("productPage/index");
})

export default shopPage;