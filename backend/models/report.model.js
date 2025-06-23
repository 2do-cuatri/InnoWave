import mongoose from "mongoose";

const reportSchema = mongoose.Schema({
    prodQuantity:{
        type: Number,
        required: true
    },
    minPrice:{
        type: Number,
        required: true
    },
    maxPrice:{
        type: Number,
        required: true
    },
    avgPrice:{
        type: Number,
        required: true
    },
    totalStock:{
        type: Number,
        required: true
    },
    avgStock:{
        type: Number,
        required: true
    }
},{
    timestamps: true
}) 

const Report = mongoose.model("Report", reportSchema);

export default Report;