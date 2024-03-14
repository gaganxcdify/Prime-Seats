import BookedSeatsOfTimeslot from "../models/BookedSeatsOfTimeslot.js";
import mongoose from "mongoose";
import Theater from "../models/Theater.js";
import Movie from "../models/Movie.js";
import City from "../models/City.js";



export const addMovieToTimeSlot = async (req, res) => {
  try {
    const { theaterId, movie, startdate, enddate, timeSlot } = req.body;

    console.log(req.body)
    if (!movie || !startdate || !enddate || !theaterId || !timeSlot || !Array.isArray(timeSlot) || timeSlot.length === 0) {
      return res.status(400).json({
        error: "Invalid request. Please provide all required fields.",
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const timeSlotDocuments = [];
      for (let slot of timeSlot) {
        const newTimeSlot = new BookedSeatsOfTimeslot({
          theaterId,
          timeslot: slot,
          startdate,
          enddate,
          movie: movie,
        });
        timeSlotDocuments.push(newTimeSlot);

        await newTimeSlot.save({ session });
      }


      const theater = await Theater.findById(theaterId).session(session);
      const movieObj = await Movie.findById(movie).session(session);
      const cityObj = await City.findById(theater.cityid).session(session);

      if (!cityObj.movies.some(m => m.equals(movieObj._id))) {
        cityObj.movies.push(movieObj);
      }

      movieObj.cities.push(cityObj);
      theater.timeslots.push(...timeSlotDocuments);
      theater.movies.push(movieObj);

      await theater.save({ session });
      await cityObj.save({ session });
      await movieObj.save({ session });

      await session.commitTransaction();

      res.status(201).json({ message: "Data stored in different time slots successfully" });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Error storing data in different time slots:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getAllBookingsByTheaterId = async (req, res) => {
  let id = req.params.timeslotid;
  // console.log(id)
  let bookedseats;
  try {
    bookedseats = await BookedSeatsOfTimeslot.find({ timeslot: id });
    // console.log(bookedseats);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  if (!bookedseats || bookedseats.length === 0) {
    return res.status(404).json({ message: "No bookings found for this timeslot" });
  }
  const { bookedseats: bookedSeatsArray } = bookedseats[0];
  return res.status(200).json({ bookedseats: bookedSeatsArray });
};


export const getTimeslotByMovieAndTheater = async (req, res) => {
  let { movieid, theaterid } = req.params;
  if (!movieid || !theaterid) {
    return res.status(400).json({
      error: "Invalid request. Please send all required fields.",
    });
  }
  let timeslots;
  try {
    timeslots = await BookedSeatsOfTimeslot.find({ movie: movieid, theaterId: theaterid }).populate("timeslot")
    if (timeslots.length === 0) {
      return res.status(404).json({ message: "No timeslots found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ timeslots });
}








