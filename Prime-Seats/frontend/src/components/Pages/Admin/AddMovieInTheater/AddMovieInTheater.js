import "./AddMovieInTheater.css";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import Select from "react-select";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";


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
          movie: inputs?.movie,
          startdate: inputs?.startdate,
          enddate: inputs?.enddate,
          theaterId: inputs?.theaters,
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

      setTimeSlot(allTimeSlots);
    } catch (err) {
      console.error("Error fetching TimeSlot:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMovieToTimeSlot();
    navigate("/homepage");

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

  const handelMovieChange = (selectedOptions) => {
    const selectedMovie = selectedOptions.id
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
      <div className="addmovieintheater-inputs">
        <div>
          <Select
            styles={{
              control: (provided) => ({
                ...provided,
                height: "50px",
                width: "480px",
                backgroundColor: "#eaeaea",
                borderRadius: "6px",
                boxShadow: "0px 1px 2px 0px rgb(91, 91, 91)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#e94539" : "#eaeaea",
                color: state.isSelected ? "#fff" : "#323333",
                cursor: "pointer",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#323333",
                fontSize: "19px",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: "#323333",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
            }}
            className="addmovieintheater-input"
            placeholder="Select City"
            options={cities.map((city, index) => ({
              value: city.name,
              label: city.name,
              id: city._id,
            }))}
            onChange={handleCityChange}
          />
        </div>
        <div>
          <Select
            styles={{
              control: (provided) => ({
                ...provided,
                height: "50px",
                width: "480px",
                backgroundColor: "#eaeaea",
                borderRadius: "6px",
                boxShadow: "0px 1px 2px 0px rgb(91, 91, 91)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#e94539" : "#eaeaea",
                color: state.isSelected ? "#fff" : "#323333",
                cursor: "pointer",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#323333",
                fontSize: "19px",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: "#323333",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
            }}
            className="addmovieintheater-input"

            placeholder="Select Theater"
            options={filteredTheater.map((theaterItem, index) => ({
              value: theaterItem._id,
              label: theaterItem.name,
              id: theaterItem._id,
            }))}
            onChange={handleTheaterChange}
          />
        </div>
        <div className="addmovieintheater-input-date">
          <label className='addmovieintheater-label-date'>Movie Starting Date:</label>
          <input type="date" name="startdate" onChange={handleChange} />
        </div>
        <div className="addmovieintheater-input-date">
          <label className='addmovieintheater-label-date'>Movie End Date:</label>
          <input type="date" name="enddate" onChange={handleChange} />
        </div>
        <div>
          <Select
            styles={{
              control: (provided) => ({
                ...provided,
                height: "50px",
                width: "480px",
                backgroundColor: "#eaeaea",
                borderRadius: "6px",
                boxShadow: "0px 1px 2px 0px rgb(91, 91, 91)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#e94539" : "#eaeaea",
                color: state.isSelected ? "#fff" : "#323333",
                cursor: "pointer",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#323333",
                fontSize: "19px",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: "#323333",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
            }}
            className="addmovieintheater-input"
            placeholder="Select Timeslots"
            isMulti
            options={timeSlot.map((slots) => ({
              id: slots._id,
              value: slots.slot,
              label: slots.slot,
            }))}
            onChange={handelTimeSlot}
          // className="addmovieintheater-input"
          />
        </div>
        <div>

          <Select
            styles={{
              control: (provided) => ({
                ...provided,
                height: "50px",
                width: "480px",
                backgroundColor: "#eaeaea",
                borderRadius: "6px",
                boxShadow: "0px 1px 2px 0px rgb(91, 91, 91)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#e94539" : "#eaeaea",
                color: state.isSelected ? "#fff" : "#323333",
                cursor: "pointer",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#323333",
                fontSize: "19px",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: "#323333",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
            }}
            placeholder="Select Movie"
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
      </div>
      <div className="addmovieintheater-inputs">
        <div className="addmovieintheater-submit-container">
          <button type="submit" className="addmovieintheater-submit">
            ADD
          </button>
          <ToastContainer position="bottom-right" />
        </div>
      </div>
    </form>
  );
};

export default AddMovieInTheater;
