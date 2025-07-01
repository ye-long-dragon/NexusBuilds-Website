import { Schema,model } from "mongoose";
import Payment from "./paymentOptions.js";  

const buildSchema = new Schema({
    name: {
        Type:String,
        unique: true
    },
    processor: {
        Type: String
    },
    gpu: {
        Type:String
    },
    motherboard: {
        Type:String
    },
    storage: {
        Type:String
    },
    ram: {
        Type:String
    },
    case: {
        Type:String
    },
    psu: {
        Type:String
    },
    cooler: {
        Type:String
    },
    additions: {
        Type:Array
    }
});

const Build = model('Build', buildSchema);

export default Build;