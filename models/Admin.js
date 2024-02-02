import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    addedMovies: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Movie",
        },
    ],
  }, 
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema)