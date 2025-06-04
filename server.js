import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 8000;

//initializing EJS and Statics
//DO NOT DELETE
//If you have problems, please direct your attention VinSupport
app.set('view engine','ejs');
app.use(express.static('styles'));
app.use(express.static('assets'));


//Creating endpoints/URI for selected indexes
app.get('/',(req,res)=>{
    res.render('Landing-Page/index');
});

app.get('/auth',(req,res)=>{
    res.render('auth/index')
});

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
});