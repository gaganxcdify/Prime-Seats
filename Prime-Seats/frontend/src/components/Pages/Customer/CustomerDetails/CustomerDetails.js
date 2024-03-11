import React, { useEffect, useState } from 'react'
import { IoPersonSharp } from "react-icons/io5";
import "./CustomerDetails.css"
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';

const CustomerDetails = () => {
    const [customer, setcustomer] = useState([])
    const [booking, setBooking] = useState([])


    const getcustomerById = async () => {
        const id = sessionStorage.getItem("customerId");
        const res = await axios.get(`http://localhost:5000/customer/${id}`).catch((err) => console.log(err));
        if (res.status !== 200) {
            return console.log("Unexpected Error");
        }
        const resData = await res.data;
        return resData;
    };

    const getcustomerBooking = async () => {
        const id = sessionStorage.getItem("customerId");
        const res = await axios
            .get(`http://localhost:5000/booking/${id}`)
            .catch((err) => console.log(err));

        if (res.status !== 200) {
            return console.log("Unexpected error");
        }
        const resData = await res.data;
        // console.log(resData)
        return resData;
    }

    // const deleteBooking = async (id) => {
    //     const res = await axios
    //         .delete(`http://localhost:5000/booking/${id}`)
    //         .catch((err) => console.log(err));

    //     if (res.status !== 200) {
    //         return console.log("Unepxected Error");
    //     }

    //     const resData = await res.data;
    //     return resData;
    // }

    useEffect(() => {
        getcustomerById().then(data => setcustomer(data.customer)).catch(err => console.log(err));
        getcustomerBooking().then(data => setBooking(data.book)).catch(err => console.log(err));

    }, [])

    // const activebookings = booking.filter((booking) => booking.is_deleted === false);
    return (
        <div className='customerdetails-box'>
            <div className='customerdetails-profilepicture'>
                <IoPersonSharp />
            </div>
            <div className='customerdetails-whitebox'>
                <div className='customerdetails-details'>
                    <div className='admindetails-title'><span>YOUR DETAILS</span>
                        <span className='admindetails-underline' ></span>
                    </div>
                    <div className='customerdetails-persondetails'>
                        <h1 style={{ color: "#1e3249" }}><span>Name: {customer.first_name} {customer.last_name}</span></h1>
                        <h1 style={{ color: "#1e3249" }}> <span>Email: {customer.email}</span></h1>
                        <h1 style={{ color: "#1e3249" }}> <span>Contact Number: {customer.contact_number}</span></h1>
                    </div>
                    <div className='table-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Movie</th>
                                    <th>Theater</th>
                                    <th>Seats</th>
                                    <th>Date</th>
                                    {/* <th>  </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {booking.map((data, index) =>
                                    <tr key={index}>
                                        <td>{data.movieId.name}</td>
                                        <td>{data.theaterid.name}</td>
                                        <td>{data.seats.join(', ')}</td>
                                        <td>{data.date}</td>
                                        {/* <td><div className='customerdetails-delete-icon' style={{ color: "#1e3249" }} onClick={deleteBooking(data._id)}><MdDeleteForever /></div></td> */}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default CustomerDetails;