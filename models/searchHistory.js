import { Schema,model } from "mongoose";

const searchSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    searchQuery:{
        type:String,
        required:true
    }
});

const SearchHistory = model("SearchHistory", searchSchema);

export default SearchHistory;
