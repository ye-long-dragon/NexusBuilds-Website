import express from "express";
import homePage from"./routes/Home-Page/index.js";
import auth from "./routes/auth/index.js";
import shopPage from "./routes/Shop-Page/index.js";
import pcBuilder from "./routes/PcBuilder/index.js";
import pcProfile from "./routes/PcProfile/index.js";
import userProfile from "./routes/UserProfile/index.js";
const app = express();
const PORT = 3000;

//initializing EJS and Statics
app.set('view engine','ejs');
app.use(express.static('styles'));
app.use(express.static('assets'));
app.use(express.static('scripts'));
app.use(express.static('views'));

app.use("/", homePage);
app.use("/auth",auth);
app.use("/shop",shopPage)
app.use("/pcbuilder",pcBuilder);
app.use("/pcprofile",pcProfile);
app.use("/profile",userProfile);


app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
});

app.use((req,res,next)=>{
    res.send('404 not found');
})

