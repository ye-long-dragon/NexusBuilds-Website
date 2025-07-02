import express from 'express';
import pcComponent from '../../models/pcComponent.js';
import Product from '../../models/product';

const router = express.Router();

//create PC Component from product
router.post('/pcComponent', async (req, res) => {
    const { productId, userId, componentType, componentName, componentDescription } = req.body;

    try {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Create the PC Component
        const newPcComponent = new pcComponent({
            productId,
            userId,
            componentType,
            componentName,
            componentDescription
        });

        const savedPcComponent = await newPcComponent.save();
        res.status(201).json(savedPcComponent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete PC Component
router.delete('/pcComponent/:id', async (req, res) => {
    try {
        const deletedPcComponent = await pcComponent.findByIdAndDelete(req.params.id);
        if (!deletedPcComponent) return res.status(404).json({ message: "PC Component not found" });
        res.status(200).json({ message: "PC Component deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get PC COmponent using POST
router.post('/pcComponent/user/:userId', async (req, res) => {
    try {
        const pcComponents = await pcComponent.find({ userId: req.params.userId });
        if (pcComponents.length === 0) return res.status(404).json({ message: "No PC Components found for this user" });
        res.status(200).json(pcComponents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;