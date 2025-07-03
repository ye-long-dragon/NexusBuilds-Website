
import express from "express";
import Product from '../../models/product.js';

const shopPage = express.Router();

shopPage.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.render("shop/index", { products });
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
