import express from 'express';
import Review from '../../models/Review.js';
import Product from '../../models/product.js';

const router = express.Router();

//create review
router.post('/reviews', async (req, res) => {
    const { productId, userId, rating, comment } = req.body;

    try {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Create the review
        const newReview = new Review({
            productId,
            userId,
            rating,
            comment
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get review from user
router.get('/reviews/user/:userId', async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.userId });
        if (reviews.length === 0) return res.status(404).json({ message: "No reviews found for this user" });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete review
router.delete('/reviews/:id', async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) return res.status(404).json({ message: "Review not found" });
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;