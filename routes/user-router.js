import express from "express";
import { getAllUsers, postSignupUser,updateUser } from "../controllers/user-controller.js";

const userRouter = express.Router();


userRouter.get('/', getAllUsers)
userRouter.post('/signup', postSignupUser)
userRouter.put('/:id', updateUser)

export default userRouter;