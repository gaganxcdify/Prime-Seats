import Booking from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const newBooking = async (req, res, next) => {
    const { movie, date, seatNumber, user, is_deleted } = req.body;

    let existingMovie;
    let existingUser;
    try {
        existingMovie = await Movie.findById(movie)
        existingUser = await User.findById(user)
    } catch (err) {
        return console.log(err)
    }
    if (!existingMovie) {
        return res.status(404).json({ message: "Movie not found" })
    }
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }


    let booking;
    try {
        booking = new Booking({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user,
            is_deleted,
        });
        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking)
        existingMovie.booking.push(booking);
        await existingUser.save({ session });
        await existingMovie.save({ session });
        await booking.save({ session });
        session.commitTransaction();

    } catch (err) {
        return console.log(err)
    }
    if (!booking) {
        return res.status(500).json({ message: "Unable to create booking" });
    }
    return res.status(201).json({ booking: booking })
}

export const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findById(id)
    } catch (err) {
        return console.log(err)
    }
    if (!booking) {
        return res.status(500).json({ message: "Booking not found" })
    }
    return res.status(200).json({ booking })
}




export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findByIdAndUpdate(id, { is_deleted: true });
    } catch (err) {
        return console.log(err)
    }
    if (!booking) {
        return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "booking Deleted successfully" })
}