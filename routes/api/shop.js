import shop from "../../models/shop.js";
import express from "express";
import User from "../../models/user.js";

const router = express.Router();

//create a shop and change userauth to shop
router.post("/shop", async (req, res) => {
    const { userId, shopName, shopDescription } = req.body;

    try {
        // Check if the user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) return res.status(404).json({ message: "User not found" });
        // Create the shop
        const newShop = new shop({  
            userId,
            shopName,
            shopDescription
        }); 
        const savedShop = await newShop.save();
        res.status(201).json(savedShop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get shop by userId
router.get("/shop/user/:userId", async (req, res) => {
    try {
        const shops = await shop.find({ userId: req.params.userId });
        if (shops.length === 0) return res.status(404).json({ message: "No shops found for this user" });
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update shop by userId
router.put("/shop/user/:userId", async (req, res) => {
    const { shopName, shopDescription } = req.body;

    try {
        const updatedShop = await shop.findOneAndUpdate(
            { userId: req.params.userId },
            { shopName, shopDescription },
            { new: true }
        );

        if (!updatedShop) return res.status(404).json({ message: "Shop not found" });
        res.status(200).json(updatedShop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete shop by userId
router.delete("/shop/user/:userId", async (req, res) => {
    try {
        const deletedShop = await shop.findOneAndDelete({ userId: req.params.userId });
        if (!deletedShop) return res.status(404).json({ message: "Shop not found" });
        res.status(200).json({ message: "Shop deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//add product to shop
router.post("/shop/:shopId/product", async (req, res) => {
    const { productName, productDescription, price } = req.body;
    const shopId = req.params.shopId;

    try {
        // Check if the shop exists
        const existingShop = await shop.findById(shopId);
        if (!existingShop) return res.status(404).json({ message: "Shop not found" });

        // Add product to the shop
        existingShop.products.push({
            productName,
            productDescription,
            price
        });

        const updatedShop = await existingShop.save();
        res.status(201).json(updatedShop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;