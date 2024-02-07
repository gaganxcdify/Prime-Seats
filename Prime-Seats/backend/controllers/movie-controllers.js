import jwt from "jsonwebtoken";
import Movie from "../models/Movie.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";


export const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken && extractedToken.trim() === "") {
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

    const {
        name,
        genre,
        releaseDate,
        cast,
        crew,
        admin } = req.body
    const fileName = req.file.fileName;

    if ((!name || name.trim() == "") && (!genre || genre.trim() == "") && (!releaseDate || releaseDate.trim() == "") && (!cast || cast.trim() == "") && (!crew || crew.trim() == "")) {
        return res.status(422).json({ message: "Invalid Inputs" })
    }


    let movie;
    try {
        movie = new Movie({
            name,
            genre,
            releaseDate: new Date(`${releaseDate}`),
            image: fileName,
            cast,
            crew,
            admin: adminId,
            is_active: true
        });

        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        await movie.save({ session });
        adminUser.addedMovies.push(movie);
        await adminUser.save({ session });
        await session.commitTransaction();

    } catch (err) {
        return console.log(err)
    }
    if (!movie) {
        return res.status(500).json({ message: "Request Failed" })
    }
    return res.status(201).json({ message: "Movie added successfully" })
}



export const getAllMovies = async (req, res, next) => {
    let movies;
    try {
        movies = await Movie.find();
    } catch (err) {
        return console.log(err)
    }
    if (!movies) {
        return res.status(500).json({ message: "Request failed" });
    }
    return res.status(200).json({ movies })
}


export const getMovieById = async (req, res, next) => {
    let id = req.params.id;
    let movie;
    try {
        movie = await Movie.findById(id)
    } catch (err) {
        return console.log(err)
    }
    if (!movie) {
        return res.status(404).json({ message: "Invalid Id" })
    }
    return res.status(200).json({ message: "sent" })
}