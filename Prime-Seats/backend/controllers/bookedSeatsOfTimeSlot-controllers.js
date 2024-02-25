import BookedSeatsOfTimeslot from "../models/BookedSeatsOfTimeslot.js";
import mongoose from "mongoose";
import Theater from "../models/Theater.js";
import Movie from "../models/Movie.js";
import City from "../models/City.js";


export const addMovieToTimeSlot = async (req, res) => {
  try {
    const { movie, posted_date, timeSlot } = req.body;
    const theaterId = req.params.id;
    console.log(req.body)
    // Validate the request body
    if (!movie || !posted_date || !theaterId || !timeSlot || !Array.isArray(timeSlot) || timeSlot.length === 0) {
      return res.status(400).json({
        error: "Invalid request. Please provide all required fields.",
      });
    }

    // Start a Mongoose session and transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Iterate over each time slot and store data for it
      const timeSlotDocuments = [];
      for (let slot of timeSlot) {
        // Create a new time slot document
        const newTimeSlot = new BookedSeatsOfTimeslot({
          timeslot: slot,
          date: posted_date,
          movie: movie,
        });
        timeSlotDocuments.push(newTimeSlot);

        // Save the new time slot document
        await newTimeSlot.save({ session });
      }


      const theater = await Theater.findById(theaterId).session(session);
      const movieObj = await Movie.findById(movie).session(session);
      const cityObj = await City.findById(theater.cityid).session(session);
   
      movieObj.cities.push(cityObj);
      cityObj.movies.push(movieObj);
      theater.timeslots.push(...timeSlotDocuments);


      await theater.save({ session });
      await cityObj.save({ session });
      await movieObj.save({ session });

      await session.commitTransaction();

      // Respond with a success message
      res.status(201).json({ message: "Data stored in different time slots successfully" });
    } catch (error) {
      // Rollback transaction on error
      await session.abortTransaction();
      throw error; // Re-throw error to be caught by the outer catch block
    } finally {
      // End session
      session.endSession();
    }
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error("Error storing data in different time slots:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



