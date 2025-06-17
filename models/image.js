import { Schema,model } from "mongoose";

const imageSchema = new Schema({
    data:Buffer,
    contentType:String
});

const Image = model('image',imageSchema);
export default Image;