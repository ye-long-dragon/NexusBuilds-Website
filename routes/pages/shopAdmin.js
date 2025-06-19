import express from "express";
const shopAdmin = express.Router();

shopAdmin.get('/',(req,res)=>{
    res.render('myProducts/index');
});

shopAdmin.get('/shiporders',(req,res)=>{
    res.render('shipOrders/index');
});

shopAdmin.get('/addproduct',(req,res)=>{
    res.render('addProduct/index');
});

export default shopAdmin;