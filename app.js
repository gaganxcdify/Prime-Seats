import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-router.js";

dotenv.config()
const app = express();
app.use(express.json())

app.use("/user", userRouter)

mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.fffwuar.mongodb.net/BookMyShow?retryWrites=true&w=majority`
).then(()=>{
    app.listen(4000, () => {
        console.log("Connected to port 4000");
      });
}).catch(
    (error)=> console.log(error)
);

  