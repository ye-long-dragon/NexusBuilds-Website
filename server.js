import express from "express";
import homePage from "./routes/pages/homePage.js";
import auth from "./routes/pages/auth.js";
import shopPage from "./routes/pages/shopPage.js";
import pcBuilder from "./routes/pages/pcBuilder.js";
import pcProfile from "./routes/pages/pcProfile.js";
import userProfile from "./routes/pages/userProfile.js";
import checkout from "./routes/pages/checkout.js";
import connect from "./database/mongodb-connect.js";
import dotenv from "dotenv";

// establish environment variables
dotenv.config();

import session from "express-session";

const app = express();
const PORT = process.env.PORT;

// Use body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for storing variable purposes
app.use(
  session({
    secret: process.env.secret, // should be long and secret
    resave: false,
    saveUninitialized: true,
  })
);

// initialze products route
import productRoutes from "./routes/api/product.js";
app.use("/api", productRoutes);

// initialize build route
import buildsRoutes from "./routes/api/builds.js";
app.use("/api", buildsRoutes);

// initialize users route
import authRouter from "./routes/api/auth.js"
app.use("/api", authRouter);

// initialize order route
import orderRoute from "./routes/api/order.js"
app.use("/api", orderRoute);

// use the static middleware to serve static files
app.use(express.static("public"));

//initializing EJS and Statics
app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(express.static("scripts"));
app.use(express.static("views"));

//using routers
app.use("/", homePage);
app.use("/auth", auth);
app.use("/shop", shopPage);
app.use("/pcbuilder", pcBuilder);
app.use("/pcprofile", pcProfile);
app.use("/userProfile", userProfile);
app.use("/checkout", checkout);

connect();

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

app.use((req, res, next) => {
  res.send("404 not found");
});