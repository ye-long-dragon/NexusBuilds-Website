import express from 'express';
const payment = express.Router();

payment.get('/',(req,res)=>{
    res.render("payment/index");
});

export default payment;