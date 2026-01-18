import express from "express";
import unuathFailSafe from "../../middleware/unauthFailSafe.js";
import User from "../../models/user.js";

const checkout = express.Router();

checkout.get("/", unuathFailSafe, async (req, res) => {
    try {
        // ✅ Use `id` not `_id` (based on your login session structure)
        const userId = req.session.user.id;

        // ✅ Directly get user from DB
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        // ✅ Get cart from user document
        const cart = user.cart || [];

        // ✅ Render cart to EJS template
        res.render("checkout/index", { cart, user });

    } catch (e) {
        console.error("Checkout error:", e.message);
        res.status(500).send("Server Error");
    }
});

export default checkout;
