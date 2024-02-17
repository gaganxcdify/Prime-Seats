import express from "express";
import { addcity, getAllcities, getCityByName } from "../controllers/city-controllers.js";
const cityRouter = express.Router();

cityRouter.get("/", getAllcities);
cityRouter.get("/:cityname", getCityByName);
cityRouter.post("/", addcity)



export default cityRouter;  