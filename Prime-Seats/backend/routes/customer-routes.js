import express from "express";
import { Signup, deletecustomer, getAllCustomers, customerLogin, updatecustomer, getcustomerById } from "../controllers/customer-controllers.js";
const customerRouter = express.Router();

customerRouter.get("/", getAllCustomers);
customerRouter.post("/signup", Signup);
customerRouter.put("/:id", updatecustomer);
customerRouter.delete("/:id", deletecustomer);
customerRouter.post("/login", customerLogin)
customerRouter.get("/:id", getcustomerById)

// customerRouter.get("/bookings/:id", getBookingOfcustomer)


export default customerRouter;  