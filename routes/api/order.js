import express from "express";
import Order from "../../models/order.js";
// import User from "../../models/user.js";

const orderRouter = express.Router();

// register orders
orderRouter.post("/orders", async (req, res) => {
    try {

        // get a json request
        const {userId, items} = req.body;
        // store to order variable
        const order = {
            userId,
            items
        }

        // execute api
        const result = await Order.create(order)
        
        res.status(201).json({ message: "User registered successfully "})

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message});
    }
})

export default orderRouter;