import Image from "./image.js"
import { Schema,model } from "mongoose";

const productSchema = new Schema({
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
    id:{
        type:String,
        required:true
    },
    bDescrip:{
        type:String
    },
    fDescrip:{
        type:String
    },
    images:{
        type:Array,
        ref:Image
    } ,
});

const Product = model("Product", productSchema);

export default Product;
