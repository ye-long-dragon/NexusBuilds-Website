// models/build.js
import mongoose from "mongoose";

const buildSchema = new mongoose.Schema({
    name: { type: String },
    processor: { type: String },
    gpu: { type: String },
    motherboard: { type: String },
    storage: { type: String },
    ram: { type: String },
    case: { type: String },
    psu: { type: String },
    cooler: { type: String },
    additions: { type: Array },
    description: { type:String },
    buildImg: { type:String }
});

// ✅ Safely export without redefining model
export default mongoose.models.Build || mongoose.model("Build", buildSchema);
