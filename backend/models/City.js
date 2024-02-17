import mongoose from "mongoose";
const Schema = mongoose.Schema;
const citySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    theaters: [{
        type: mongoose.Types.ObjectId,
        ref: "Theater"
    }],
}, {
    timestamps: true,
});

export default mongoose.model("City", citySchema);