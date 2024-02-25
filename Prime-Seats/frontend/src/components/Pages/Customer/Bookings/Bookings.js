import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux';
import "./Bookings.css";

const Booking = () => {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [movie, setMovie] = useState();
  const { id } = useParams();
  const selectedCity = useSelector((state) => state.city.cityName);
  const getMovieDetails = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/movie/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    const today = new Date();
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);
    const minDateString = today.toISOString().split('T')[0];
    const maxDateString = threeDaysLater.toISOString().split('T')[0];
    setMinDate(minDateString);
    setMaxDate(maxDateString);
  }, []);

  return (
    <div>
      <div className='moviedetail-card moviedetail-theatersform'>
        <input type='date' className='bookings-date' min={minDate} max={maxDate} />
        <div className='bookings-theaterdetails'>
          <h3>theater name</h3>
          <div className='bookings-timeslots'>
            <button className="">
              <NavLink to="/selectseats">
                09:00 AM
              </NavLink>
            </button>
            <button className="">
              <NavLink to="/selectseats">
                12:00 PM
              </NavLink>
            </button>
            <button className="">
              <NavLink to="/selectseats">
                6:00 PM
              </NavLink>
            </button>
            <button className="">
              <NavLink to="/selectseats">
                9:00 PM
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
