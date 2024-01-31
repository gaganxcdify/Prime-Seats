import express from "express";
import { Signup, deleteUser, getAllUsers, login, updateUser } from "../controllers/user-controllers.js";
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", Signup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login)

export default userRouter; 