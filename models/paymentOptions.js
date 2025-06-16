import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    paymentId: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    address:{type:String, required:true},
    phone:{type:String,required:true}
});

const Payment = model('Payment', paymentSchema);
export default Payment;