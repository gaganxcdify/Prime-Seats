import express from "express";
import { AdminUpdate, AdminLogin, AdminSignup, AdminDelete } from "../controllers/admin-controllers.js";
const adminRouter = express.Router();

adminRouter.post("/signup", AdminSignup);
adminRouter.post("/login", AdminLogin);
adminRouter.delete("/:id", AdminDelete);
adminRouter.put("/:id", AdminUpdate);

export default adminRouter;