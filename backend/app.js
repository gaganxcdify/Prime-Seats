import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser"
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingRouter from "./routes/booking-routes.js";
import { notFound, errorhandler } from "./middlewares/errorMiddleware.js"
import cityRouter from "./routes/city-routes.js";
import theaterRouter from "./routes/theater-routes.js";
// import timeslotsRouter from "./routes/timeslots-routes.js";

dotenv.config();
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(cookieParser())


app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);
app.use("/city", cityRouter)
app.use("/theater", theaterRouter)
// app.use("/timeslots", timeslotsRouter)

app.use(notFound)
app.use(errorhandler)

mongoose
    .connect(
        `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.fffwuar.mongodb.net/Primeseats?retryWrites=true&w=majority`
    )
    .then(() =>
        app.listen(5000, () =>
            console.log("Connected to the database and server is running")
        )
    )
    .catch((e) => console.log(e));





