import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux';
import "./Bookings.css";

const Booking = () => {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const [theaters, setTheaters] = useState([]);
  const [allTheters , setAlltheaters] = useState([])
  const [movie, setMovie] = useState();
  const { movieid, cityid } = useParams();

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
  }, []);


  const getTheaters = async (cityid, movieid) => {
    try {
      const res = await axios.get(`http://localhost:5000/theater/${cityid}/${movieid}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getTimeslotsByTheater = async (theaterid) => {
    try {
      const res = await axios.get(`http://localhost:5000/BookedSeatsOfTimeslot/gettimeslotbymovieandtheater/${movieid}/${theaterid}`);
      console.log(res.data);
      return res.data.timeslots;
    } catch (error) {
      console.log(error);
      return [];
    }
  };


  useEffect(() => {
    const today = new Date();
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 6);
    const minDateString = today.toISOString().split('T')[0];
    setMinDate(minDateString);
    setSelectedDate(minDateString);
  }, []);


  let getIdsForSelectedDate = useCallback((selectedDate, dateRanges) => {
    let matchingIds = [];
    console.log(selectedDate , dateRanges)
    for (const group of dateRanges) {
        for (const range of group) {
            const startDate = new Date(range.startDate);
            const endDate = new Date(range.endDate);
            const currentDate = new Date(selectedDate);
            
            if (currentDate >= startDate && currentDate <= endDate) {
                matchingIds.push(range.id);
            }
        }
    }
    console.log(matchingIds)
    console.log(allTheters.filter((item) => matchingIds.includes(item._id)))


    setTheaters(allTheters.filter((item) => matchingIds.includes(item._id)))

    return matchingIds;
  } , [selectedDate])

//   function getIdsForSelectedDate(selectedDate, dateRanges) {
//     const matchingIds = [];
    
//     for (const group of dateRanges) {
//         for (const range of group) {
//             const startDate = new Date(range.startDate);
//             const endDate = new Date(range.endDate);
//             const currentDate = new Date(selectedDate);
            
//             if (currentDate >= startDate && currentDate <= endDate) {
//                 matchingIds.push(range.id);
//             }
//         }
//     }
//     console.log(theaters.filter((item) => matchingIds.includes(item._id)))


//     setTheaters(theaters.filter((item) => matchingIds.includes(item._id)))
//     return matchingIds;
// }

  useEffect(() => {
    getTheaters(cityid, movieid)
      .then(async (res) => {
        console.log(res.theaters)
        const theaterTimeslots = await Promise.all(res.theaters.map(theater => getTimeslotsByTheater(theater._id)));

        const updatedTheaters = res.theaters.map((theater, index) => {
          return { ...theater, timeslots: theaterTimeslots[index] };
        });
        //console.log(updatedTheaters)
        setTheaters(updatedTheaters);
        setAlltheaters(updatedTheaters)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {

    let startDate = allTheters?.map((theater) => theater.timeslots.map((item) =>{
      return {
        id: item.theaterId,
        startDate : item.startdate,
        endDate : item.enddate
      }
    }));

    getIdsForSelectedDate(selectedDate, startDate)
  }, [selectedDate])

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <div className='moviedetail-card moviedetail-theatersform'>
        <div className='bookings-date-input'>
          <input type='date' className='bookings-date' min={minDate} value={selectedDate} onChange={handleDateChange} />
        </div>
        <>
        {theaters.length > 0 ? <>
          {theaters.map((theater) => (
          <div className='bookings-theaterdetails' key={theater._id}>
            <h3>{theater.name}</h3>
            <div className='bookings-timeslots'>
              {theater.timeslots.map((time) => (
                <button key={time._id} className='booking-button'>
                  <NavLink className='booking-timeslot-button' to={`/selectseats/${movieid}/${theater._id}/${time.timeslot._id}/${selectedDate}`}>
                    {time.timeslot.slot}
                  </NavLink>
                </button>
              ))}
            </div>
          </div>
        ))}
        </> 
        : 
        <>
        <div>
          <h2>No theaters found</h2>
        </div>
        </>
        }
        </>
     
      </div>
    </div>
  );
};
export default Booking;
