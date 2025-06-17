import express from 'express';
const auth = express.Router();

     auth.get('/login', (req, res) => {
       res.render("login");
     });

     auth.get("/signup", (req, res) => {
       res.render("signin");
     });

     auth.get("/forgotpassword", (req, res) => {
       res.render("forgotPass");
     });
     
     

export default auth;