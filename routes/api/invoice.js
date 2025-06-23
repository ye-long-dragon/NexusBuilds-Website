import express from 'express';
import Invoice from '../../models/invoice';
import User from '../../models/user.js'; // Ensure this path is correct
import bcrypt from 'bcryptjs'; // For hashing

const router = express.Router();

//get order from router.get("/order/user/:userId from order.js
router.get('/invoice/user/:userId', async (req, res) => {
    try {
        const invoices = await Invoice.find({ userId: req.params.userId }).populate('userId');
        if (invoices.length === 0) return res.status(404).json({ message: "No invoices found for this user" });
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//create invoice
router.post('/invoice', async (req, res) => {
    const { userId, orderId, totalAmount, items } = req.body;

    try {
        // Check if the user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) return res.status(404).json({ message: "User not found" });
        // Create the invoice
        const newInvoice = new Invoice({    
            userId,
            orderId,
            totalAmount,
            items
        });
        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;