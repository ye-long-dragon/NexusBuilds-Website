
import express from "express";
import Product from '../../models/product.js';

const shopPage = express.Router();

shopPage.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        

        // for contolling number of products
        const min = parseInt(req.query.min) || 0;
        const max = parseInt(req.query.max) || 10;

        // get total number of products
        // const total = products.length();

        // pass user session
        const user = req.session.user;

        res.render("shop/index", { products, min, max, user});

    } catch (error) {
        console.error("Error loading products:", error.message);
        res.status(500).send("Server error");
    }
});

shopPage.get("/product/payment", (req, res) => {
    res.render("payment/index");
});

shopPage.get("/product", (req, res) => {
    res.render("productPage/index");
});

export default shopPage;
