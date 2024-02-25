import express from "express";
import { getUserByEmail } from "../controllers/user-controller.js";
const userRouter = express.Router();

userRouter.get("/", getUserByEmail);
// userRouter.post("/signup", userSignup);
// userRouter.put("/:id", updateUser);
// userRouter.delete("/:id", deleteUser);
// userRouter.post("/login", userLogin)
// userRouter.get("/:id", getUserById)


export default userRouter;  