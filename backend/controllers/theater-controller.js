import Theater from "../models/Theater.js";
import jwt from "jsonwebtoken";
import City from "../models/City.js";
import mongoose from "mongoose";


export const getAllTheaters = async (req, res, next) => {
    let theaters;
    try {
        theaters = await Theater.find()
    } catch (err) {
        return next(err);
    }
    if (!theaters) {
        return res.status(500).json({ message: "unexpected Error Occcured" });
    }

    return res.status(200).json({ theaters })
}

export const addtheater = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken || extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token not found" });
    }

    let adminId;
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
        } else {
            adminId = decrypted.id;
            return;
        }
    });

    const { name, location, cityid } = req.body;

    if ((!name || name.trim() == "") || (!location || location.trim() == "")) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }

    try {
        const citydetails = await City.findById(cityid);
        if (!citydetails) {
            return res.status(404).json({ message: "City not found" });
        }
        const theater = new Theater({
            name,
            location,
            cityid
        });

        const session = await mongoose.startSession();
        session.startTransaction();
        await theater.save({ session });
        citydetails.theaters.push(theater);
        await citydetails.save({ session });
        await session.commitTransaction();

        return res.status(201).json({ message: "Theater added successfully" });
    } catch (err) {
        console.error("Error adding theater:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
