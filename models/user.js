import { Schema,model } from "mongoose";
import Payment from "./paymentOptions.js";  

const userSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    fname: {
        type:String,
    },
    lname: {
        type:String,
    },
    gender: {
        type:String,
    },
    address: {
        type:String,
    },
    phone: {
        type:String,
    },
    country: {
        type:String,
    },
    dateOfBirth: {
        type:Date,
    },
    profileImgUrl: {
        type: String
    }
});

const User = model('User',userSchema);

export default User;