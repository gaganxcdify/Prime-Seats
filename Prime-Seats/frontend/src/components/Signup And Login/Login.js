import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./SignupAndLogin.css";
import { useDispatch } from 'react-redux';
import { personActions } from '../../store';
import { adminActions } from '../../store';
import { toastContainer, toast } from "react-toastify"


const Login = () => {
    const dispatch = useDispatch();
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const onResReceived = async (data) => {
        try {
            let person = isAdmin ? "admin" : "user"
            await dispatch(personActions.login());
            localStorage.setItem(`${person}Id`, data.id);
            if (person === "admin") {
                await dispatch(adminActions.setlogin());
                localStorage.setItem("token", data.token)
            }
            navigate("/homepage");
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const sendRequest = async () => {
        try {
            let url = isAdmin ? "http://localhost:5000/admin/login" : "http://localhost:5000/user/login";
            const res = await axios.post(url, {
                email: inputs.email,
                password: inputs.password,
            });
            const data = res.data;
            console.log(data);
            if (res.status === 200) {
                onResReceived(data)
            } else {
                alert("error")
            }
        } catch (err) {
            alert("error")
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        sendRequest();
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className='header'>
                    <div className='signuptext'>LOG IN</div>
                    <div className='loginunderline'></div>
                </div>
                <div className='inputs'>
                    <div className="inputs-login">
                        <input className='input' name='email' type="email" placeholder="  Email Id" onChange={handleChange} />
                        <input className='input' name='password' type="password" placeholder="  Password" onChange={handleChange} />
                    </div>
                    <div className='checkbox'>
                        <input type='checkbox' onChange={() => setIsAdmin(true)} />
                        <label className='label' >
                            Are you an Admin?
                        </label>
                    </div>

                    <div className='submit-container-login'>
                        <button type="submit" className="login-submit">LOG IN</button>
                        <toastContainer />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
