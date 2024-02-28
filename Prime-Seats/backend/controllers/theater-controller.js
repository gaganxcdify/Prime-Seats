import Theater from "../models/Theater.js";
import jwt from "jsonwebtoken";
import City from "../models/City.js";
import mongoose from "mongoose";

export const getTheatersByCityAndMovie = async (req, res, next) => {
    const { cityid, movieid } = req.params;

    let theaters;
    try {
        theaters = await Theater.find({ cityid, movies: movieid }).populate("timeslots");
    } catch (err) {
        return next(err);
    }

    if (!theaters) {
        return res.status(404).json({ message: "No theaters found for the given city and movie." });
    }

    return res.status(200).json({ theaters });
};

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


export const getTheatersByCityId = async (req, res, next) => {
    const { cityIds } = req.body; // Array of city IDs
    // Validate if cityIds is an array and not empty
    if (!Array.isArray(cityIds) || cityIds.length === 0) {
        return res.status(400).json({ message: "City IDs should be provided as a non-empty array" });
    }

    try {
        // Find cities for the provided city IDs and populate theaters
        const cities = await City.find({ _id: { $in: cityIds } }).populate('theaters');

        if (cities.length === 0) {
            return res.status(404).json({ message: "No cities found for the provided city IDs" });
        }

        // Extract theaters from cities
        const theaters = cities.flatMap(city => city.theaters);

        if (theaters.length === 0) {
            return res.status(404).json({ message: "No theaters found for the provided city IDs" });
        }

        return res.status(200).json({ theaters });
    } catch (err) {
        // Handle database or other errors
        console.error("Error in fetching theaters:", err);
        return res.status(500).json({ message: "An unexpected error occurred while fetching theaters" });
    }
}



export const getTheaterdata = async (req, res) => {
    const { movieid, timeslotid, theaterid } = req.params;
    let theaterdata;
    try {
        theaterdata = await Theater.findById(theaterid)
            .populate({
                path: 'timeslots',
                match: { _id: timeslotid }
            })
            .populate({
                path: 'movies',
                match: { _id: movieid }
            });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!theaterdata) {
        return res.status(404).json({ message: "Theater not found" });
    }

    theaterdata.movies = theaterdata.movies.filter(movie => movie !== null);
    theaterdata.timeslots = theaterdata.timeslots.filter(timeslot => timeslot !== null);

    return res.status(200).json({ theaterdata });
};



