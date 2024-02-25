import React, { useState } from 'react';
import "./AddCity.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddCity = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [inputs, setInputs] = useState({
        name: ""
    });

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const sendRequest = async () => {
        try {
            const res = await axios.post("http://localhost:5000/city", {
                name: inputs.name,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => navigate("/homepage"))
    }

    return (
        <form className='addcity-container' onSubmit={handleSubmit}>
            <div className='addcity-header'>
                <div className='addcity-text'>Add City</div>
                <div className='addcity-underline'></div>
            </div>
            <div className='addcity-inputs'>
                <div className="addcity-inputs">
                    <input className="addcity-input" type="text" name="name" placeholder="  Name" value={inputs.name} onChange={handleChange} />
                </div>
                <div className='addcity-submit-container'>
                    <button type="submit" className="addcity-submit">ADD</button>
                </div>
            </div>
        </form >
    );
}

export default AddCity;
// export default withAuth(AddCity)


