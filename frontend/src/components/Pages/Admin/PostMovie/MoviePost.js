    import "./MoviePost.css";
    import axios from "axios";
    import { useEffect, useState } from "react";
    import { useNavigate } from 'react-router-dom';
    import Select from 'react-select';
    const MoviePost = () => {
        const navigate = useNavigate();
        const [cities, setCities] = useState([]);
        const [message, setMessage] = useState("");
        const [selectedCity, setSelectedCity] = useState("");
        const [inputs, setInputs] = useState({
            name: "",
            location: "",
            cityname: ""
        });
        

        const handleChange = (e) => {
            setInputs((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }

        const addTheater = async (cityId) => {
            try {
                const res = await axios.post("http://localhost:5000/theater/", {
                    cityid: cityId,
                    name: inputs.name,
                    location: inputs.location

                }, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
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

        const fetchCityDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/city/${inputs.cityname}`);
                const cityDetails = response.data
                return cityDetails;
            } catch (error) {
                console.error("Error fetching city details:", error);
            }
        };
    

        useEffect(() => {
            const fetchCities = async () => {
                try {
                    const response = await axios.get("http://localhost:5000/city/");
                    const citiesData = response.data.cities.map(city => city.name);
                    setCities(citiesData);
                    if (!selectedCity && citiesData.length > 0) {
                        setSelectedCity(citiesData[0]);
                    }
                } catch (error) {
                    console.error("Error fetching cities:", error);
                }
            };

            fetchCities();
        }, []);
    

        const handleSubmit = async (e) => {
            e.preventDefault();
            const cityDetails = await fetchCityDetails();
            if (cityDetails) {
                const cityId = cityDetails.city._id;
                console.log(cityId)
                await addTheater(cityId);
                navigate("/homepage");
            }
        }
        const handleCityChange = (selectedOptions) => {
            const selectedCities = selectedOptions.map(option => option.value);
            setInputs(prev => ({ ...prev, cities: selectedCities }));
        }

        const handleTheaterChange = (selectedOptions) => {
            const selectedTheaters = selectedOptions.map(option => option.value);
            setInputs(prev => ({ ...prev, theaters: selectedTheaters }));
        }

        return (
            <form className='addtheater-container' onSubmit={handleSubmit}>
                
                <div className='addtheater-header'>
                    <div className='addtheater-text'>Add Movie to Timeslot</div>
                    <div className='addtheater-underline'></div>
                </div>
                <div>
                            <label>Select Cities:</label>
                            <Select
                                isMulti
                                options={
                                    [
                                    { value: 'city1', label: 'City 1' },
                                    { value: 'city2', label: 'City 2' }
                                    // Add more options as needed
                                ]}
                                onChange={handleCityChange}
                                className="select-input"
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
                                className="select-input"
                            />
                        </div>
                        <div>
                            <label>Select Time Slot:</label>
                            <Select
                                isMulti
                                options={[
                                    { value: 'theater1', label: 'TImeSlot 1' },
                                    { value: 'theater2', label: 'Theater 2' }
                                    // Add more options as needed
                                ]}
                                onChange={handleTheaterChange}
                                className="select-input"
                            />
                        </div>
                <div className='addtheater-inputs'>
                    <div className="addtheater-inputs">
                        <select value={inputs.cityname} className="addtheater-input input-select" onChange={handleChange} name="cityname">
                            {/* {cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))} */}
                            <option value="city1">Movie</option>   
                        </select>
                        {/* <input className="addtheater-input" type="text" name="name" placeholder="  Name" value={inputs.name} onChange={handleChange} />
                        <input className="addtheater-input" type="text" name="location" placeholder="  Location" value={inputs.location} onChange={handleChange} /> */}

                    </div>
                    <div className='addtheater-submit-container'>
                        <button type="submit" className="addtheater-submit">ADD</button>
                    </div>
                </div>
            </form >
        );
    }

    export default MoviePost;


