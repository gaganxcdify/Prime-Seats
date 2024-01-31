import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 6
    },
    addedMovies: [{
        type: String,
    }],
    is_active: {
        type: "Boolean",
        required: true,
    },
    is_deleted: {
        type: "Boolean",
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Admin", adminSchema)