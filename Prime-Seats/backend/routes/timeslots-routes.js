import express from "express";
import { createTimeSlot, getTimeSlots } from "../controllers/timeslot-controller.js";
const timeslotsRouter = express.Router();


timeslotsRouter.get("/:id", getTimeSlots)
timeslotsRouter.post("/:id", createTimeSlot)


export default timeslotsRouter;