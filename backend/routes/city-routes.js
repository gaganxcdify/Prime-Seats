import express from "express"
import { addCity, getAllCity, getMovieByCityName } from "../controllers/city-controllers.js"

const cityRouter = express.Router()

cityRouter.get("/", getMovieByCityName  )
cityRouter.post("/", addCity)
cityRouter.post("/:id", getAllCity)

export default cityRouter;