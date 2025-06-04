import express from "express";

const app = express();
const PORT = 8000;

app.set('view engine','ejs');

app.use(express.static('public'));

app.use(express.static('assets'));

app.get('/',(req,res)=>{
    res.render('Landing-Page/index');
})

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})