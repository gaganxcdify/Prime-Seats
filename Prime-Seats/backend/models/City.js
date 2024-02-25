import mongoose from "mongoose";
const Schema = mongoose.Schema;
const citySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    theaters: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Theater",
      },
    ],
    movies: [
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

export default mongoose.model("City", citySchema);
