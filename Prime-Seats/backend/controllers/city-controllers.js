import City from "../models/City.js";
import jwt from "jsonwebtoken";



export const getAllcities = async (req, res, next) => {
    let cities;
    try {
        cities = await City.find()
    } catch (err) {
        return next(err);
    }
    if (!cities) {
        return res.status(500).json({ message: "unexpected Error Occcured" });
    }

    return res.status(200).json({ cities })
}

export const getCityByName = async (req, res, next) => {
    const cityName = req.params.cityname;
    let city;
    try {
        city = await City.findOne({ name: cityName });
        if (!city) {
            return res.status(404).json({ message: "City not found" });
        }
    } catch (err) {
        console.error("Error fetching city by name:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ city });
}


export const addcity = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token not found" });
    }

    let adminId;
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
        } else {
            adminId = decrypted.id;
            return;
        }
    });

    const {
        name
    } = req.body

    if (!name || name.trim() == "") {
        return res.status(422).json({ message: "Invalid Inputs" })
    }

    let city;
    try {
        city = new City({
            name
        });
        city.save()

    } catch (err) {
        return console.log(err)
    }
    if (!city) {
        return res.status(500).json({ message: "Request Failed" })
    }
    return res.status(201).json({ message: "City added successfully" })
}
