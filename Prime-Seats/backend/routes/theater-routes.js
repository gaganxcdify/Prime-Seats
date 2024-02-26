import express from "express";
import { addtheater, getAllTheaters, getTheatersByCityAndMovie } from "../controllers/theater-controller.js";
const theaterRouter = express.Router();


theaterRouter.get("/", getAllTheaters)
theaterRouter.post("/", addtheater)
theaterRouter.get('/:cityid/:movieid', getTheatersByCityAndMovie);



export default theaterRouter;