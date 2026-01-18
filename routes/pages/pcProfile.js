import express from 'express';
import Build from "../../models/build.js";

const pcProfile = express.Router();

pcProfile.get('/',(req,res)=>{
    res.render("PcProfile/index");
})

pcProfile.get("/build/:id", async (req, res) => {
    try {
        const build = await Build.findById(req.params.id)
        res.status(201).json(build);
    } catch (e) {
        console.error(e.message);
        res.status(500).send(e.message);
    }
})

pcProfile.get("/builds", async (req, res) => {
    try {
        const build = await Build.find({})
        //res.render("PcProfile/index", {build});
        res.status(201).json(build);
    } catch (e) {
        console.error(e.message);
        res.status(500).send(e.message);
    }
})

pcProfile.get("/:id", async (req, res) => {
    try {
        const build = await Build.findById(req.params.id);

        // res.status(201).json(build.name)
        res.render("PcProfile/index", {build});
    } catch (e) {
        console.error(e.message);
        res.status(500).send(e.message);
    }
})

export default pcProfile;