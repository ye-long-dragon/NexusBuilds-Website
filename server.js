//module imports
import express from "express";
import connect from "./database/mongodb-connect.js";
import session from "express-session";
//import bcrypt from 'bcryptjs';
import cors from "cors";

// establish environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//import views
import homePage from "./routes/pages/homePage.js";
import auth from "./routes/pages/auth.js";
import shopPage from "./routes/pages/shopPage.js";
import pcBuilder from "./routes/pages/pcBuilder.js";
import pcProfile from "./routes/pages/pcProfile.js";
import userProfile from "./routes/pages/userProfile.js";
import checkout from "./routes/pages/checkout.js";
import checkSession from "./middleware/checkSession.js";

import cloudinaryRouter from "./routes/api/cloudinary.js";

import User from "./models/user.js";
import dotenv from "dotenv";

// builds router
import Build from "./models/build.js";
import buildsRouter from "./routes/api/builds.js";
app.use("/api/builds", buildsRouter);

// product model
import Product from "./models/product.js";

// image upload
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

import payment from "./routes/pages/payment.js";
import shopAdmin from "./routes/pages/shopAdmin.js";

//import apis
import usersRouter from "./routes/api/userdupe.js";
import productRouter from "./routes/api/product.js";
import { render } from "ejs";

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
    secret: process.env.secret,
    resave: false, // prevents resaving session if it hasn't changed
    saveUninitialized: true, //prevents storing empty sessions
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    },
  })
);

// build router
app.use("/api/builds", buildsRouter);


//custom middleware to check session
app.use("/api/session/check", checkSession);

//using routers
app.use(express.json());
app.use("/", homePage);

app.use("/auth", auth);
app.use("/shop", shopPage);
app.use("/pcbuilder", pcBuilder);
app.use("/pcprofile", pcProfile);
app.use("/userprofile", userProfile);
app.use("/checkout", checkout); // checkout router

app.use("/shopadmin", shopAdmin); // shop admin router
// app.use("/api/users", usersRouter);
app.use("/api/users", usersRouter);
// use product router
app.use("/api/products", productRouter);
// cloudinary router
app.use("/api/cloudinary", cloudinaryRouter);
app.use("/api", usersRouter);
app.use("/api",productRouter);

connect();

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

app.use((req, res, next) => {
  res.send("404 not found");
});



/*
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get user
app.get("/users/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      address: user.address,
      phone: user.phone,
      country: user.country,
      gender: user.gender, // ✅ added gender
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : null,
    };

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}); // Only need to define products here
    res.render("shop/index", { products });  // Only call this inside try
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Failed to load products");
  }
});

// register product
app.post("/products", async (req, res) => {
  try {
    const product = req.body;
    product.price = parseFloat(product.price); // Ensure price is a number

    const result = await Product.create(product);
    res.status(201).json({ message: "Product registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// post user
app.post("/users", async (req, res) => {
  const user = req.body;
}*/

  app.use("/auth", auth);
  app.use("/shop", shopPage);
  app.use("/pcbuilder", pcBuilder);
  app.use("/pcprofile", pcProfile);
  app.use("/profile", userProfile);
  app.use("/shopadmin", shopAdmin);
  app.use("/payment", payment);
  app.use("/checkout", checkout);

  //api
  app.use("/api", usersRouter);
  app.use("/api", productRouter);

  //custom middleware to check session
  app.use("/api/session/check", checkSession);
;

// get featured build
app.get("/builds/:id", async (req, res) => {
  try {
    const featuredBuild = await Build.findById(req.params.id);
    if (!featuredBuild)
      return res.status(404).json({ message: "No featured build found" });

    const data = featuredBuild.toObject();
    data._id = data._id.toString(); // Convert ObjectId to string for JSON

    req.session.fbuild = data; // Store the featured build in session
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// get all builds
app.get("/builds", async (req, res) => {
  try {
    const builds = await Build.find({});
    res.status(200).json(builds);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
/*
=====TO BE IMPLEMENTED LATER=====



app.use("/checkout", checkout); // checkout router
// app.use("/api/users", usersRouter);


  const result = await User.create(user);
  return res.status(201).json();
});

// update user
app.put("/users/:email", async (req, res) => {
  try {
    //update the user with the given email
    const result = await User.updateOne(
      { email: req.session.user.email },
      {
        $set: {
          fname: req.body.fname,
          lname: req.body.lname,
          address: req.body.address,
          phone: req.body.phone,
          country: req.body.country,
          dateOfBirth: req.body.dateOfBirth,
          gender: req.body.gender,

          // profile image URL
          profileImgUrl: req.body.profileImgUrl
        },
      }
    );

    req.session.user.fname = req.body.fname;
    req.session.user.lname = req.body.lname;
    req.session.user.address = req.body.address;
    req.session.user.phone = req.body.phone;
    req.session.user.country = req.body.country;
    req.session.user.gender = req.body.gender;

    const formattedDate = new Date(req.body.dateOfBirth)
      .toISOString()
      .split("T")[0];
    req.session.user.dateOfBirth = formattedDate;

    return res.status(200).json({ message: "User updated successfully." });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// logout user
app.post("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout Failed" });
    }

    return res.json({ message: "Logout Successful" });
  });

});

})
  */

connect();


