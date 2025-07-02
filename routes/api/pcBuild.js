import express from 'express';
import pcBuild from '../../models/pcBuild.js';
import pcComponents from '../../models/pcComponents.js';

const router = express.Router();

//create PC Build for user
router.post('/pcBuild', async (req, res) => {
    const { userId, buildName, buildDescription, components } = req.body;

    try {
        // Create the PC Build
        const newPcBuild = new pcBuild({
            userId,
            buildName,
            buildDescription,
            components
        });

        const savedPcBuild = await newPcBuild.save();
        res.status(201).json(savedPcBuild);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update Pc build
router.put('/pcBuild/:id', async (req, res) => {
    const { buildName, buildDescription, components } = req.body;

    try {
        const updatedPcBuild = await pcBuild.findByIdAndUpdate(
            req.params.id,
            { buildName, buildDescription, components },
            { new: true }
        );

        if (!updatedPcBuild) return res.status(404).json({ message: "PC Build not found" });
        res.status(200).json(updatedPcBuild);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get PC Build by userId using post method
router.post('/pcBuild/user/:userId', async (req, res) => {
    try {
        const pcBuilds = await pcBuild.find({ userId: req.params.userId });
        if (pcBuilds.length === 0) return res.status(404).json({ message: "No PC Builds found for this user" });
        res.status(200).json(pcBuilds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete PC Build
router.delete('/pcBuild/:id', async (req, res) => {
    try {
        const deletedPcBuild = await pcBuild.findByIdAndDelete(req.params.id);
        if (!deletedPcBuild) return res.status(404).json({ message: "PC Build not found" });
        res.status(200).json({ message: "PC Build deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
