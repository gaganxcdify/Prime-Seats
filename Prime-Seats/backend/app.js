import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";

dotenv.config();
const app = express();
app.use(express.json());


app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);

mongoose
    .connect(
        `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.fffwuar.mongodb.net/Primeseats?retryWrites=true&w=majority`
    )
    .then(() =>
        app.listen(5000, () =>
            console.log("connected to the database and server is running")
        )
    )
    .catch((e) => console.log(e));
