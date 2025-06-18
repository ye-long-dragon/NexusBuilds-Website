import { Schema,model } from "mongoose";
import Product from "./product.js";
import Image from "./image.js";

const shopSchema= new Schema({
    userId:{
        type:String,
        required:true
    },
    shopName:{
        type:String,
        required:true
    },
    products:[Product],
    shopImages:[Image],
    shopDescription:{
        type:String
    },
    shopAddress:{
        type:String
    }
});

const Shop = model('Shop', shopSchema);

export default Shop;