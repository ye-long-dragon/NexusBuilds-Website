import { Schema,model } from "mongoose";
import Image from "./image.js"
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
    },
    pfp:{
        type:Schema.Types.ObjectId,
        ref:Image
    } ,
    paymentOption:{
        type:Array,
        ref:Payment
    }
    
    
});

const User = model('User',userSchema);

export default User;