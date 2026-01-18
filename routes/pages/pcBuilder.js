import express from 'express';
import Build from '../../models/Build.js';
const pcBuilder = express.Router();

pcBuilder.get('/',(req,res)=>{
    res.render("PcBuilder/index");
});

// get featured build
pcBuilder.get("/builds/:id", async (req, res) => {
    try {
        const featuredBuilds = await Build.findById("6864f50c8620042fa58f25d3");
        res.status(200).json(featuredBuilds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

pcBuilder.get("/builds", async (req, res) => {
    const builds = await Build.find({});
    res.status(200).json(builds);
})

export default pcBuilder;