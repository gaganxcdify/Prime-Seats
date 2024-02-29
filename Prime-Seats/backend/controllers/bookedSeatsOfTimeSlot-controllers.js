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
      const timeSlotDocuments = [];
      for (let slot of timeSlot) {
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
      theater.movies.push(movieObj);


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


// export const getAllBookingsByTheaterId = async (req, res) => {
//   let id = req.params.timeslotid;
//   console.log(id)
//   let bookedseats;
//   try {
//     bookedseats = await BookedSeatsOfTimeslot.find({ timeslot: id })
//   console.log(bookedseats)

//   } catch (err) {
//     return console.log(err)
//   }
//   if (!bookedseats) {
//     return res.status(404).json({ message: "Invalid Id" })
//   }
//   return res.status(200).json({ bookedseats })
// }


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
  // Extracting only the 'bookedseats' array from the response object
  const { bookedseats: bookedSeatsArray } = bookedseats[0];
  return res.status(200).json({ bookedseats: bookedSeatsArray });
};









// export const updateBookedSeats = async (req, res) => {
//   const timeslotid = req.params.id;
//   const { bookedseats } = req.body;
//   if (
//     !bookedseats &&
//     bookedseats.trim() === ""
//   )
//     return res.status(422).json({ message: "Invalid Inputs" })

//   let bookedseatsoftimeslot;
//   try {
//     bookedseats = await BookedSeatsOfTimeslot.find({ timeslot: timeslotid })
//     bookedseatsoftimeslot = await BookedSeatsOfTimeslot.findByIdAndUpdate(bookedseats._id, { bookedseats })
//   } catch (err) {
//     return console.log(err)
//   }
//   if (!bookedseatsoftimeslot) {
//     return res.status(500).json({ message: "Something went wrong" })
//   }
//   res.status(200).json({ message: "Updated successfully" })
// }