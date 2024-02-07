import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";

const Booking = () => {
  const [movie, setMovie] = useState()
  const id = useParams().id;

  const getMovieDetails = async (id) => {
    const res = await axios.get(`http://localhost:5000/movie/${id}`).catch(err => console.log(err));
    if (res.status !== 200) {
      return console.log("No data")
    }
    const resData = await res.data;
    return resData;
  }
  
  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err))
  }, [id])

  return (
    <div>BookTickets</div>
  )
}

export default Booking;