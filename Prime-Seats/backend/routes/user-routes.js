import express from "express";
import { getAllUsers } from "../controllers/user-controllers.js";
import { Signup } from "../controllers/user-controllers.js";
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", Signup)

export default userRouter; 