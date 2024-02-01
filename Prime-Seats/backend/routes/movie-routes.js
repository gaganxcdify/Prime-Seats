import express from "express";
import { getMovieById, getAllMovies, addMovie } from "../controllers/movie-controllers.js";
const movieRouter = express.Router();

movieRouter.post("/", addMovie)
movieRouter.get("/", getAllMovies)
movieRouter.get("/:id", getMovieById)

export default movieRouter;