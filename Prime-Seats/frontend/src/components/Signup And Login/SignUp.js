import React, { useState } from 'react';
import "./SignupAndLogin.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const history = useNavigate();
    const [message, setMessage] = useState("");
    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        contact_number: ""
    });


    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const sendRequest = async () => {
        try {
            if (inputs.secret_key) {
                const res = await axios.post("http://localhost:5000/admin/signup", {
                    first_name: inputs.first_name,
                    last_name: inputs.last_name,
                    email: inputs.email,
                    password: inputs.password,
                    contact_number: inputs.contact_number,
                    secret_key: inputs.secret_key
                });
                const data = res.data;
                setMessage(data.message);
                return data;
            } else {
                const res = await axios.post("http://localhost:5000/user/signup", {
                    first_name: inputs.first_name,
                    last_name: inputs.last_name,
                    email: inputs.email,
                    password: inputs.password,
                    contact_number: inputs.contact_number,
                });
                const data = res.data;
                setMessage(data.message);
                return data;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/login"))
    }

    return (
        <div className='signup'>
            <form className='container' onSubmit={handleSubmit}>
                <div className='header'>
                    <div className='text'>SIGN UP</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    <div className="inputs-signup">
                        <input className="input" type="text" name="first_name" placeholder="  First Name" value={inputs.first_name} onChange={handleChange} />
                        <input className="input" type="text" name="last_name" placeholder="  Last Name" value={inputs.last_name} onChange={handleChange} />
                        <input className="input" type="email" name="email" placeholder="  Email Id" value={inputs.email} onChange={handleChange} />
                        <input className="input" type="password" name="password" placeholder="  Password" value={inputs.password} onChange={handleChange} />
                        <input className="input" type="tel" name="contact_number" placeholder=" Contact Number" value={inputs.contact_number} onChange={handleChange} />
                        <input className="input" type="password" name="secret_key" placeholder=" Secret Key(Only for Admins)" value={inputs.secret_key} onChange={handleChange} />
                        <div className="message">{message}</div>
                    </div>
                    <div className='submit-container-signup'>
                        <button type="submit" className="submit">SIGN UP</button>
                    </div>
                </div>
            </form >
        </div>
    );
}

export default SignUp;
