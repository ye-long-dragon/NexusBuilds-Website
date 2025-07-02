import express from "express";
const auth = express.Router();

auth.get("/login", (req, res) => {
  res.render("auth/login");
});

auth.get("/signup", (req, res) => {
  res.render("auth/signup");
});

auth.get("/forgotpassword", (req, res) => {
  res.render("auth/forgotpass");
});



export default auth;
