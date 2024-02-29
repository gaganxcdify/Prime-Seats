import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux';
import "./Bookings.css";

const Booking = () => {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [theaters, setTheaters] = useState([]);
  const [movie, setMovie] = useState();
  const { movieid, cityid } = useParams();
  // const selectedCity = useSelector((state) => state.city.cityName);
  const getMovieDetails = async (movieid) => {
    try {
      const res = await axios.get(`http://localhost:5000/movie/${movieid}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieDetails(movieid)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [movieid]);


  const getTheaters = async (cityid, movieid) => {
    try {
      const res = await axios.get(`http://localhost:5000/theater/${cityid}/${movieid}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTheaters(cityid, movieid)
      .then((res) => {
        setTheaters(res.theaters)
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [cityid, movieid]);


  useEffect(() => {
    const today = new Date();
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);
    const minDateString = today.toISOString().split('T')[0];
    const maxDateString = threeDaysLater.toISOString().split('T')[0];
    setMinDate(minDateString);
    setMaxDate(maxDateString);
    setSelectedDate(minDateString); // Set initial selected date
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value); // Update selected date
  };

  return (
    <div>
      <div className='moviedetail-card moviedetail-theatersform'>
        <div className='bookings-date-input'>
        <input type='date' className='bookings-date' min={minDate} max={maxDate} value={selectedDate} onChange={handleDateChange} />

        </div>
        {theaters.map((theater) => (
          <div className='bookings-theaterdetails' key={theater._id}>
            <h3>{theater.name}</h3>
            <div className='bookings-timeslots'>
              {theater.timeslots.map((timeslot) => (
                <button key={timeslot._id} className='booking-button'>
                  <NavLink className='booking-timeslot-button' to={`/selectseats/${movieid}/${theater._id}/${timeslot._id}/selecteddate=${selectedDate}`}>
                    {timeslot.slot}
                  </NavLink>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
