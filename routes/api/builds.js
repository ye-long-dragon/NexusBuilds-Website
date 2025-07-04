import express from 'express';
// import Build from '../../models/Build.js'; // Ensure this path is correct based on your project structure

const buildsRouter = express.Router();

// // get featured build
// buildsRouter.get('/builds/featured', async (req, res) => {
//     try {
//         const fBuild = await Build.findById("6864f50c8620042fa58f25d3");
//         const data = res.json(fBuild);
//         res.render("/pcprofile", { fBuild })
//         // res.json(fBuild);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // get build with id
// buildsRouter.get("/builds/:id", async (req, res) => {
//     try {
//         const build = await Build.findById(req.params.id);
//         req.session.build_data = build;
//     } catch (e) {
//         console.error(e.message);
//     } 
// })

// //get all builds
// buildsRouter.get('/builds', async (req, res) => {
//     try {
//         const fbuild = await Build.find({});
//         res.render("pcbuilder", {fbuild})
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

export default buildsRouter;
