import { Schema,model } from "mongoose";
import Product from "./product";

const cartSchema = new Schema({
    userId: {
        type:String,
        required:true
    },
    products: [Product],
    totalPrice:{
        type:Number,
        required:true
    }
});

const Cart = model("Cart",cartSchema);

export default Cart;
