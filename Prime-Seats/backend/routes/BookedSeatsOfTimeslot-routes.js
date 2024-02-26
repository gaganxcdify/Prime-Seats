import express from "express";
import { addMovieToTimeSlot } from "../controllers/bookedSeatsOfTimeSlot-controllers.js";



const BookedSeatsOfTimeSlotRouter = express.Router();

// BookedSeatsOfTimeSlotRouter.get("/", getSeats);
BookedSeatsOfTimeSlotRouter.post("/timeSlots/:id", addMovieToTimeSlot);

export default BookedSeatsOfTimeSlotRouter;
