import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Login.css";
import { useDispatch, useSelector } from 'react-redux';
import { personActions, adminActions } from '../../../../store';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state) => state.setlogin.isAdmin);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    console.log(isAdmin)

    const getUserRole = async () => {
        try {
            const res = await axios.get("http://localhost:5000/user", {
                params: {
                    email: inputs.email
                }
            });
            if (res.status === 200) {
                const userRole = res.data.user.role;
                if (userRole === "Admin") {
                    dispatch(adminActions.setlogin());
                }

            }
            return res
        } catch (err) {
            console.log(err);
            return err
        }
    };


    const onResReceived = async (data) => {
        try {
            const person = isAdmin ? "admin" : "customer";
            await dispatch(personActions.login());
            sessionStorage.setItem(`${person}Id`, data.id);
            sessionStorage.setItem(`token`, data.auth);
            navigate("/homepage");
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async () => {
        try {
            const url = isAdmin ? "http://localhost:5000/admin/login" : "http://localhost:5000/customer/login";
            const res = await axios.post(url, {
                email: inputs.email,
                password: inputs.password,
            });
            const data = res.data;
            console.log(data);
            if (res.status === 200) {
                onResReceived(data);
            } else {
                toast.error("Invalid credentials");
            }
        } catch (err) {
            toast.error("Invalid credentials");
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await getUserRole()
            .then(sendRequest())
            .catch((e) => console.log(e))
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <div className='login-header'>
                    <div className='login-text'>LOG IN</div>
                    <div className='login-underline'></div>
                </div>
                <div className='login-inputs'>
                    <div className="login-inputs">
                        <input className='login-input' name='email' type="email" placeholder="  Email Id" onChange={handleChange} />
                        <input className='login-input' name='password' type="password" placeholder="  Password" onChange={handleChange} />
                    </div>
                    <div className='login-submit-container'>
                        <button type="submit" className="login-submit">LOG IN</button>
                        <ToastContainer position="bottom-right" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
