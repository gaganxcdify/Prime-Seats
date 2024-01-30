import express from "express";
import { deleteUser, getAllUsers, updateUser } from "../controllers/user-controllers.js";
import { Signup } from "../controllers/user-controllers.js";
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", Signup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter; 