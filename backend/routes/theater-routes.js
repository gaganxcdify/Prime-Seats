import express from "express";
import { addtheater, getAllTheaters } from "../controllers/theater-controller.js";
const theaterRouter = express.Router();


theaterRouter.get("/", getAllTheaters)
theaterRouter.post("/", addtheater)



export default theaterRouter;