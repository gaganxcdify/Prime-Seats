import React, { useState } from 'react';
import "./Addmovie.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const history = useNavigate();
    const [message, setMessage] = useState("");
    const [inputs, setInputs] = useState({
        name: "",
        genre: "",
        release_date: new Date(),
        cast: [],
        crew: [],
        Myfile: ""
    });


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setInputs(prev => ({ ...prev, Myfile: base64 }));

    }

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
                image: inputs.Myfile,
                cast: inputs.cast,
                crew: inputs.crew,
                admin: localStorage.getItem("adminId")
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
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
        sendRequest().then(() => history("/homepage"))
    }

    return (
        <form className='addmovie-container' onSubmit={handleSubmit}>
            <div className='header'>
                <div className='addMovie-text'>Add Movie</div>
                <div className='addmovie-underline'></div>
            </div>
            <div className='inputs'>
                <div className="inputs-signup">
                    <input className="input" type="text" name="name" placeholder="  Name" value={inputs.name} onChange={handleChange} />
                    <input className="input" type="text" name="genre" placeholder="  Genre" value={inputs.genre} onChange={handleChange} />
                    <input className="input" type="text" name="cast" placeholder="  Cast" value={inputs.cast} onChange={handleChange} />
                    <input className="input" type="text" name="crew" placeholder="  Crew" value={inputs.crew} onChange={handleChange} />
                    <div className="input-date">
                        <label className='label-date'>Release Date:</label>
                        <input type="date" name="release_date" value={inputs.release_date} onChange={handleChange} />
                    </div>
                    <div className="input-date">
                        <label className='label-date' htmlFor="dateInput">Poster Image:</label>
                        {/* <input className="input-file" type="file" name="image" value={inputs.posterurl} onChange={handleChange} />
                        <input className="input-file" type="file" name="image" onChange={(e) => setInputs({ ...inputs, image: e.target.files[0] })} /> */}
                        <input type='file' name="MyFile" id="image-upload" accept='.jpg, .png, .jpeg' onChange={(e) => handleFileUpload(e)} />
                    </div>
                </div>
                <div className='submit-container-signup'>
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