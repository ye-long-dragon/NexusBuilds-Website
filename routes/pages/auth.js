import express from 'express';
const auth = express.Router();

     auth.get('/', (req, res) => {
       res.render("auth/index");
     });
     

export default auth;