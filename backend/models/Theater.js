import mongoose from "mongoose";

const theaterSchema = mongoose.Schema(
  {
    theaterName: {
      type: String,
      required: true,
    },
    theaterAddress: {
      type: String,
      required: true,
    },
    screens: [
      {
        type: String,
      },
    ],
    currentCity: {
      type: mongoose.Types.ObjectId,
      ref: "City",
    },
    movies:{
      type: mongoose.Types.ObjectId,
      ref: "Movie",
    }
  },
  {
    timestamp: true,
  }
);

export default mongoose.model("Theater", theaterSchema);
