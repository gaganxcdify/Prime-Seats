import express from "express";
import { addMovieToTimeSlot, getAllBookingsByTheaterId, getTimeslotByMovieAndTheater } from "../controllers/bookedSeatsOfTimeSlot-controllers.js";



const BookedSeatsOfTimeSlotRouter = express.Router();

// BookedSeatsOfTimeSlotRouter.get("/", getSeats);
BookedSeatsOfTimeSlotRouter.post("/timeSlots", addMovieToTimeSlot);
BookedSeatsOfTimeSlotRouter.get("/:timeslotid", getAllBookingsByTheaterId);
BookedSeatsOfTimeSlotRouter.get("/gettimeslotbymovieandtheater", getTimeslotByMovieAndTheater);




export default BookedSeatsOfTimeSlotRouter;
