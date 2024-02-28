// import React from 'react';
// import "./SummaryPage.css";
// import { useParams } from 'react-router-dom';

// const SummaryPage = () => {
//   const { movieid, theaterid, timeslotid, selectedSeats } = useParams();

//   return (
//     <div className='summary-bigbox'>
//       <div className='summary-header'>
//         <p className="summary-movie-name">MovieName</p>
//         <p className="summary-theater-name">TheaterName</p>
//         <p className="summary-timeslot">Timeslot</p>
//       </div>
//       <div className='summary-details'>
//         <p className="summary-selected-seats">Selected seats: a1, a2</p>
//         <p className="summary-amount">Amount</p>
//         <button className="summary-pay-button">PAY</button>
//       </div>
//     </div>
//   );
// }

// export default SummaryPage;


import React, { useState, useEffect } from 'react';
import "./SummaryPage.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SummaryPage = () => {
  const { movieid, theaterid, timeslotid, selectedSeats } = useParams();
  const [movieName, setMovieName] = useState('');
  const [theaterName, setTheaterName] = useState('');
  const [timeslot, setTimeslot] = useState('');
  const seats = selectedSeats.split(",").length
  console.log(seats)
  console.log({ movieid, theaterid, timeslotid, selectedSeats })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/theater/${theaterid}/${movieid}/${timeslotid}`);
        const { theaterdata } = response.data;
        if (theaterdata) {
          const { name: theaterName, movies, timeslots } = theaterdata;
          setTheaterName(theaterName);
          const movie = movies.find(movie => movie._id === movieid);
          const timeslot = timeslots.find(timeslot => timeslot._id === timeslotid);
          if (movie) setMovieName(movie.name);
          if (timeslot) setTimeslot(timeslot.startTime);
        }
      } catch (error) {
        console.error('Error fetching theater data:', error);
      }
    };
    fetchData();
  }, [movieid, theaterid, timeslotid]);

  return (
    <div className='summary-bigbox'>
      <div className='summary-header'>
        <p className="summary-movie-name">MovieName: {movieName}</p>
        <p className="summary-theater-name">TheaterName: {theaterName}</p>
        <p className="summary-timeslot">Timeslot: {timeslot}</p>
      </div>
      <div className='summary-details'>
        <p className="summary-selected-seats">Selected seats: {selectedSeats}</p>
        <p className="summary-amount">AMOUNT PER TICKET:150</p>
        <p className="summary-amount">TOTAL AMOUNT:{seats * 150}</p>
        <button className="summary-pay-button">PAY</button>
      </div>
    </div>
  );
}

export default SummaryPage;
