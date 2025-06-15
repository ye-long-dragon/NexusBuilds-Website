import express from 'express';
const pcBuilder = express.Router();

pcBuilder.get('/',(req,res)=>{
    res.render("PcBuilder/index");
});

export default pcBuilder;