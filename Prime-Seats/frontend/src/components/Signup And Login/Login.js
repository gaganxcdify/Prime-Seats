import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./SignupAndLogin.css";

const SignUp = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const sendRequest = async () => {
        try {
            const res = await axios.post("http://localhost:5000/user/login", {
                email: inputs.email,
                password: inputs.password,
            });
            const data = res.data;
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/"))
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className='header'>
                    <div className='text'>LOG IN</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    <div className="inputs-login">
                        <input className='input' name='email' type="email" placeholder="  Email Id" onChange={handleChange} />
                        <input className='input' name='password' type="password" placeholder="  Password" onChange={handleChange} />
                        {/* <input type='checkbox' /> */}
                    </div>
                    <div className='submit-container-login'>
                        <button type="submit" className="submit">LOG IN</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
