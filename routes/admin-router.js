import express from "express";
import { addAdmin, getAdmin, loginAdmin } from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/", getAdmin);

export default adminRouter;
