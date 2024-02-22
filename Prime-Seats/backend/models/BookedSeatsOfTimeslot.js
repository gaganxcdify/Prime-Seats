import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BookedSeatsOfTimeslotSchema = new Schema({
    timeslot: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie"
    },
    bookedseats: [{
        type: mongoose.Types.ObjectId,
        ref: "Bookings"
    }],
}, {
    timestamps: true,
});

export default mongoose.model("BookedSeatsOfTimeslot", BookedSeatsOfTimeslotSchema);