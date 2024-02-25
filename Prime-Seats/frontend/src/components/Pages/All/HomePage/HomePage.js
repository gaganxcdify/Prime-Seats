import React, { useEffect, useState } from "react";
import axios from "axios";
import Moviecard from "../MovieCard/Moviecard";
import "./HomePage.css";
import { useSelector } from "react-redux";
import Confetti from 'react-confetti'

const HomePage = () => {
    const isAdmin = useSelector((state) => state.setlogin.isAdmin);
    const [movies, setMovies] = useState([]);
    // const [showConfetti, setShowconfetti] = useState(true);
    
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
        getAllmovies()
            .then((data) => setMovies(data))
            .catch((err) => console.log(err));
    }, []);

    const activeMovies = movies.filter((movie) => movie.is_active === true);

    return (
        <>
            <div className="home">
                {activeMovies.map((movie) => (
                    <Moviecard
                        key={movie._id}
                        id={movie._id}
                        name={movie.name}
                        genre={movie.genre}
                        image={movie.image}
                        releasedate={movie.releaseDate}
                        // city={selectedCity || cities[0]}
                        city="Bengaluru"
                        posterurl={movie.posterurl}
                    />
                ))}


            </div>
            {/* {showConfetti &&
                <Confetti
                    recycle={false}
                    width={window.innerWidth - 100}
                    height={window.innerHeight}
                    gravity={0.2}
                    color={"['#1da59e' '#faad40' '#e94539']"}

                />
            } */}
        </>
    );
};

export default HomePage;
