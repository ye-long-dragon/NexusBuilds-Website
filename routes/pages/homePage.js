import express from 'express';
const homePage = express.Router();

homePage.get('/',(req,res)=>{
  res.render("Landing-Page/index");
});

export default homePage;