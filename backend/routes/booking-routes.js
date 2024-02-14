import express from "express";
import { deleteBooking, getBookingByMovieId, newBooking } from "../controllers/booking-controllers.js";

const bookingRouter = express.Router()

bookingRouter.post("/:id", newBooking)
bookingRouter.get("/:id", getBookingByMovieId)
bookingRouter.delete("/:id", deleteBooking)


export default bookingRouter;