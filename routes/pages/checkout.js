import express from "express";
const checkout = express.Router();

checkout.get("/", (req, res) => {
    res.render("checkout/index");
});

export default checkout;
