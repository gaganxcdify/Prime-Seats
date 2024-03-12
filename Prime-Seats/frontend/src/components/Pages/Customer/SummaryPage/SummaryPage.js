import React, { useState, useEffect } from 'react';
import "./SummaryPage.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout'


const KEY = "pk_test_51OokXXSIHGmlXgjD2RBw8YHoq6s6He6UB3hyY2qpCcXLv2iLQQKdOLoS7Aa4TVkTsdJMbZW7MG3mNDC9e7JJNG1Y00M1Rz70sm"


const SummaryPage = () => {
  const { movieid, theaterid, timeslotid, selectedSeats } = useParams();
  const [movieName, setMovieName] = useState('');
  const [theaterName, setTheaterName] = useState('');
  const [timeslot, setTimeslot] = useState('');
  const [stripeToken, setStripeToken] = useState(null);
  const seats = selectedSeats.split(",").length

  console.log({ movieid, theaterid, timeslotid, selectedSeats })

  const onToken = (token) => {
    setStripeToken(token)
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:5000/payment/payment", {
          tokenId: stripeToken.id,
          amount: totalamount,
        })
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    stripeToken && makeRequest()
  }, [stripeToken])


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
  const totalamount = seats * 150
  return (
    <div className='summary-bigbox'>
      <div className='summary-header'>
        <p className="summary-movie-name">MovieName: {movieName}</p>
        <p className="summary-theater-name">TheaterName: {theaterName}</p>
        <p className="summary-timeslot">Timeslot: {timeslot}</p>
      </div>
      <div className='summary-details'>
        <p className="summary-selected-seats">Selected seats: {selectedSeats}</p>
        <p className="summary-amount">AMOUNT PER TICKET:&#8377;150</p>
        <p className="summary-amount">TOTAL AMOUNT:&#8377;{totalamount}</p>
        <StripeCheckout name="Primeseats" amount={totalamount * 100} token={onToken} stripeKey={KEY} currency='INR'>
          <button className="summary-pay-button">PAY</button>
        </StripeCheckout>
      </div>
    </div>
  );
}

export default SummaryPage;
