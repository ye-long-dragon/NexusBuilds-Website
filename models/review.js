import { Schema,model } from "mongoose";
import Image from "./image.js"

const reviewSchema = new Schema({
    user:{
        type:String,
        required:true   
    },
    product:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
    }
});

const Review = model("Review", reviewSchema);

export default Review;