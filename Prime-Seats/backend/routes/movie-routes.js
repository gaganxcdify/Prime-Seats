import express from "express";
import { getMovieById, getAllMovies, addMovie } from "../controllers/movie-controllers.js";
const movieRouter = express.Router();
// import path from "path";

// router.post("/add-product", isAuth, upload.single("imageUrl"), postAddProduct);
import multer from "multer";

const upload = multer({ dest: './files' })

const storage = multer.diskStorage({
    destination: function (req, fie, cb) {
        cb(null, './files')
    },
    filename: function (reqfile, cb) {
        const uniqueuffix = Date.now()
        cb(null, uniqueuffix + fileURLToPath.originalname)
    }
})


movieRouter.post("/", upload.single("file"), addMovie)
movieRouter.get("/", getAllMovies)
movieRouter.get("/:id", getMovieById)

export default movieRouter;