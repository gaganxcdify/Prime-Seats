import React, { useState } from 'react';
import "./EditMovie.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const EditMovie = () => {
    const history = useNavigate();
    const [message, setMessage] = useState("");
    const [inputs, setInputs] = useState({
        name: "",
        genre: "",
        releaseDate: "",
        image: "",
        cast: [],
        crew: [],
    });


    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const sendRequest = async () => {
        try {
            const res = await axios.post("http://localhost:5000/movie", {
                name: inputs.name,
                genre: inputs.genre,
                release_date: inputs.release_date,
                image: inputs.image,
                cast: inputs.cast,
                crew: inputs.crew
            });
            const data = res.data;
            setMessage(data.message);
            alert(message)
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/hompage"))
    }

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='header'>
                <div className='text'>Edit Movie</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className="inputs-signup">
                    <input className="input" type="text" name="name" placeholder="  Name" value={inputs.name} onChange={handleChange} />
                    <input className="input" type="text" name="genre" placeholder="  Genre" value={inputs.genre} onChange={handleChange} />
                    <input className="input" type="text" name="cast" placeholder="  Cast" value={inputs.cast} onChange={handleChange} />
                    <input className="input" type="text" name="crew" placeholder="  Crew" value={inputs.crew} onChange={handleChange} />
                    <div className="input-date">
                        <label className='label-date' htmlFor="dateInput">Release Date:</label>
                        <input type="date" name="releaseDate" value={inputs.releaseDate} onChange={handleChange} />
                    </div>
                    <div className="input-date">
                        <label className='label-date' htmlFor="dateInput">Poster Image:</label>
                        <input className="input-file" type="file" accept="image/*" name="image" value={inputs.posterurl} onChange={handleChange} />
                    </div>
                </div>
                <div className='submit-container-signup'>
                    <button type="submit" className="submit">SUBMIT</button>
                </div>
            </div>
        </form >
    );
}

export default EditMovie;

