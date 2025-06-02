import mongoose from "mongoose";

const applicationSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Family"
    },
    status:{
        process:{
        type:Boolean,
        },
        accepted:{
        type:Boolean,
        }
    },reason:{
        type:String,
    },
    schemes:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Schemes"
    },
    details:[ {
        feild:{
        type:String
        },
        feildType:{
        type:String
        }  
    }]

})

export default new mongoose.model("Application",applicationSchema);