// import React, { useState } from 'react';
// import "./Addmovie.css";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// const AddMovie = () => {
//     const navigate = useNavigate();
//     const [message, setMessage] = useState("");
//     const [inputs, setInputs] = useState({
//         name: "",
//         genre: "",
//         release_date: new Date(),
//         cast: [],
//         crew: [],
//         Myfile: ""
//     });


//     const handleFileUpload = async (e) => {
//         const file = e.target.files[0];
//         const base64 = await convertToBase64(file)
//         setInputs(prev => ({ ...prev, Myfile: base64 }));
//     }

//     const handleChange = (e) => {
//         setInputs((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }));
//     }

//     const sendRequest = async () => {
//         try {
//             const res = await axios.post("http://localhost:5000/movie", {
//                 name: inputs.name,
//                 genre: inputs.genre,
//                 release_date: inputs.release_date,
//                 image: inputs.Myfile,
//                 cast: inputs.cast,
//                 crew: inputs.crew,
//                 admin: localStorage.getItem("adminId")
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`
//                 }
//             });
//             const data = res.data;
//             setMessage(data.message);
//             alert(message)
//             return data;
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         sendRequest().then(() => navigate("/homepage"))
//     }

//     return (
//         <form className='addmovie-container' onSubmit={handleSubmit}>
//             <div className='addmovie-header'>
//                 <div className='addmovie-text'>Add Movie</div>
//                 <div className='addmovie-underline'></div>
//             </div>
//             <div className='addmovie-inputs'>
//                 <div className="addmovie-inputs">
//                     <input className="addmovie-input" type="text" name="name" placeholder="  Name" value={inputs.name} onChange={handleChange} />
//                     <input className="addmovie-input" type="text" name="genre" placeholder="  Genre" value={inputs.genre} onChange={handleChange} />
//                     <input className="addmovie-input" type="text" name="cast" placeholder="  Cast" value={inputs.cast} onChange={handleChange} />
//                     <input className="addmovie-input" type="text" name="crew" placeholder="  Crew" value={inputs.crew} onChange={handleChange} />
//                     <div className="editmovie-input-date">
//                         <label className='addmovie-label-date'>Release Date:</label>
//                         <input type="date" name="release_date" value={inputs.release_date} onChange={handleChange} />
//                     </div>
//                     <div className="addmovie-input-date">
//                         <label className='addmovie-label-date' htmlFor="dateInput">Poster Image:</label>
//                         <input type='file' name="MyFile" id="image-upload" accept='.jpg, .png, .jpeg' onChange={(e) => handleFileUpload(e)} />
//                     </div>
//                 </div>
//                 <div className='addmovie-submit-container'>
//                     <button type="submit" className="addmovie-submit">ADD</button>
//                 </div>
//             </div>
//         </form >
//     );
// }

// export default AddMovie;


// const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//         const fileReader = new FileReader();
//         fileReader.readAsDataURL(file);
//         fileReader.onload = () => {
//             resolve(fileReader.result)
//         };
//         fileReader.onerror = (error) => {
//             reject(error)
//         }
//     })
// }


import React, { useState } from 'react';
import "./Addmovie.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const AddMovie = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [inputs, setInputs] = useState({
        name: "",
        genre: "",
        release_date: new Date(),
        cast: [],
        crew: [],
        Myfile: "",
        cities: [],
        theaters: []
    });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setInputs(prev => ({ ...prev, Myfile: base64 }));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleCityChange = (selectedOptions) => {
        const selectedCities = selectedOptions.map(option => option.value);
        setInputs(prev => ({ ...prev, cities: selectedCities }));
    }

    const handleTheaterChange = (selectedOptions) => {
        const selectedTheaters = selectedOptions.map(option => option.value);
        setInputs(prev => ({ ...prev, theaters: selectedTheaters }));
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
                cities: inputs.cities,
                theaters: inputs.theaters,
                admin: localStorage.getItem("adminId")
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
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
                    <input className="addmovie-input" type="text" name="genre" placeholder="  Genre" value={inputs.genre} onChange={handleChange} />
                    <input className="addmovie-input" type="text" name="cast" placeholder="  Cast" value={inputs.cast} onChange={handleChange} />
                    <input className="addmovie-input" type="text" name="crew" placeholder="  Crew" value={inputs.crew} onChange={handleChange} />
                    <div className="editmovie-input-date">
                        <label className='addmovie-label-date'>Release Date:</label>
                        <input type="date" name="release_date" value={inputs.release_date} onChange={handleChange} />
                    </div>
                    <div className="addmovie-input-date">
                        <label className='addmovie-label-date' htmlFor="dateInput">Poster Image:</label>
                        <input type='file' name="MyFile" id="image-upload" accept='.jpg, .png, .jpeg' onChange={(e) => handleFileUpload(e)} />
                    </div>
                    <div>
                        <label>Select Cities:</label>
                        <Select
                            isMulti
                            options={[
                                { value: 'city1', label: 'City 1' },
                                { value: 'city2', label: 'City 2' }
                                // Add more options as needed
                            ]}
                            onChange={handleCityChange}
                        />
                    </div>
                    <div>
                        <label>Select Theaters:</label>
                        <Select
                            isMulti
                            options={[
                                { value: 'theater1', label: 'Theater 1' },
                                { value: 'theater2', label: 'Theater 2' }
                                // Add more options as needed
                            ]}
                            onChange={handleTheaterChange}
                        />
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
