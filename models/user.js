import { Schema,model } from "mongoose";
import Payment from "./paymentOptions.js";  

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    birthDate:{
        type:Date,
        required:true
    },
    userAuth:{
        type:String,
        required:true
    }
    
});

const User = model('User',userSchema);

export default User;