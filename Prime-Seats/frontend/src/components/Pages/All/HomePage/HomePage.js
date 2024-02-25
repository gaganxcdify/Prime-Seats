import React, { useEffect, useState } from "react";
import axios from "axios";
import Moviecard from "../MovieCard/Moviecard";
import "./HomePage.css";
import { useSelector } from "react-redux";
import Confetti from 'react-confetti'

const HomePage = () => {
    const isAdmin = useSelector((state) => state.setlogin.isAdmin);
    const [movies, setMovies] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [showConfetti, setShowconfetti] = useState(true);
    const getAllmovies = async () => {
        try {
            const res = await axios.get("http://localhost:5000/movie");
            if (res.status === 200) {
                return res.data.movies;
            } else {
                console.log("No data");
                return [];
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    };

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get("http://localhost:5000/city/");
                const citiesData = response.data.cities.map(city => city);
                setCities(citiesData);
                if (!selectedCity && citiesData.length > 0) {
                    setSelectedCity(citiesData[0]);
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchCities();

        setTimeout(() => setShowconfetti(false), 6000)
    }, []);


    const gitMovieByCityId = async (cityId) => {
        try {
            const response = await axios.get(`http://localhost:5000/movie/byCity/${cityId}`);
            const moviesData = response.data.movies.map(movie => movie);
            setMovies(moviesData);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }


console.log(movies)
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        gitMovieByCityId(event.target.value);
        
    };

    useEffect(() => {
        getAllmovies()
            .then((data) => setMovies(data))
            .catch((err) => console.log(err));
    }, []);

    const activeMovies = movies.filter((movie) => movie.is_active === true);

    return (
        <>
            <div className="homepage-dropdown">
                {!isAdmin && (
                    <div>
                        <select value={selectedCity} onChange={handleCityChange}>
                            {cities.map((city, index) => (
                                <option key={index} value={city._id}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            <div className="home">
                {activeMovies.map((movie) => (
                    <Moviecard
                        key={movie._id}
                        id={movie._id}
                        name={movie.name}
                        genre={movie.genre}
                        image={movie.image}
                        releasedate={movie.releaseDate}
                        city={selectedCity || cities[0]}
                        posterurl={movie.posterurl}
                    />
                ))}


            </div>
            {showConfetti &&
                <Confetti
                    recycle={false}
                    width={window.innerWidth - 100}
                    height={window.innerHeight}
                    gravity={0.2}
                    color={"['#1da59e' '#faad40' '#e94539']"}

                />
            }
        </>
    );
};

export default HomePage;
