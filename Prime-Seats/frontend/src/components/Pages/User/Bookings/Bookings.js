import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import axios from "axios";
import "./Bookings.css"

const Booking = () => {
  const theaters = ["PVR", 'INOX', 'Cinepolis', "movietime"]
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  // const [movie, setMovie] = useState()
  // const id = useParams().id;

  // const getMovieDetails = async (id) => {
  //   const res = await axios
  //     .get(`http://localhost:5000/movie/${id}`)
  //     .catch((err) => console.log(err));

  //   if (res.status !== 200) {
  //     return console.log("Unexpected Error");
  //   }
  //   const resData = await res.data;
  //   return resData;
  // };

  // useEffect(() => {
  //   getMovieDetails(id)
  //     .then((res) => setMovie(res.movie))
  //     .catch((err) => console.log(err))
  // }, [id])
  useEffect(() => {
    const today = new Date();
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);

    // Format min and max dates for input element
    const minDateString = today.toISOString().split('T')[0];
    const maxDateString = threeDaysLater.toISOString().split('T')[0];

    setMinDate(minDateString);
    setMaxDate(maxDateString);
  }, []);

  return (
    <div className='moviedetail'>
      <div className='moviedetail-card  moviedetail-moviedetail'>
        <span>NAME</span>
        <img src="www.dftgh.com" alt="image" />
        <span>NAME</span>
        <span>Genre</span>
        <span>ReleaseDate</span>
        <span>language</span>
      </div>
      <div className='moviedetail-card moviedetail-theatersform'>
        <input type='date' min={minDate} max={maxDate} />
        <div className='bookings-theaterdetails'>
          <h3>name</h3>
          <button className="">
            <NavLink to="/selectseats">
              12:00
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Booking;

