import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user-routes.js";

dotenv.config();
const app = express();
app.use(express.json());


app.use("/user", userRouter)

mongoose
    .connect(
        `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.fffwuar.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() =>
        app.listen(5000, () =>
            console.log("connected to the database and server is running")
        )
    )
    .catch((e) => console.log(e));
