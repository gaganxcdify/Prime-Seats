// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Moviecard from "../MovieCard/Moviecard";
// import "./HomePage.css";
// import { useSelector } from "react-redux";

// const HomePage = () => {
//     const isAdmin = useSelector((state) => state.setlogin.isAdmin);
//     const [movies, setMovies] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [selectedCity, setSelectedCity] = useState("");

//     const getAllmovies = async () => {
//         try {
//             const res = await axios.get("http://localhost:5000/movie");
//             if (res.status === 200) {
//                 return res.data.movies;
//             } else {
//                 console.log("No data");
//                 return [];
//             }
//         } catch (err) {
//             console.log(err);
//             return [];
//         }
//     };
//     useEffect(() => {
//         const fetchCities = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/city/");
//                 const citiesData = response.data.cities.map(city => city.name);
//                 setCities(citiesData);
//             } catch (error) {
//                 console.error("Error fetching cities:", error);
//             }
//         };

//         fetchCities();
//     }, []);

//     const handleCityChange = (event) => {
//         setSelectedCity(event.target.value);
//     };
//     useEffect(() => {
//         getAllmovies()
//             .then((data) => setMovies(data))
//             .catch((err) => console.log(err));
//     }, []);

//     const activeMovies = movies.filter((movie) => movie.is_active === true);
//     return (
//         <>
//             <div className="homepage-dropdown">
//                 {!isAdmin && (
//                     <div>
//                         <select value={selectedCity} onChange={handleCityChange}>
//                             {cities.map((city, index) => (
//                                 <option key={index} value={city}>{city}</option>
//                             ))}
//                         </select>
//                     </div>
//                 )}

//             </div>
//             <div className="home">
//                 {activeMovies.map((movie) => (
//                     <Moviecard
//                         key={movie._id}
//                         id={movie._id}
//                         name={movie.name}
//                         genre={movie.genre}
//                         image={movie.image}
//                         releasedate={movie.releaseDate}
//                         city={movie.city}
//                         posterurl={movie.posterurl}
//                     />
//                 ))}
//             </div>
//         </>

//     );
// };

// export default HomePage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Moviecard from "../MovieCard/Moviecard";
import "./HomePage.css";
import { useSelector } from "react-redux";
import Select from "react-select";

const HomePage = () => {
  const isAdmin = useSelector((state) => state.setlogin.isAdmin);
  const [movies, setMovies] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const getAllmovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movie");
      if (res.status === 200) {
        return res.data.movies;
      } else {
        console.log("No data");
        return [];
      }
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/city/");
        const citiesData = response.data.cities.map((city) => city);
        setCities(citiesData);
        if (!selectedCity && citiesData.length > 0) {
          setSelectedCity(citiesData[0].name);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [selectedCity]);

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  useEffect(() => {
    getAllmovies()
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);

  const activeMovies = movies.filter((movie) => movie.is_active === true);

  return (
    <>{!isAdmin &&
      <div>
      <label> Cities:</label>
      <Select
        
        options={cities.map((city, index) => ({
          value: city.name,
          label: city.name,
          id: city._id,
        }))}
        onChange={handleCityChange}
        value={{ value: selectedCity, label: selectedCity }}
      
        className="select-input"
      />
    </div>
    

    //   <div className="select-container">
    //     <select
    //       className="select-dropdown"
    //       value={selectedCity}
    //       onChange={handleCityChange}
    //       >
    //       {cities.map((city, index) => (
    //         <option key={index} value={city}>
    //           {city}
    //         </option>
    //       ))}
    //     </select>
    //   </div>
        }

      <div className="home">
        {activeMovies.map((movie) => ( movie.is_active
        &&
          <Moviecard
            key={movie._id}
            id={movie._id}
            name={movie.name}
            genre={movie.genre}
            image={movie.image}
            releasedate={movie.releaseDate}
            city={selectedCity || cities[0]}
            posterurl={movie.posterurl}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;