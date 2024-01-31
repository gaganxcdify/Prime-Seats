import mongoose from "mongoose";

const MovieSchema = new mongoose.schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: String,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    posterurl: {
        type: String,
        required: true,
    },
    cast: {
        type: String,
    },
    crew: {
        type: String,
    },
    booking: [{ type: String }],
    admin: {
        type: String,
        required: true,
    },
    is_active: {
        type: "Boolean",
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Movies", MovieSchema);