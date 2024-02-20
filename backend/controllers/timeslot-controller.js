import jwt  from "jsonwebtoken";
import TimeSlot from "../models/TimeSlot.js";
import Theater from "../models/Theater.js";
import mongoose from "mongoose";


export const createTimeSlot = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    const { timeSlots } = req.body;
    const theater = req.params.id;
 

    if (!extractedToken || extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token not found" });
    }   

    let adminId;
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
        } else {
            adminId = decrypted.id;
        }
    });
 

    if (!timeSlots || !theater) {
        return res.status(422).json({ message: "TimeSlots and theater are required" });
    }

    try {
        const slot = new TimeSlot({
            slot: timeSlots,
            theater,
        });

        const session = await mongoose.startSession();
        const theaterDetails = await Theater.findById(theater);
        session.startTransaction();
        await slot.save({ session });
        theaterDetails.timeslots.push(slot);
        await theaterDetails.save({ session });
        await session.commitTransaction();
        return res.status(201).json({ message: "Time slot created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getTimeSlots = async (req, res, next) => { 
    const { id } = req.params;

    try {
        const timeSlots = await TimeSlot.find({ theater: id }).populate('theater');
        res.status(200).json(timeSlots);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}   