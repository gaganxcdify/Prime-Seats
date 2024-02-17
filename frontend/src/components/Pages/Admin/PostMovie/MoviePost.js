import "./MoviePost.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
const MoviePost = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [theater, setTheater] = useState([]);
  const [message, setMessage] = useState("");
  const [movies, setMovies] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);
  const [inputs, setInputs] = useState({
   
  });

  const addMovieToTimeSlot = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/timeslot/",
        {
          city: inputs.city,
          movie: inputs.movie,
          theaters: inputs.theater,
          timeSlot: inputs.timeSlot,
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
    ? theater.filter((t) => selectedCity.includes(t.cityid))
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
        console.log(citiesData);
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
        const movieData = response.data.movies
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchMovie();
  }, []);

  console.log(movies);
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addMovieToTimeSlot();
    navigate("/homepage");
  };
  const handleCityChange = (selectedOptions) => {
    const selectedCities = selectedOptions.map((option) => option.id);
    setSelectedCity(selectedCities);
    setInputs((prev) => ({ ...prev, city: selectedCities }));
  };

  const handleTheaterChange = (selectedOptions) => {
    const selectedTheaters = selectedOptions.map((option) => option.value);
    setInputs((prev) => ({ ...prev, theaters: selectedTheaters }));
  };

  const handelTimeSlot = (selectedOptions) => {
    const selectedTimeSlot = selectedOptions.map((option) => option.value);
    setInputs((prev) => ({ ...prev, timeSlot: selectedTimeSlot }));
  };
  const handelMovieChange = (selectedMovie) => {
    setInputs((prev) => ({
      ...prev,
      movie: selectedMovie,
    }));
  };
  console.log(inputs);

  return (
    <form className="addtheater-container" onSubmit={handleSubmit}>
      <div className="addtheater-header">
        <div className="addtheater-text">Add Movie to Timeslot</div>
        <div className="addtheater-underline"></div>
      </div>
      <div>
        <label> Cities:</label>
        <Select
          isMulti
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
          isMulti
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
        <label> Time Slots:</label>
        <Select
          isMulti
          options={[
            { value: "theater1", label: "TImeSlot 1" },
            { value: "theater2", label: "Theater 2" },
            // Add more options as needed
          ]}
          onChange={handelTimeSlot}
          className="select-input"
        />
      </div>
      <div>
        <label> Movie</label>
        <Select
          options={
            movies &&
            movies.map((movie, index) => ({
              value: movie._id,
              label: movie.name,
            }))
          }
          onChange={handelMovieChange}
          className="select-input"
        />
      </div>
      <div className="addtheater-inputs">
        <div className="addtheater-submit-container">
          <button type="submit" className="addtheater-submit">
            ADD
          </button>
        </div>
      </div>
    </form>
  );
};

export default MoviePost;
