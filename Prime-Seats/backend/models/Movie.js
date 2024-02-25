import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // data: Buffer,
        required: true
    },
    trailerurl: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    cast: [{
        type: String,
        required: true
    }],
    crew: [{
        type: String,
        required: true
    }],
    cities: [{
        type: mongoose.Types.ObjectId,
        ref: "City"
    }],
    theaters:[{
        type:mongoose.Types.ObjectId,
        ref:"Theater"
    }],
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    is_active: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true,
});

export default mongoose.model("Movie", movieSchema);
