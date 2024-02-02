import express  from "express";
import { getBookingId, deleteBooking, newBooking } from "../controllers/booking-controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/", newBooking)
bookingRouter.get("/:id", getBookingId)
bookingRouter.delete("/:id", deleteBooking)

export default bookingRouter;
