import BookedSeatsOfTimeslot from "../models/BookedSeatsOfTimeslot.js";
import Booking from "../models/Booking.js";
import Customer from "../models/Customer.js";
import Movie from "../models/Movie.js";
import mongoose from "mongoose";


export const newBooking = async (req, res, next) => {
    const { timeslotid, customerId, seats, theaterid, date } = req.body;
    console.log(req.body)


    const movieId = req.params.id;

    // Validation
    if (!customerId || !seats || !movieId) {
        return res
            .status(400)
            .json({ message: "customerId, date, and seats are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({ message: "Invalid movieId" });
    }
    if (!Array.isArray(seats) || seats.length === 0) {
        return res.status(400).json({ message: "seats must be a non-empty array" });
    }

    let session;

    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const thisObject = await BookedSeatsOfTimeslot.findOne({ timeslot: timeslotid }).session(session);
        if (!thisObject) {
            throw new Error("No BookedSeatsOfTimeslot found for the given timeslotid");
        }

        const existingBookedSeatsOfTimeslot = thisObject;
        const existingCustomer = await Customer.findById(customerId).session(session);

        if (!existingCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const booking = new Booking({
            movieId,
            theaterid,
            date,
            seats,
            customerId,
            is_deleted: false,
        });
        console.log(booking)

        await booking.save({ session });

        existingBookedSeatsOfTimeslot.bookedseats.push(...seats);
        existingCustomer.booking.push(booking);

        await existingBookedSeatsOfTimeslot.save({ session });
        await existingCustomer.save({ session });

        await session.commitTransaction();

        return res.status(201).json(booking);
    } catch (err) {
        if (session) {
            await session.abortTransaction();
        }
        console.error(err);
        return res.status(500).json({ message: "Unable to create booking" });
    } finally {
        if (session) {
            session.endSession();
        }
    }
};




export const getBookingById = async (req, res, next) => {
    const cusid = req.params.id;
    let book;
    try {

        book = await Booking.find({ customerId: cusid }).populate("movieId").populate("theaterid");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    };
    if (!book) {
        return res.status(500).json({ message: "Booking not found" });
    }
    return res.status(200).json({ book });
}


export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findByIdAndUpdate(id, { is_deleted: true });
        if (!booking) {
            return res.status(500).json({ message: "Booking not found" });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        // Remove the booking from the customer's bookings array
        await Customer.findByIdAndUpdate(booking.customerId, { $pull: { bookings: id } }, { session });

        await session.commitTransaction();
        session.endSession();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "Booking Deleted successfully" });
};
