import { Schema,model } from "mongoose";
import Product from "./product.js";
import PaymentOption from "./paymentOption.js";

const invoiceSchema = new Schema({
    userId: {
        type:String,
        required:true
    },
    invoiceId:{
        type:String,
        required:true
    },
    orderDate:{
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
    paymentOption:PaymentOption,
     
});

const Invoice = model("Order",invoiceSchema);

export default Invoice;