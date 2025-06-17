import express from 'express';
const auth = express.Router();

     auth.get('/login', (req, res) => {
       res.render("login/index");
     });

     auth.get("/signup", (req, res) => {
       res.render("signin/index");
     });

     auth.get("/forgotpassword", (req, res) => {
       res.render("forgotPass/index");
     });
     
     

export default auth;