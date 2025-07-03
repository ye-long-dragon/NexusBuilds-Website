import express from "express";
import unuathFailSafe from "../../middleware/unauthFailSafe.js";
const checkout = express.Router();

checkout.get("/", unuathFailSafe, (req, res) => {
    res.render("checkout/index");
});

export default checkout;
