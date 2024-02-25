
import React, { useState } from 'react';
import "./Addmovie.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import imageCompression from 'browser-image-compression';

const AddMovie = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [inputs, setInputs] = useState({
        name: "",
        genre: "",
        language: "",
        trailerurl: "",
        release_date: new Date(),
        cast: [],
        crew: [],
        Myfile: "",
        cities: [],
        theaters: []
    });
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        try {
            const options = {
                maxSizeMB: 0.05, // 50KB
                maxWidthOrHeight: 1920,
                useWebWorker: true
            };
            const compressedFile = await imageCompression(file, options);
            const base64 = await convertToBase64(compressedFile);
            setInputs(prev => ({ ...prev, Myfile: base64 }));
        } catch (error) {
            console.error('Error compressing image:', error);
        }
    }

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value,
        }));
    }
    const sendRequest = async () => {
        try {
            const res = await axios.post("http://localhost:5000/movie", {
                name: inputs.name,
                language: inputs.language,
                genre: inputs.genre,
                release_date: inputs.release_date,
                image: inputs.Myfile,
                trailerurl: inputs.trailerurl,
                cast: inputs.cast,
                crew: inputs.crew,
                cities: inputs.cities,
                theaters: inputs.theaters,
                admin: sessionStorage.getItem("adminId")
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            const data = res.data;
            setMessage(data.message);
            alert(message);
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => navigate("/homepage"))
    }

    return (
        <form className='addmovie-container' onSubmit={handleSubmit}>
            <div className='addmovie-header'>
                <div className='addmovie-text'>Add Movie</div>
                <div className='addmovie-underline'></div>
            </div>
            <div className='addmovie-inputs'>
                <div className="addmovie-inputs">
                    <input className="addmovie-input" type="text" name="name" placeholder="  Name" value={inputs.name} onChange={handleChange} />
                    <input className="addmovie-input" type="text" name="language" placeholder="  Language" value={inputs.language} onChange={handleChange} />
                    <input className="addmovie-input" type="text" name="genre" placeholder="  Genre" value={inputs.genre} onChange={handleChange} />
                    <input className="addmovie-input" type="text" name="cast" placeholder="  Cast" value={inputs.cast} onChange={handleChange} />
                    <input className="addmovie-input" type="text" name="crew" placeholder="  Crew" value={inputs.crew} onChange={handleChange} />
                    <input className="addmovie-input" type="text" name="trailerurl" placeholder="  Trailer URL" value={inputs.trailerurl} onChange={handleChange} />
                    <div className="addmovie-input-date">
                        <label className='addmovie-label-date'>Release Date:</label>
                        <input type="date" name="release_date" value={inputs.release_date} onChange={handleChange} />
                    </div>
                    <div className="addmovie-input-date">
                        <label className='addmovie-label-date' htmlFor="dateInput">Poster Image:</label>
                        <input type='file' name="MyFile" id="image-upload" accept='.jpg, .png, .jpeg' onChange={(e) => handleFileUpload(e)} />
                    </div>
                </div>
                <div className='addmovie-submit-container'>
                    <button type="submit" className="addmovie-submit">ADD</button>
                </div>
            </div>
        </form >
    );
}

export default AddMovie;

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}
