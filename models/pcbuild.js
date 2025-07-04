import { Schema,model } from "mongoose";
import Product from "./product.js";
import Image from "./image.js";
import { name } from "ejs";

const pcBuildSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    userId:{
        type:String,
        required:true
    },
    components:{
        type:Map, of:Product
    },
    tutorialLink:{
        type:String
    },
    pcImage:{
        type:Schema.Types.ObjectId,
        ref:Image
    } ,
});

const PCBuild = model("pcBuild", pcBuildSchema);

export default PCBuild;