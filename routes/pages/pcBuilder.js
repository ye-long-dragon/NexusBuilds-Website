import express from 'express';
import Build from '../../models/Build.js';
const pcBuilder = express.Router();

pcBuilder.get('/',(req,res)=>{
    try {
        
    } catch (e) {

    }

    res.render("PcBuilder/index");
});

// get featured build
pcBuilder.get("/builds/:id", async (req, res) => {
    try {
        const featuredBuilds = await Build.findById(req.params.id);
        res.status(200).json(featuredBuilds);



    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default pcBuilder;