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
    products:{
        type:Array,
        ref:Product
    } ,
    shopImages:{
        type:Array,
        ref:Image
    } ,
    shopDescription:{
        type:String
    },
    shopAddress:{
        type:String
    }
});

const Shop = model('Shop', shopSchema);

export default Shop;