import React, { useEffect, useState } from 'react'
import { IoPersonSharp } from "react-icons/io5";
import "./UserDetails.css"
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';

const UserDetails = () => {
    const [user, setUser] = useState([])

    const getUserById = async () => {
        const id = sessionStorage.getItem("userId");
        const res = await axios.get(`http://localhost:5000/user/${id}`).catch((err) => console.log(err));
        if (res.status !== 200) {
            return console.log("Unexpected Error");
        }
        const resData = await res.data;
        return resData;
    };

    // const getUserBooking = async () => {
    //     const id = sessionStorage.getItem("userId");
    //     const res = await axios
    //         .get(`http://localhost:5000/user/booking/${id}`)
    //         .catch((err) => console.log(err));

    //     if (res.status !== 200) {
    //         return console.log("Unexpected error");
    //     }
    //     const resData = await res.data;
    //     return resData;
    // }

    // const deleteBooking = async (id) => {
    //     const res = await axios
    //         .delete(`http://localhost:5000/user/booking/${id}`)
    //         .catch((err) => console.log(err));

    //     if (res.status !== 200) {
    //         return console.log("Unepxected Error");
    //     }

    //     const resData = await res.data;
    //     return resData;
    // }
    useEffect(() => {
        getUserById().then(data => setUser(data.user)).catch(err => console.log(err));
    }, [user])

    return (
        <div className='userdetails-box'>
            <div className='userdetails-profilepicture'>
                <IoPersonSharp />
            </div>
            <div className='userdetails-whitebox'>
                <div className='userdetails-details'>
                    <div className='userdetails-persondetails'>
                        <h1><span>Name: {user.first_name} {user.last_name}</span></h1>
                        <h1> <span>Email: {user.email}</span></h1>
                        <h1> <span>Contact Number: {user.contact_number}</span></h1>
                    </div>
                    <div className='userdetails-bookings'>
                        {/* {booking.map((booking,index)=>())} */}
                        <h2>MOVIE: KGF</h2>
                        <h3>SEATS: A2, A3, A4</h3>
                        <h3>DATE: 25/02/2024</h3>
                        <div className='userdetails-delete-icon'><MdDeleteForever /></div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserDetails;