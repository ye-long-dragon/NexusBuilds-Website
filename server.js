import express from "express";
import router from"./routes/index.js";
import path from "path";
import { fileURLToPath } from 'url';
const app = express();
const PORT = 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//initializing EJS and Statics
//DO NOT DELETE
//If you have problems, please direct your attention VinSupport
app.set('view engine','ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.static('styles'));
app.use(express.static('assets'));
app.use(express.static('scripts'));

app.use("/", router);

app.use((req,res,next)=>{
    res.send('404 not found');
})

//Creating endpoints/URI for selected indexes
/*app.get('/',(req,res)=>{
    res.render('Landing-Page/index');
});

app.get('/auth',(req,res)=>{
    res.render('auth/index')
});*/

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
});

