import express from "express";
const checkout = express.Router();

checkout.get("/", (req, res) => {
    // Render the checkout page and get data from local storage
    res.render("checkout/index"
    )
});

export default checkout;
