import express from 'express';
const router = express.Router();

router.get('/',(req,res)=>{
  res.render("Landing-Page/index");
})

router.get('/auth',(req,res)=>{
  res.render("auth/index");
})

export default router;