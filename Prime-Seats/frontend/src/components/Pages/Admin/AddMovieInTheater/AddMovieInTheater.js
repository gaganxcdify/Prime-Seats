import "./AddMovieInTheater.css";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import Select from "react-select";
const AddMovieInTheater = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [theater, setTheater] = useState([]);
  const [message, setMessage] = useState("");
  const [movies, setMovies] = useState("");
  const [timeSlot, setTimeSlot] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [inputs, setInputs] = useState({});

  const addMovieToTimeSlot = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/BookedSeatsOfTimeslot/timeSlots`,
        {
          city: inputs?.city,
          movie: inputs?.movie,
          date: inputs?.posted_date,
          theaters: inputs?.theaters,
          timeSlot: inputs?.timeSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const data = res.data;
      setMessage(data.message);
      alert(message);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTheater = theater
    ? theater.filter((t) => t.cityid === selectedCity)
    : [];

  useEffect(() => {
    const fetchTheaterData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/theater`);
        const theaterDetails = response.data.theaters;
        setTheater(theaterDetails);
      } catch (error) {
        console.error("Error fetching city details:", error);
      }
    };
    fetchTheaterData();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/city/");
        const citiesData = response.data.cities.map((city) => city);

        setCities(citiesData);
        if (!selectedCity && citiesData.length > 0) {
          setSelectedCity(citiesData[0]);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get("http://localhost:5000/movie/");
        const movieData = response.data.movies;
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchMovie();
  }, []);

 
    const fetchTimeSlot = async (theaterId) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/timeslots/${theaterId}`
        );
        const timeSlotData = response.data;
        const allTimeSlots = timeSlotData
          ?.map((slotObject) => slotObject)
        // const allTimeSlots = timeSlotData
        //   ?.map((slotObject) => slotObject.slot)
        //   .flat();

        setTimeSlot(allTimeSlots);
      } catch (err) {
        console.error("Error fetching TimeSlot:", err);
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addMovieToTimeSlot();
    // navigate("/homepage");
  };
  const handleCityChange = (selectedOptions) => {
    const selectedCities = selectedOptions.id;
    setSelectedCity(selectedCities);
    setInputs((prev) => ({ ...prev, city: selectedCities }));
  };

  const handleTheaterChange = async (selectedOptions) => {
    const selectedTheaters = selectedOptions.value;
    console.log(selectedTheaters);
   setInputs((prev) => ({ ...prev, theaters: selectedTheaters }));

   fetchTimeSlot(selectedTheaters);
  };
  console.log(timeSlot);
  console.log(inputs.timeSlot);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handelTimeSlot = (selectedOptions) => {
    const selectedTimeSlot = selectedOptions.map(option => option.id);
    console.log(selectedTimeSlot);
  
    setInputs((prev) => ({ ...prev, timeSlot: selectedTimeSlot }));
  };
  
  const handelMovieChange = (selectedMovie) => {
   
    setInputs((prev) => ({
      ...prev,
      movie: selectedMovie,
    }));
  };
console.log(inputs)
  return (
    <form className="addmovieintheater-container" onSubmit={handleSubmit}>
      <div className="addmovieintheater-header">
        <div className="addmovieintheater-text">Add Movie to Timeslot</div>
        <div className="addmovieintheater-underline"></div>
      </div>
      <div>
        <label> Cities:</label>
        <Select
          // isMulti
          options={cities.map((city, index) => ({
            value: city.name,
            label: city.name,
            id: city._id,
          }))}
          onChange={handleCityChange}
          className="select-input"
        />
      </div>
      <div>
        <label> Theaters:</label>
        <Select
          // isMulti
          options={filteredTheater.map((theaterItem, index) => ({
            value: theaterItem._id,
            label: theaterItem.name,
            id: theaterItem._id,
          }))}
          onChange={handleTheaterChange}
          className="select-input"
        />
      </div>
      <div>
        <label className="date-input">Movie adding Date:</label>
        <div className="date-input">
          <div className="date-input-container">
            <input
              type="date"
              name="posted_date"
              value={inputs.release_date}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div>
        <label> Time Slots:</label>
        <Select
          isMulti
          options={timeSlot.map((slots) => ({
            id: slots._id,
            value: slots.slot,
            label: slots.slot,
          }))}
          onChange={handelTimeSlot}
          className="addmovieintheater-input"
        />
      </div>
      <div>
        <label> Movie</label>
        <Select
          options={
            movies &&
            movies
              .filter((movie) => movie.is_active) // Filter only active movies
              .map((movie, index) => ({
                id: movie._id,
                value: movie.name,
                label: movie.name,
              }))
          }
          onChange={handelMovieChange}
          className="addmovieintheater-input"
        />
      </div>
      <div className="addmovieintheater-inputs">
        <div className="addmovieintheater-submit-container">
          <button type="submit" className="addmovieintheater-submit">
            ADD
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddMovieInTheater;
