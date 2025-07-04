import { Schema,model } from "mongoose";
import Product from "./product.js";

const orderSchema = new Schema({
    userId: {
        type: String
    },
    items:{
        type: Array
    }
        
});

const Order = model("Order",orderSchema);

export default Order