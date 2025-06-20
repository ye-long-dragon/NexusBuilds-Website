import express from "express";

import homePage from "./routes/pages/homePage.js";

import auth from "./routes/pages/auth.js";
import shopPage from "./routes/pages/shopPage.js";
import pcBuilder from "./routes/pages/pcBuilder.js";
import pcProfile from "./routes/pages/pcProfile.js";
import userProfile from "./routes/pages/userProfile.js";

// import usersRouter from "./routes/api/user.js";
import router from "./routes/api/user.js";
import checkout from "./routes/pages/checkout.js";
import connect from "./database/mongodb-connect.js";
import User from "./models/user.js";

import session from 'express-session';

import usersRouter from "./routes/api/user.js";
import payment from "./routes/pages/payment.js";

import connect from "./database/mongodb-connect.js";
import shopAdmin from "./routes/pages/shopAdmin.js";


import productRouter from "./routes/api/product.js";


const app = express();
const PORT = 8000;

// Use body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for storing variable purposes
app.use(session({
  secret: '1', // should be long and secret
  resave: false,
  saveUninitialized: true
}))

// use the static middleware to serve static files
app.use(express.static("public"));

//initializing EJS and Statics
app.set("view engine", "ejs");
// app.use(express.static("styles"));
app.use(express.static("assets"));
app.use(express.static("scripts"));
app.use(express.static("views"));


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


app.use("/checkout", checkout); // checkout router
// app.use("/api/users", usersRouter);
app.use("/api/users", router);

app.get('/users', async (req, res) => {
  try {
      const users = await User.find({});
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
});

// get user
app.get('/users/:email', async (req, res) => {
  try {
      const email = req.params.email;
      const user = await User.findOne({email});

      req.session.user = user;
      req.session.email = email;

      res.status(200).json(user);

  } catch (error) {
      res.status(500).json({message: error.message});
  }
});

// post user 
app.post("/users", async (req,res)=>{
    const user = req.body;

    const result = await User.create(user);
    return res.status(201).json();
})

app.get('/', async (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.render('Landing-Page/index', { username: null });
  }

  res.render('Landing-Page/index', {
    username: user.username
  });
})

app.use("/payment", payment);

app.use("/api", usersRouter);
app.use("/api",productRouter);


connect();

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

app.use((req, res, next) => {
  res.send("404 not found");
});
