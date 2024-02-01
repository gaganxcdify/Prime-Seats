import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    seatNumber: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    is_deleted: {
        type: "Boolean",
        required: true,
    },
});

export default mongoose.model("Booking", BookingSchema)