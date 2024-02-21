import mongoose from "mongoose";
const Schema = mongoose.Schema;
const timeslotSchema = new Schema({
    slot:[{
        type:String,
        required:true,
    }],
    theater:{
        type:mongoose.Types.ObjectId,
        ref:"Theater"
    },
    movie:{
        type:mongoose.Types.ObjectId,
        ref:"Movie"
    },
    bookedseats:[{
        type:mongoose.Types.ObjectId,
        ref:"Bookings"
    }],
}, {
    timestamps: true,
});

export default mongoose.model("TimeSlot", timeslotSchema);