import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact_number: {
        type: "String",
        required: true,
    },
    is_active: {
        type: "Boolean",
        required: true,
    },
    is_deleted: {
        type: "Boolean",
        required: true,
    },
    created_at: {
        type: "Date",
        required: true,
    },
    updated_at: {
        type: "Date"
    }
});

export default mongoose.model("User", userSchema);