import express from "express";
import { addtheater, getAllTheaters, getTheaterdata, getTheatersByCityAndMovie } from "../controllers/theater-controller.js";
const theaterRouter = express.Router();


theaterRouter.get("/", getAllTheaters)
theaterRouter.get("/:theaterid/:movieid/:timeslotid", getTheaterdata)
theaterRouter.post("/", addtheater)
theaterRouter.get('/:cityid/:movieid', getTheatersByCityAndMovie);



export default theaterRouter;