import mongoose from "mongoose";
const Address = mongoose.Schema({
    Country:{
        type:String,
    },
    city:{
        type:String
    },
    Address_Line1:{
        type:String,
    },
    Office_Address:{
        type:String
    },
    Zip_code:{
        type:String,
    }
    
}, { timestamps: true });

const Address_Schema=mongoose.model("Address",Address);
export default Address_Schema;