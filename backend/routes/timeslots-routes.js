import express from "express";
import { createTimeSlot, getTimeSlots } from "../controllers/timeslot-controller.js";

const timeslotsRouter = express.Router();


timeslotsRouter.post("/:id", createTimeSlot)
timeslotsRouter.get("/:id", getTimeSlots)


export default timeslotsRouter;
