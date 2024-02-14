import express from "express";
import { getAdmin, AdminUpdate, AdminLogin, AdminSignup, AdminDelete, GetAdminById } from "../controllers/admin-controllers.js";
const adminRouter = express.Router();

adminRouter.post("/", getAdmin);
adminRouter.post("/signup", AdminSignup);
adminRouter.post("/login", AdminLogin);
adminRouter.delete("/:id", AdminDelete);
adminRouter.put("/:id", AdminUpdate);
adminRouter.get("/:id", GetAdminById);

export default adminRouter;