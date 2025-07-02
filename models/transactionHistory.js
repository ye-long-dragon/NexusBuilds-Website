import { Schema,model } from "mongoose";
 

const transHistorySchema = new Schema({
    userid:{
        type:String,
        required:true
    },
    invoiceId:[String]
});

const TransactionHistory = model("TransactionHistory", transHistorySchema)  ;

export default TransactionHistory;