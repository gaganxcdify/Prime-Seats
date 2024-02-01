import express from "express";
import { getAllUsers, postSignupUser,updateUser, deleteUser, loginUser } from "../controllers/user-controller.js";

const userRouter = express.Router();


userRouter.get('/', getAllUsers)
userRouter.post('/signup', postSignupUser)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)
userRouter.post('/login', loginUser)

export default userRouter;