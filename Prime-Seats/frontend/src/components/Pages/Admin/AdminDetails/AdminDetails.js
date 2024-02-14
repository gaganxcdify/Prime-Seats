import React, { useEffect, useState } from 'react';
import { IoPersonSharp } from "react-icons/io5";
import "./AdminDetails.css";
import axios from 'axios';

const UserDetails = () => {
    const [admin, setAdmin] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getAdminById = async () => {
        const id = localStorage.getItem("adminId");
        const res = await axios.get(`http://localhost:5000/admin/${id}`).catch((err) => console.log(err));
        if (res.status !== 200) {
            return console.log("Unexpected Error");
        }
        const resData = await res.data;
        return resData;
    };

    useEffect(() => {
        getAdminById().then(data => setAdmin(data.admin)).catch(err => console.log(err));
    }, [admin]);

    return (
        <div className='admindetails-box'>
            <div className='admindetails-profilepicture'>
                <IoPersonSharp />
            </div>
            <div className='admindetails-whitebox'>
                <div className='admindetails-details'>
                    <div className='admindetails-title'><span>ADMIN DETAILS</span>
                        <span className='admindetails-underline' ></span></div>
                    <div className='admindetails-persondetails'>
                        <h1><span>Name: {admin.first_name} {admin.last_name}</span></h1>
                        <h1> <span>Email: {admin.email}</span></h1>
                        <h1> <span>Contact Number: {admin.contact_number}</span></h1>
                    </div>
                    <div className='admindetails-addedmoviestitle'><span>ADDED MOVIES</span>
                        <span className='admindetails-underline' ></span></div>
                    <div >
                        <div className='admindetails-addedmovies'>
                            <h3 style={{ color: "White" }} className='admindetails-moviename'>MOVIE NAME </h3>
                            <h3 style={{ color: "White" }}>GENRE</h3>
                            <h3 style={{ color: "White" }}>RELEASE DATE</h3>
                        </div>
                        {admin.addedMovies && admin.addedMovies.map((movie) => (
                            <div key={movie._id} className='admindetails-addedmovies'>
                                <h3 className='admindetails-moviename'>{movie.name}</h3>
                                <h3>{movie.genre}</h3>
                                <h3>{formatDate(movie.releaseDate)}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;

