import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
import * as mongoose from 'mongoose';

export const newBooking = async (req,res, next)=>{
    const { movie, user, seatNumber} = req.body;
 
    let booking
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
    if (!existingUser) {
        return res.status(404).json({ message: "user not found" })
    }
    try{
        booking = new Booking({
            movie,
            seatNumber,
            user: existingUser._id,
        })
        const session = await mongoose.startSession()
        session.startTransaction()
        existingUser.bookings.push(booking)  
        existingMovie.bookings.push(booking)
        await existingUser.save({session})
        await existingMovie.save({session})
        await booking.save({session})
        session.commitTransaction()
    
    }catch(err){
       return res.status(500).json({message: err.message})
    }
    if(!newBooking){
        return res.status(500).json({message: "Booking failed"})
    }
    return res.status(200).json({booking})
    
   

}

export const getBookingId = async (req, res, next)=>{
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ booking });
} 

export const deleteBooking = async (req, res, next)=>{  
    const id = req.params.id;
    let booking;
    try {
        booking = await Booking.findByIdAndDelete(id).populate('user movie');
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.movie.bookings.pull(booking);
        await booking.user.bookings.pull(booking);
        await booking.movie.save({ session });
        await booking.user.save({ session });
        await session.commitTransaction();
    } catch (err) {
       return  console.log(err);
    }
    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ message: "Booking deleted" });
}   

export const getBookingsOfUser = async (req, res, next)=>{ 
    const id = req.params.id;
    let bookings;
    try {
        bookings = await Booking.find({user: id});
    }
    catch (err) {
        return console.log(err);
    }
    if (!bookings) {
        return res.status(404).json({ message: "Bookings not found" });
    }
    return res.status(200).json({ bookings });

}