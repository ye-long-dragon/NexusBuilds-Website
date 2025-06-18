import express from "express";

//views
import homePage from"./routes/pages/homePage.js";
import auth from "./routes/pages/auth.js";
import shopPage from "./routes/pages/shopPage.js";
import pcBuilder from "./routes/pages/pcBuilder.js";
import pcProfile from "./routes/pages/pcProfile.js";
import userProfile from "./routes/pages/userProfile.js";
import connect from "./database/mongodb-connect.js";
import shopAdmin from "./routes/pages/shopAdmin.js";

//api
import usersRouter from "./routes/api/user.js";
import productRouter from "./routes/api/product.js";

const app = express();
const PORT = 8000;

// Use body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
// use the static middleware to serve static files
app.use(express.static("public"));

//initializing EJS and Statics
app.set('view engine','ejs');
app.use(express.static('styles'));
app.use(express.static('assets'));
app.use(express.static('scripts'));
app.use(express.static('views'));

//using routers
app.use(express.json());
app.use("/", homePage);
app.use("/auth",auth);
app.use("/shop",shopPage)
app.use("/pcbuilder",pcBuilder);
app.use("/pcprofile",pcProfile);
app.use("/profile",userProfile);
app.use("/shopadmin",shopAdmin);

//api
app.use("/api", usersRouter);
app.use("/api",productRouter);

connect();

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
});

app.use((req,res,next)=>{
    res.send('404 not found');
});

