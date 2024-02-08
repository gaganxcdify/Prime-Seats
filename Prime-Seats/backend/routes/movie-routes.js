import express from "express";
import { getMovieById, getAllMovies, addMovie, deleteMovieById } from "../controllers/movie-controllers.js";
const movieRouter = express.Router();


movieRouter.post("/", addMovie)
movieRouter.get("/", getAllMovies)
movieRouter.get("/:id", getMovieById)
movieRouter.delete("/:id", deleteMovieById)

export default movieRouter;