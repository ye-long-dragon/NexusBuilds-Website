import express from 'express';
import transactionHistory from '../../models/transactionHistory.js';
import User from '../../models/user.js'; // Ensure this path is correct

const router = express.Router();

//get transaction history by userId
router.get('/transactionHistory/user/:userId', async (req, res) => {
    try {
        const transactions = await transactionHistory.find({ userId: req.params.userId }).populate('userId');
        if (transactions.length === 0) return res.status(404).json({ message: "No transactions found for this user" });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//add transaction from invoice.js by user _id
router.post('/transactionHistory', async (req, res) => {
    const { userId, orderId, totalAmount, items } = req.body;

    try {
        // Check if the user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) return res.status(404).json({ message: "User not found" });
        // Create the transaction history entry
        const newTransaction = new transactionHistory({
            userId,
            orderId,
            totalAmount,
            items
        });     
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
