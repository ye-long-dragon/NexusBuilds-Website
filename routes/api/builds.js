import express from 'express';
import Build from '../../models/build.js'; // Assuming you have a Build model

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

export default buildsRouter;
