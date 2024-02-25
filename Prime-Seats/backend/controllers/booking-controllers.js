import Booking from "../models/Bookings.js";
import Customer from "../models/Customer.js";
import Movie from "../models/Movie.js";
import mongoose from "mongoose";

export const newBooking = async (req, res, next) => {
    const { customerId, seats } = req.body;
    const movieId = req.params.id;

    // Validation
    if (!customerId && !seats && !movieId) {
        return res
            .status(400)
            .json({ message: "customerId, date, and seats are required" });
    }
    if (!movieId) {
        return res.status(400).json({ message: "movieId is required" });
    }
    if (!Array.isArray(seats) || seats.length === 0) {
        return res.status(400).json({ message: "seats must be a non-empty array" });
    }
    let existingMovie;
    let existingcustomer;

    try {
        existingMovie = await Movie.findById(movieId);
        existingcustomer = await Customer.findById(customerId);

        if (!existingMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (!existingcustomer) {
            return res.status(404).json({ message: "customer not found" });
        }

        const booking = new Booking({
            movieId,
            seats,
            customerId,
            is_deleted: false,
        });

        const session = await mongoose.startSession();
        session.startTransaction();

        existingcustomer.booking.push(booking);
        existingMovie.booking.push(booking);

        await existingcustomer.save({ session });
        await existingMovie.save({ session });
        await booking.save({ session });

        await session.commitTransaction();
        // await booking.save()

        return res.status(201).json(booking);
    } catch (err) {
        // Rollback transaction if an error occurs
        if (session) {
            await session.abortTransaction();
        }
        console.error(err);
        return res.status(500).json({ message: "Unable to create booking" });
    }
};

export const getBookingById = async (req, res, next) => {
    const movieId = req.params.id;
    //   console.log(req.params.id)

    let movies;
    let allSeats = [];
    try {

        movies = await Movie.findById(movieId).populate("booking");
        movies = movies.booking;

        // Loop through each booking
        for (let booking of movies) {
            // Loop through each seat in the booking and push it to the allSeats array
            for (let seat of booking.seats) {
                allSeats.push(seat);
            }
        }
    } catch (err) {
        return console.log(err);
    }
    if (!movies) {
        return res.status(500).json({ message: "Booking not found" });
    }
    return res.status(200).json({ allSeats });
};

export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;

    let booking;
    try {
        booking = await Booking.findByIdAndUpdate(id, { is_deleted: true });
        if (!booking) {
            return res.status(500).json({ message: "Booking not found" });
        }

        const session = await mongoose.startSession();

        if (booking.customerId && booking.customerId.booking) {
            await booking.customer.booking.pull(booking);
            await booking.customer.save({ session });
        }

        if (booking.movieId && booking.movieId.booking) {
            await booking.movieId.booking.pull(booking);
            await booking.movieId.save({ session });
        }

        session.commitTransaction();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "Booking Deleted successfully" });
};
