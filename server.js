//module imports
import express from "express";
import connect from "./database/mongodb-connect.js";
import session from 'express-session';
//import bcrypt from 'bcryptjs';
import cors from 'cors';

//import views
import homePage from "./routes/pages/homePage.js";
import auth from "./routes/pages/auth.js";
import shopPage from "./routes/pages/shopPage.js";
import pcBuilder from "./routes/pages/pcBuilder.js";
import pcProfile from "./routes/pages/pcProfile.js";
import userProfile from "./routes/pages/userProfile.js";
import checkout from "./routes/pages/checkout.js";
import payment from "./routes/pages/payment.js";
import shopAdmin from "./routes/pages/shopAdmin.js";


//import apis
import usersRouter from "./routes/api/userdupe.js";
import productRouter from "./routes/api/product.js";

//initialization
const app = express();
const PORT = 8000;

//initializing EJS and Statics
app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(express.static("scripts"));
app.use(express.static("views"));
app.use(express.static("public"));
app.use(express.static("middleware"));


// Use body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true, // allow cookies to be sent
  })
);


//creating session management for storing variable purposes
app.use(
  session({
    secret:"TmV4dXNCdWlsZHNfV2Vic2l0ZV9Gb3JfQ1BFMTQzTF9GaW5hbF9Qcm9qZWN0X2J5X0RhZ2FhbmcsX0pvbl9DbHlkZSxfQmFyYWNsYW4sX1ZpbmNlX0xhd3JlbmNlLF9hbmRfQWxpLF9OYWppZXA=",
    resave: false,// prevents resaving session if it hasn't changed
    saveUninitialized: false,//prevents storing empty sessions
    cookie: {
      secure:false, // Set to true if using HTTPS
      maxAge: 3*24 * 60 * 60 * 1000, // 3 days
    },
  })
);



//using routers
app.use(express.json());
app.use("/", homePage);
app.use("/auth",auth);
app.use("/shop",shopPage)
app.use("/pcbuilder",pcBuilder);
app.use("/pcprofile",pcProfile);
app.use("/profile",userProfile);
app.use("/shopadmin",shopAdmin);
app.use("/payment", payment);

//api
app.use("/api", usersRouter);
app.use("/api",productRouter);

/*
=====TO BE IMPLEMENTED LATER=====



app.use("/checkout", checkout); // checkout router
// app.use("/api/users", usersRouter);

app.get('/', async (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.render('Landing-Page/index', { username: null });
  }

  res.render('Landing-Page/index', {
    username: user.username
  });
})
  */

connect();

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

app.use((req, res, next) => {
  res.send("404 not found");
});
