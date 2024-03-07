import React, { useEffect, useState } from "react";
import axios from "axios";
import Moviecard from "../MovieCard/Moviecard";
import "./HomePage.css";
import { useSelector } from "react-redux";
import Confetti from 'react-confetti';

const HomePage = () => {
    const isAdmin = useSelector((state) => state.setlogin.isAdmin);
    const cityId = useSelector((state) => state.city.cityid);
    const movieId = useSelector((state) => state.movie.movieid);
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showConfetti, setShowConfetti] = useState(true);

    const getAllMovies = async () => {
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

    const getMoviesByCityId = async (cityId) => {
        try {
            const response = await axios.get(`http://localhost:5000/movie/byCity/${cityId}`);
            const moviesData = response.data.movies;
            setMovies(moviesData);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }
    console.log(searchQuery)
    useEffect(() => {
        if (cityId) {
            getMoviesByCityId(cityId); // Fetch movies by city id if city id is available
            setSearchQuery("")
        } else {
            // Fetch all movies if city id is not available
            getAllMovies()
                .then((data) => setMovies(data))
                .catch((err) => console.log(err));
        }
    }, [cityId]); // Run useEffect whenever cityId changes

    const activeMovies = movies.filter((movie) => movie.is_active === true);
    const filteredMovies = activeMovies.filter(movie =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const movieeee = filteredMovies.filter((movie) => movie._id === movieId)
    console.log(movieId)
    const name = movieId ? movieeee : filteredMovies

    return (
        <>
            <div className="home">

                {name.map((movie) => (
                    <Moviecard
                        key={movie._id}
                        id={movie._id}
                        name={movie.name}
                        genre={movie.genre}
                        image={movie.image}
                        releasedate={movie.releaseDate}
                        city={cityId}
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
                    colors={['#1da59e', '#faad40', '#e94539']}
                />
            }
        </>
    );
};

export default HomePage;
