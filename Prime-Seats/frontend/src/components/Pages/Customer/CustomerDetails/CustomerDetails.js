// import React, { useEffect, useState } from 'react';
// import { IoPersonSharp } from 'react-icons/io5';
// import './CustomerDetails.css';
// import { MdDownload } from 'react-icons/md';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import { Link } from 'react-router-dom';

// const CustomerDetails = () => {
//     const [customer, setCustomer] = useState([]);
//     const [booking, setBooking] = useState([]);

//     const getCustomerById = async () => {
//         const id = sessionStorage.getItem('customerId');
//         const res = await axios.get(`http://localhost:5000/customer/${id}`).catch((err) => console.log(err));
//         if (res.status !== 200) {
//             return console.log('Unexpected Error');
//         }
//         const resData = await res.data;
//         return resData;
//     };

//     const getCustomerBooking = async () => {
//         const id = sessionStorage.getItem('customerId');
//         const res = await axios.get(`http://localhost:5000/booking/${id}`).catch((err) => console.log(err));

//         if (res.status !== 200) {
//             return console.log('Unexpected error');
//         }
//         const resData = await res.data;
//         return resData;
//     };

//     const generatePDFContent = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(22);
//         doc.setFont('helvetica', 'bold');
//         doc.text(`Name: ${customer.first_name} ${customer.last_name}`, 10, 20);
//         doc.setFontSize(16);
//         doc.setFont('helvetica', 'normal');
//         doc.text(`Email: ${customer.email}`, 10, 30);
//         doc.text(`Contact Number: ${customer.contact_number}`, 10, 40);
//         doc.setFontSize(18);
//         doc.setFont('helvetica', 'bold');
//         doc.text('Bookings:', 10, 60);
//         let y = 70;
//         booking.filter((data) => !data.is_deleted).forEach((data) => {
//             doc.setFontSize(14);
//             doc.setFont('helvetica', 'normal');
//             doc.text(`Movie: ${data.movieId.name}`, 10, y);
//             doc.text(`Theater: ${data.theaterid.name}`, 10, y + 10);
//             doc.text(`Seats: ${data.seats.join(', ')}`, 10, y + 20);
//             doc.text(`Date: ${data.date}`, 10, y + 30);
//             y += 50;
//         });
//         return doc;
//     };



//     const downloadPDF = () => {
//         const doc = generatePDFContent();
//         doc.save('booking_details.pdf');
//     };

//     useEffect(() => {
//         getCustomerById()
//             .then((data) => setCustomer(data.customer))
//             .catch((err) => console.log(err));
//         getCustomerBooking()
//             .then((data) => setBooking(data.book))
//             .catch((err) => console.log(err));
//     }, []);

//     return (
//         <div className='customerdetails-box'>
//             <div className='customerdetails-profilepicture'>
//                 <IoPersonSharp />
//             </div>
//             <div className='customerdetails-whitebox'>
//                 <div className='customerdetails-details'>
//                     <div className='admindetails-title'>
//                         <span>YOUR DETAILS</span>
//                         <span className='admindetails-underline'></span>
//                     </div>
//                     <div className='customerdetails-persondetails'>
//                         <h1 style={{ color: '#1e3249' }}>
//                             <span>Name: {customer.first_name} {customer.last_name}</span>
//                         </h1>
//                         <h1 style={{ color: '#1e3249' }}> <span>Email: {customer.email}</span></h1>
//                         <h1 style={{ color: '#1e3249' }}> <span>Contact Number: {customer.contact_number}</span></h1>
//                     </div>
//                     {booking.some((data) => !data.is_deleted) ? (
//                         <div className='table-container'>
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>Movie</th>
//                                         <th>Theater</th>
//                                         <th>Seats</th>
//                                         <th>Date</th>
//                                         <th>  </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {booking.map((data, index) => (
//                                         data.is_deleted === false && (
//                                             <tr key={index}>
//                                                 <td>{data.movieId.name}</td>
//                                                 <td><a href={data.theaterid.location} target="_blank">{data.theaterid.name}</a></td>
//                                                 <td>{data.seats.join(', ')}</td>
//                                                 <td>{data.date}</td>

