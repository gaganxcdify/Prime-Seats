import express from "express";
import { addtheater, getAllTheaters, getTheatersByCityId } from "../controllers/theater-controller.js";
const theaterRouter = express.Router();


theaterRouter.get("/", getAllTheaters)
theaterRouter.post("/", addtheater)
theaterRouter.get("/",getTheatersByCityId)



export default theaterRouter;