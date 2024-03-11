import React, { useEffect, useState } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import "./AdminDetails.css";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminDetails = () => {


    const [admin, setAdmin] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getAdminById = async () => {
        const id = sessionStorage.getItem("adminId");
        const res = await axios.get(`http://localhost:5000/admin/${id}`).catch((err) => console.log(err));
        if (res.status !== 200) {
            return console.log("Unexpected Error");
        }
        const resData = await res.data;
        console.log(resData)
        return resData;
    };

    useEffect(() => {
        getAdminById().then(data => setAdmin(data.admin)).catch(err => console.log(err));
    }, []);

    return (
        <div className='admindetails-box'>
            <div className='admindetails-profilepicture'>
                <IoPersonSharp />
            </div>
            <div className='admindetails-whitebox'>
                <div className='admindetails-details'>
                    <div className='admindetails-title'><span>ADMIN DETAILS</span>
                        <span className='admindetails-underline' ></span>
                    </div>
                    <div className='admindetails-persondetails'>
                        <h2><span>Name: {admin.first_name} {admin.last_name}</span></h2>
                        <h2> <span>Email: {admin.email}</span></h2>
                        <h2> <span>Contact Number: {admin.contact_number}</span></h2>
                    </div>
                    <div className='admindetails-addedmoviestitle'><span>ADDED MOVIES</span>
                        <span className='admindetails-underline' ></span></div>
                    <div >
                        <div style={{ backgroundColor: "#323333" }} className='admindetails-addedmovies'>
                            <h4 style={{ color: "White" }} className='admindetails-moviename'>MOVIE NAME </h4>
                            <h4 style={{ color: "White" }}>GENRE</h4>
                            <h4 style={{ color: "White" }}>RELEASE DATE</h4>
                        </div>
                        {admin.addedMovies && admin.addedMovies.map((movie) => (
                                <div key={movie._id} className='admindetails-addedmovies'>
                                    <h3 className='admindetails-moviename' >{movie.name}</h3>
                                    <h3 >{movie.genre}</h3>
                                    <h3 >{formatDate(movie.releaseDate)}</h3>
                                </div>
                        ))}
                    </div>
                </div>
            </div >
        </div >
    );
};


export default AdminDetails