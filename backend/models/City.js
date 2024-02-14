import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      default: 123456,
    },
    availableTheater: [
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
