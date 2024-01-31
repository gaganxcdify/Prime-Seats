import jwt from "jsonwebtoken";

export const addMovie = async (req, res, next) => {

    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token not found" });
    }

    let adminId;

    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
        } else {
            adminId = decrypted.indexOf;
            return;
        }
    });

    const { name, genre, releaseDate, posterurl, cast, crew, admin, is_active } = req.body
    if (!name && name.trim() == "" && !genre && genre.trim() == "" && !releaseDate && releaseDate.trim() == "" && !cast && cast.trim() == "" && !crew && crew.trim() == "" && !posterurl && posterurl.trim() === ""){
        return res.satus(422).json({message:"Invalid Inputs"})
    }


    let movie;
    try{
        movie = new Movie 
    }catch(err){
        return console.log(err)
    }
    return
}