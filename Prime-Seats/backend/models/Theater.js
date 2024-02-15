import mongoose from "mongoose";
const Schema = mongoose.Schema;
const theaterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    cityid: {
        type: mongoose.Types.ObjectId,
        ref: "City",
        required: true,
    }
}, {
    timestamps: true,
});

export default mongoose.model("Theater", theaterSchema);

