import express from "express";
import PaymentOption from "../../models/PaymentOption.js";
import Order from "../../models/order.js";
import session from "express-session";
import User from "../../models/user.js";

const router = express.Router();

//create order from _id from session, paymentOption, and cart from local storage
router.post("/order", async (req, res) => {
    const { paymentOptionId, cartItems, totalPrice } = req.body;
    const userId = req.session.userId; // Assuming userId is stored in session

    try {
        // Check if the user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) return res.status(404).json({ message: "User not found" });

        // Check if the payment option exists
        const paymentOption = await PaymentOption.findById(paymentOptionId);
        if (!paymentOption) return res.status(404).json({ message: "Payment option not found" });

        // Create the order
        const newOrder = new Order({
            userId,
            items: cartItems,
            totalPrice,
            paymentOption
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get order by userId
router.get("/order/user/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).populate("paymentOption");
        if (orders.length === 0) return res.status(404).json({ message: "No orders found for this user" });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete order
router.delete("/order/:id", async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;