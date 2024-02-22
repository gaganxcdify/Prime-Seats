import express from "express";
import { addMovieToTimeSlot } from "../controllers/BookedSeatsOfTimeSlot-controllers.js";


const BookedSeatsOfTimeSlotRouter = express.Router();

// BookedSeatsOfTimeSlotRouter.get("/", getSeats);
BookedSeatsOfTimeSlotRouter.post("/timeSlots", addMovieToTimeSlot);

export default BookedSeatsOfTimeSlotRouter;
