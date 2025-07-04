import Image from "./image.js"
import { Schema,model } from "mongoose";

const productSchema = new Schema({
    // _id: {
    //     type: String
    // },
    name:{
        type:String,
        required:true
    },
    component:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    
    short:{
        type:String
    },
    long:{
        type:String
    },
    images:{
        type:Array,
        ref:Image
    } ,
    stock:{
        type:Number,
        default:0
    },
});

const Product = model("Product", productSchema);

export default Product;
