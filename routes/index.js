import express from 'express';
const router = express.Router();

router.get('/',(req,res)=>{
  res.render("Landing-Page/index");
});

router.get('/shop',(req,res)=>{
  res.render("Landing-Page/partials/sections/shopBlock");
});

router.get('/auth',(req,res)=>{
  res.render("auth/index");
});

export default router;