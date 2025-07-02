import { Schema,model } from "mongoose";
import Product from "./product.js";
import PaymentOption from "./paymentOption.js";

const orderSchema = new Schema({
    userId: {
        type:String,
        required:true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    items:{
        type:Array,
        ref:Product
    } ,
    totalPrice:{
        type:Number,
        required:true
    },
    paymentOption:PaymentOption
        
});

const Order = model("Order",orderSchema);

export default Order