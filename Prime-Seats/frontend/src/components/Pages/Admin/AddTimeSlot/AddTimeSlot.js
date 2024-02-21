import "./AddTimeSlot.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddTimeSlot = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [filteredTheater, setFilteredTheater] = useState([]);
  const [theater, setTheater] = useState([]);
  const [timeSlotsInput, setTimeSlotsInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/city/");
        setCities(response.data.cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchTheaterData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/theater`);
        const theaterDetails = response.data.theaters;
        setTheater(theaterDetails);
        console.log(theaterDetails);
      } catch (error) {
        console.error("Error fetching city details:", error);
      }
    };
    fetchTheaterData();
  }, []);
  console.log(theater)
  const handleTheaterChange = (selectedOption) => {
    setSelectedTheater(selectedOption);
  };
  console.log(selectedCity);

  //    const filter = theater
  //   ? theater.filter((t) => t.cityid === selectedCity.value)
  //   : [];
  //   console.log(filter)

  // //   setFilteredTheater(filter) //maiking infinite loop

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    const filteredTheaters = theater.filter((t) => t.cityid === selectedOption.value);
    setFilteredTheater(filteredTheaters);
  };
  console.log(filteredTheater)

  const handleTimeSlotsInputChange = (event) => {
    setTimeSlotsInput(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/timeslot/${selectedTheater.value}`,
        {
          // city: selectedCity.value,
          theater: selectedTheater.value,
          timeSlots: timeSlotsInput.split(",").map((slot) => slot.trim()), // Split input by comma and trim spaces
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setMessage(res.data.message);
      navigate("/homepage");
    } catch (error) {
      console.error("Error adding movie to time slot:", error);
    }
  };

  return (
    <form className="addtimeslot-container" onSubmit={handleSubmit}>
      <div className="addtimeslot-header">
        <div className="addtimeslot-text">Add Movie to Time Slot</div>
        <div className="addtimeslot-underline"></div>
      </div>
      <div>
        <label>City:</label>
        <Select
          options={cities.map((city) => ({
            value: city._id,
            label: city.name,
          }))}
          onChange={handleCityChange}
        />
      </div>
      <div>
        <label>Theater:</label>
        <Select
          options={filteredTheater?.map((theater) => ({
            value: theater._id,
            label: theater.name,
          }))}
          onChange={handleTheaterChange}
        />
      </div>
      <div>
        <label>Time Slots:</label>
        <input
          type="text"
          value={timeSlotsInput}
          onChange={handleTimeSlotsInputChange}
          placeholder="Separate by commas (e.g., 10:00 AM, 2:00 PM, 5:00 PM)"
          required
          className="addTime-input"
        />
      </div>
      <div className="addtimeslot-inputs">
        <div className="addtimeslot-submit-container">
          <button type="submit" className="addtimeslot-submit">
            ADD
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTimeSlot;
