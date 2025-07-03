import express from "express";
import homePage from "./routes/pages/homePage.js";
import auth from "./routes/pages/auth.js";
import shopPage from "./routes/pages/shopPage.js";
import pcBuilder from "./routes/pages/pcBuilder.js";
import pcProfile from "./routes/pages/pcProfile.js";
import userProfile from "./routes/pages/userProfile.js";
import checkout from "./routes/pages/checkout.js";
import connect from "./database/mongodb-connect.js";
import User from "./models/user.js";
import dotenv from "dotenv";

import bcrypt from "bcrypt";

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

// use the static middleware to serve static files
app.use(express.static("public"));

//initializing EJS and Statics
app.set("view engine", "ejs");
// app.use(express.static("styles"));
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
app.use("/checkout", checkout); // checkout router

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get user
app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Store only non-sensitive fields in session
    req.session.user = {
      id: user._id,
      username: user.username,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      address: user.address,
      phone: user.phone,
      country: user.country
    };

    res.status(200).json({
      message: "Login successful",
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// post user
app.post("/users", async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }
    
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = {
      ...rest,
      password: hashedPassword
    };

    const result = await User.create(user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update user
app.put("/users/:email", async (req, res) => {
  try {
    //update the user with the given email
    const result = await User.updateOne(
      { email: req.session.user.email},
      {
        $set: {
          fname: req.body.fname,
          lname: req.body.lname,
          address: req.body.address,
          phone: req.body.phone,
          country: req.body.country,
          dateOfBirth: req.body.dateOfBirth,
          gender: req.body.gender,
        },
      }
    );

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

connect();

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})

app.use((req, res, next) => {
  res.send("404 not found");
});