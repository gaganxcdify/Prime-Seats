import "./AddTheater.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddTheater = () => {
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
    // useEffect(() => {
    const fetchCityDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/city/${inputs.cityname}`);
            const cityDetails = response.data
            return cityDetails;
        } catch (error) {
            console.error("Error fetching city details:", error);
        }
    };
    //     fetchCityDetails();
    // }, [inputs.cityname])


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
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

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

    return (
        <form className='addtheater-container' onSubmit={handleSubmit}>
            <div className='addtheater-header'>
                <div className='addtheater-text'>Add Theater</div>
                <div className='addtheater-underline'></div>
            </div>
            <div className='addtheater-inputs'>
                <div className="addtheater-inputs">
                    <select value={inputs.cityname} className="addtheater-input" onChange={handleChange} name="cityname">
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                    <input className="addtheater-input" type="text" name="name" placeholder="  Name" value={inputs.name} onChange={handleChange} />
                    <input className="addtheater-input" type="text" name="location" placeholder="  Location" value={inputs.location} onChange={handleChange} />

                </div>
                <div className='addtheater-submit-container'>
                    <button type="submit" className="addtheater-submit">ADD</button>
                </div>
            </div>
        </form >
    );
}

export default AddTheater;


