import express from "express";
import Movie from "../models/Movie.js";
import Admin from "../models/Admin.js";

import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1]; // Bearer token
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }
  let adminId;
  // verify token

  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(404).json({ message: "Invalid Token" });
    } else {
      adminId = decrypted.id;
      return;
    }
  });
  const {
    title,
    description,
    releaseDate,
    posterUrl,
    featured,
    cast,
    crew,
    genre,
  } = req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !releaseDate &&
    releaseDate.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === "" &&
    !featured &&
    featured.trim() === "" &&
    !genre &&
    genre.trim() === "" &&
    !cast &&
    cast.trim() === "" &&
    !crew &&
    crew.trim() === ""
  ) {
    return res.status(404).json({ message: "Invalid Inputs" });
  }
  let movie;

  try {
    movie = new Movie({
      title,
      description,
      releaseDate,
      posterUrl,
      featured,
      cast,
      crew,
      genre,
      admin: adminId,
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId)
    session.startTransaction();
    await movie.save({ session });
    adminUser.addedMovies.push(movie);  
    await adminUser.save({ session });  
    await session.commitTransaction();

  } catch (err) {
    console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "server side error" });
  }
  return res.status(201).json({ movie });
};
export const getAllMovie = async (req, res, next) => {
  let movies;

  try {
    movies = await Movie.find();
  } catch (err) {
    console.log(err);
  }
  if (!movies) {
    return res.status(404).json({ message: "invalid token" });
  }
  return res.status(200).json({ movies });
};

export const getMovie = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  return res.status(200).json({ movie });
};
