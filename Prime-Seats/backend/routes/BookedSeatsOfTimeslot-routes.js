import express from "express";
import { addMovieToTimeSlot, getAllBookingsByTheaterId } from "../controllers/bookedSeatsOfTimeSlot-controllers.js";



const BookedSeatsOfTimeSlotRouter = express.Router();

// BookedSeatsOfTimeSlotRouter.get("/", getSeats);
BookedSeatsOfTimeSlotRouter.post("/timeSlots/:id", addMovieToTimeSlot);
BookedSeatsOfTimeSlotRouter.get("/:timeslotid", getAllBookingsByTheaterId);



export default BookedSeatsOfTimeSlotRouter;
