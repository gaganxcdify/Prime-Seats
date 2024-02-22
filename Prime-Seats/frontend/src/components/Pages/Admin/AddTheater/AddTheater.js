import "./AddTheater.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddTheater = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    location: "",
    cityname: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCityChange = (seletedOption) => {
    const selectedCityId = seletedOption.id;
    setSelectedCity(seletedOption.id);
    setInputs((prevInputs) => ({
      ...prevInputs,

      cityId: selectedCityId,
    }));
  };
  console.log(inputs);

  const addTheater = async (cityId) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/theater/",
        {
          cityid: cityId,
          name: inputs.name,
          location: inputs.location,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const data = res.data;
      setMessage("Theater added");
      alert(message);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/city/");
        const citiesData = response.data.cities.map((city) => city);
        console.log(citiesData);
        setCities(citiesData);
        if (!selectedCity && citiesData.length > 0) {
          setSelectedCity(citiesData[0]._id);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const cityDetails = selectedCity;

    if (cityDetails) {
      const cityId = cityDetails;
      console.log(cityId);
      await addTheater(cityId);

      navigate("/homepage");
    } else {
      alert("City does not exist");
      navigate("/homepage");
      console.log("City does not exist");
      setMessage("City does not exist");
      alert(message);
      return;
    }
  };

  return (
    <form className="addtheater-container" onSubmit={handleSubmit}>
      <div className="addtheater-header">
        <div className="addtheater-text">Add Theater</div>
        <div className="addtheater-underline"></div>
      </div>
      <div className="addtheater-inputs">
        {/* <Select
          options={cities.map((city, index) => ({
            value: city.name,
            label: city.name,
            id: city._id,
          }))}
          onChange={handleCityChange}
          className="addtheater-input-select"
        /> */}
        <Select
          options={cities.map((city, index) => ({
            value: city.name,
            label: city.name,
            id: city._id,
          }))}
          onChange={handleCityChange}
          className="addtheater-input-select" // Apply the same class as name and location inputs
          styles={{ // Define custom styles for the select input
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
        />
        <input
          className="addtheater-input"
          type="text"
          name="name"
          placeholder="  Name"
          value={inputs.name}
          onChange={handleChange}
        />
        <input
          className="addtheater-input"
          type="text"
          name="location"
          placeholder="  Location"
          value={inputs.location}
          onChange={handleChange}
        />
        <div className="addtheater-submit-container">
          <button type="submit" className="addtheater-submit">
            ADD
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTheater;
