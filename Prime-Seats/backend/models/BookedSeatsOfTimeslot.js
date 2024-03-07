import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BookedSeatsOfTimeslotSchema = new Schema({
    timeslot: {
        type: mongoose.Types.ObjectId,
        ref: "TimeSlot",
    },
    theaterId: {
        type: mongoose.Types.ObjectId,
        ref: "Theater",
    },
    startdate: {
        type: String,
    },
    enddate: {
        type: String,
    },
    movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie"
    },
    bookedseats: [{
        type: String,
    }],
}, {
    timestamps: true,
});

export default mongoose.model("BookedSeatsOfTimeslot", BookedSeatsOfTimeslotSchema);