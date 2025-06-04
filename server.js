import express from "express";

const app = express();
const PORT = 8000;

//set EJS templating engine
app.set('view engine', 'ejs');


app.get('index',(res,req)=>{
    res.render('index',index.ejs);
});


app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`);
})

