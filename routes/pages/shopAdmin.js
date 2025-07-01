import express from "express";
const shopAdmin = express.Router();

shopAdmin.get('/',(req,res)=>{
    res.render('myProducts/index',{products: null});
});

shopAdmin.get('/shiporders',(req,res)=>{
    res.render('shipOrders/index',{shipOrders: null});
});

shopAdmin.get('/addproduct',(req,res)=>{
    res.render('addProduct/index');
});

export default shopAdmin;