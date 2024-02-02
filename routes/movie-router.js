import express from "express"
import { addMovie, getAllMovie, getMovie } from "../controllers/movie-controller.js"

const movieRouter = express.Router()

movieRouter.get("/", getAllMovie )
movieRouter.get("/:id", getMovie )

movieRouter.post("/", addMovie )

export default movieRouter