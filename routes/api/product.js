import express from 'express';
import Product from '../../models/product.js';

const router = express.Router();

//create a product
router.post('/products', async (req, res) => {
    const { name, component, price, id, bDescrip, fDescrip, images } = req.body;

    try {
        const newProduct = new Product({
            name,
            component,
            price,
            bDescrip,
            fDescrip,
            images
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get all products

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get specific product by id
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//update a product
router.put('/products/:id', async (req, res) => {
    const { name, component, price, bDescrip, fDescrip, images } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, component, price, bDescrip, fDescrip, images },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });


//delete a product
router.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;
