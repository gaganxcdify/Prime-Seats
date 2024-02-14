import City from "../models/City.js";
// import Movie from "../models/Movie.js";

export const getAllCity = async (req, res, next)=>{
    let city;
    try {
        city = await City.find();
    } catch (err) {
        return console.log(err)
    }
    if (!city) {
        return res.status(500).json({ message: "Request failed" });
    }
    return res.status(200).json({ city })
}

export const addCity = async(req, res, next)=>{
    const {cityName, pinCode}= req.body
    let city;
    try {
        city = new City({
            cityName,
            pinCode,
        })
        await city.save();
    } catch (err) {
        return console.log(err)
    }
    if (!city) {
        return res.status(500).json({ message: "Request failed" });
    }
    return res.status(200).json({ city })
}


export const getMovieByCityName = async (req, res, next) => {
    const { cityName } = req.body;
    let movies;
    try {
        movies = await City.findOne({ cityName }).populate("movies");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    if (!movies) {
        return res.status(404).json({ message: "City not found" });
    }
    return res.status(200).json({ movies });
}