//                                                 <td>
//                                                     <div className='customerdetails-delete-icon' style={{ color: '#1e3249', cursor: 'pointer' }} onClick={downloadPDF}>
//                                                         <MdDownload />
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         )
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     ) : (
//                         <div>No bookings found</div>
//                     )}
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default CustomerDetails;


import React, { useEffect, useState } from 'react';
import { IoPersonSharp } from 'react-icons/io5';
import './CustomerDetails.css';
import { MdDownload } from 'react-icons/md';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

const CustomerDetails = () => {
    const [customer, setCustomer] = useState([]);
    const [booking, setBooking] = useState([]);

    const getCustomerById = async () => {
        const id = sessionStorage.getItem('customerId');
        const res = await axios.get(`http://localhost:5000/customer/${id}`).catch((err) => console.log(err));
        if (res.status !== 200) {
            return console.log('Unexpected Error');
        }
        const resData = await res.data;
        return resData;
    };

    const getCustomerBooking = async () => {
        const id = sessionStorage.getItem('customerId');
        const res = await axios.get(`http://localhost:5000/booking/${id}`).catch((err) => console.log(err));

        if (res.status !== 200) {
            return console.log('Unexpected error');
        }
        const resData = await res.data;
        return resData;
    };

    const generatePDFContent = (bookingId) => {
        const selectedBooking = booking.find(data => data._id === bookingId);
        if (!selectedBooking) return;

        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text(`Name: ${customer.first_name} ${customer.last_name}`, 10, 20);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.text(`Email: ${customer.email}`, 10, 30);
        doc.text(`Contact Number: ${customer.contact_number}`, 10, 40);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('Booking Details:', 10, 60);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(`Movie: ${selectedBooking.movieId.name}`, 10, 70);
        doc.text(`Theater: ${selectedBooking.theaterid.name}`, 10, 80);
        doc.text(`Seats: ${selectedBooking.seats.join(', ')}`, 10, 90);
        doc.text(`Date: ${selectedBooking.date}`, 10, 100);

        return doc;
    };

    const downloadPDF = (bookingId) => {
        const doc = generatePDFContent(bookingId);
        doc.save('booking_details.pdf');
    };

    useEffect(() => {
        getCustomerById()
            .then((data) => setCustomer(data.customer))
            .catch((err) => console.log(err));
        getCustomerBooking()
            .then((data) => setBooking(data.book))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className='customerdetails-box'>
            <div className='customerdetails-profilepicture'>
                <IoPersonSharp />
            </div>
            <div className='customerdetails-whitebox'>
                <div className='customerdetails-details'>
                    <div className='admindetails-title'>
                        <span>YOUR DETAILS</span>
                        <span className='admindetails-underline'></span>
                    </div>
                    <div className='customerdetails-persondetails'>
                        <h1 style={{ color: '#1e3249' }}>
                            <span>Name: {customer.first_name} {customer.last_name}</span>
                        </h1>
                        <h1 style={{ color: '#1e3249' }}> <span>Email: {customer.email}</span></h1>
                        <h1 style={{ color: '#1e3249' }}> <span>Contact Number: {customer.contact_number}</span></h1>
                    </div>
                    {booking.some((data) => !data.is_deleted) ? (
                        <div className='table-container'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Movie</th>
                                        <th>Theater</th>
                                        <th>Seats</th>
                                        <th>Date</th>
                                        <th>  </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {booking.map((data, index) => (
                                        data.is_deleted === false && (
                                            <tr key={index}>
                                                <td>{data.movieId.name}</td>
                                                <td><a href={data.theaterid.location} target="_blank">{data.theaterid.name}</a></td>
                                                <td>{data.seats.join(', ')}</td>
                                                <td>{data.date}</td>

                                                <td>
                                                    <div className='customerdetails-delete-icon' style={{ color: '#1e3249', cursor: 'pointer' }} onClick={() => downloadPDF(data._id)}>
                                                        <MdDownload />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>No bookings found</div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CustomerDetails;
