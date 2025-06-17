import mongoose from "mongoose";

const YOURPASSWORD = "rR6gkRz0thR00YUN";

export default async function connect(){
    const database = "mongodb+srv://bvincelawrence:rR6gkRz0thR00YUN@nexusbuilds.uwoc55n.mongodb.net/?retryWrites=true&w=majority&appName=NexusBuilds";
    mongoose
    .connect(database,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        dbName:'MainDatabase',
    })
    .then(()=>{
        console.log("Connected to database");
    })
    .catch((error)=>{
        console.log(error);
    })

}