import React, { useEffect, useState } from 'react'
import { IoPersonSharp } from "react-icons/io5";
import "./CustomerDetails.css"
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';

const CustomerDetails = () => {
    const [customer, setcustomer] = useState([])

    const getcustomerById = async () => {
        const id = sessionStorage.getItem("customerId");
        const res = await axios.get(`http://localhost:5000/customer/${id}`).catch((err) => console.log(err));
        if (res.status !== 200) {
            return console.log("Unexpected Error");
        }
        const resData = await res.data;
        return resData;
    };

    // const getcustomerBooking = async () => {
    //     const id = sessionStorage.getItem("customerId");
    //     const res = await axios
    //         .get(`http://localhost:5000/customer/booking/${id}`)
    //         .catch((err) => console.log(err));

    //     if (res.status !== 200) {
    //         return console.log("Unexpected error");
    //     }
    //     const resData = await res.data;
    //     return resData;
    // }

    // const deleteBooking = async (id) => {
    //     const res = await axios
    //         .delete(`http://localhost:5000/customer/booking/${id}`)
    //         .catch((err) => console.log(err));

    //     if (res.status !== 200) {
    //         return console.log("Unepxected Error");
    //     }

    //     const resData = await res.data;
    //     return resData;
    // }
    useEffect(() => {
        getcustomerById().then(data => setcustomer(data.customer)).catch(err => console.log(err));
    }, [customer])

    return (
        <div className='customerdetails-box'>
            <div className='customerdetails-profilepicture'>
                <IoPersonSharp />
            </div>
            <div className='customerdetails-whitebox'>
                <div className='customerdetails-details'>
                    <div className='customerdetails-persondetails'>
                        <h1><span>Name: {customer.first_name} {customer.last_name}</span></h1>
                        <h1> <span>Email: {customer.email}</span></h1>
                        <h1> <span>Contact Number: {customer.contact_number}</span></h1>
                    </div>
                    <div className='customerdetails-bookings'>
                        {/* {booking.map((booking,index)=>())} */}
                        <h2>MOVIE: KGF</h2>
                        <h3>SEATS: A2, A3, A4</h3>
                        <h3>DATE: 25/02/2024</h3>
                        <div className='customerdetails-delete-icon'><MdDeleteForever /></div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CustomerDetails;