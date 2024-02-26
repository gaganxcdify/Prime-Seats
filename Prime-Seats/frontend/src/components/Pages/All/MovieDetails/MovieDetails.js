

import React, { useEffect, useState } from 'react';
import './MovieDetails.css';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = (props) => {
    const [movie, setMovie] = useState({});
    const isAdmin = useSelector((state) => state.setlogin.isAdmin);
    const { movieid, cityid } = useParams();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const getMovieDetails = async (movieid) => {
        try {
            const res = await axios.get(`http://localhost:5000/movie/${movieid}`);
            if (res.status === 200) {
                return res.data;
            } else {
                throw new Error("Unexpected Error");
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    useEffect(() => {
        getMovieDetails(movieid)
            .then((res) => setMovie(res?.movie))
            .catch((err) => console.log(err));
    }, [movieid]);

    const handlePatch = async (movieid) => {
        try {
            console.log(movieid);
            const res = await axios.patch(`http://localhost:5000/movie/${movieid}`, {
                is_active: false,
            });
            if (res.status === 200) {
                return res.data;
            } else {
                throw new Error("Unexpected Error");
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    console.log(movie)
    return (
        <div className="moviedetails-card">
            <div className="moviedetails-posterImg-card"><img
                className="moviedetails-posterImg"
                src={movie.image}
                alt={movie.name}
            /></div>
            <div className="moviedetails-movieInfo-card">
                {movie && (
                    <>
                        {/* <img
                        className="moviedetails-posterImg"
                        src={movie.image}
                        alt={movie.name}
                    /> */}
                        <div className="moviedetails-movieInfo">
                            <span className="moviedetails-movieName">{movie.name}</span>
                            <span className='moviedetails-genre'>{movie.genre}</span>
                            <span className='moviedetails-language'>{movie.language}</span>
                            <span className='moviedetails-cast'>cast: {movie.cast}</span>
                            <span className='moviedetails-crew'>crew: {movie.crew}</span>
                            <span className=''>{`Release Date: ${formatDate(movie.releasedate)}`}</span>
                            <div className='moviedetails-button-container'>
                                {isAdmin ? (
                                    <div className='moviedetails-button-div'>
                                        <button className="moviedetails-book">
                                            <NavLink className="moviedetails-navlink" to={`/editmovie/${movie._id}`}>
                                                EDIT MOVIE
                                            </NavLink>
                                        </button>
                                        <div className="moviedetails-book">
                                            <NavLink className="moviedetails-navlink" to={`/homepage`} onClick={() => handlePatch(movie._id)}>
                                                INACTIVE MOVIE
                                            </NavLink>
                                        </div>
                                    </div>
                                ) : (<div>
                                    <button className="moviedetails-book">
                                        <NavLink className="moviedetails-navlink" to={movie.trailerurl} target="_blank">
                                            WATCH TRAILER
                                        </NavLink>
                                    </button>
                                    <button className="moviedetails-book">
                                        <NavLink className="moviedetails-navlink" to={`/booking/${movieid}/${cityid}`}>
                                            BOOK TICKET
                                        </NavLink>
                                    </button>
                                </div>

                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
};

export default MovieDetails;
