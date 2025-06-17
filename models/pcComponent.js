import { Schema,model } from "mongoose";

const componentSchema = new Schema({
    name: { type: String, required: true },
    componentType:{type:String,required:true},
    productId:{
        type:String,
        required:true
    },
    images:[Image],
    price:{
        type:Number,
        required:true
    }
});

const Component = model('Component', componentSchema);
export default Component;