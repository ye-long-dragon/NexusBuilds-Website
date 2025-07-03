import express from 'express';
import Build from '../../models/Build.js'; // Ensure this path is correct based on your project structure

const buildsRouter = express.Router();

// get featured build
buildsRouter.get('/builds/:id', async (req, res) => {
    try {
        const featuredBuild = await Build.findById(req.params.id);

        res.status(200).json(featuredBuild);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get all builds
buildsRouter.get('/builds', async (req, res) => {
    try {
        const products = await Build.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default buildsRouter;
