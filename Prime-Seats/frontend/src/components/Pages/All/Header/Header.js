import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Header.css"
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import logo from "./logo/Prime seats-01.png"
import { adminActions, cityActions, homePageActions, movieActions, personActions } from '../../../../store/index';
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const Header = () => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedMovie, setSelectedMovie] = useState("");
    const [movies, setMovies] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const isAdmin = useSelector((state) => state.setlogin.isAdmin);
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const isHomepage = useSelector((state) => state.homePage.isHomePage);
    const cityId = useSelector((state) => state.city.cityid);
    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Logout = () => {
        if (isAdmin) {
            dispatch(adminActions.setlogout());
            dispatch(personActions.logout());
        } else {
            dispatch(personActions.logout());
        }
        navigate("/login")
    }

    useEffect(() => {
        const getMoviesByCityId = async (cityId) => {
            try {
                const response = await axios.get(`http://localhost:5000/movie/byCity/${cityId}`);
                const moviesData = response.data.movies;
                setMovies(moviesData);
                console.log(movies)
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        getMoviesByCityId(cityId)
    }, [cityId])

    useEffect(() => {
        if (location.pathname !== "/homepage") {
            dispatch(homePageActions.notHomePage());
        }
    }, [dispatch, location.pathname]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get("http://localhost:5000/city");
                const citiesData = response.data.cities;
                setCities(citiesData);
                const defaultCityId = citiesData[0]._id;
                setSelectedCity(defaultCityId);
                dispatch(cityActions.setCity(defaultCityId));
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };
        fetchCities();
    }, []);

    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    useEffect(() => {
        dispatch(movieActions.setMovie(""));
    }, [selectedCity])

    const handleCityChange = (selectedOption) => {
        const selectedCityId = selectedOption.id;
        setSelectedCity(selectedCityId)
        dispatch(cityActions.setCity(selectedCityId));
    }
    const handleMovieChange = (selectedItem) => {
        // console.log(selectedItem)
        const selectedMovieId = selectedItem.id;
        dispatch(movieActions.setMovie(selectedMovieId));
        setSelectedMovie(selectedItem.name);
        setSearchQuery(""); // clear search query after selection
    };

    useEffect(() => {

    }, [searchQuery])

    return (
        <nav>
            <div className='header-logo-search'>
                <Link className="header-logo" to="/homepage"><img src={logo} /></Link>
                {isHomepage &&
                    <ReactSearchAutocomplete
                        className='header-search'
                        items={movies.map((movie) => ({
                            id: movie._id,
                            name: movie.name,
                        }))}
                        onSearch={handleSearchChange}
                        onSelect={handleMovieChange}
                        placeholder="Search for a movie"
                        value={searchQuery}
                    />
                }
            </div>
            <div className='menu' onClick={() => {
                setMenuOpen(!menuOpen)
            }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                {isLoggedIn ? (
                    <>
                        {isAdmin && (
                            <>
                                <li>
                                    <NavLink to="/addcity" className="nav-button">ADD CITY</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/addtheater" className="nav-button">ADD THEATER</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/addTimeslot" className="nav-button">ADD TIMESLOT</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/addmovie" className="nav-button">ADD MOVIE</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/movieintheater" className="nav-button">
                                        ADD MOVIE IN THEATER
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {isHomepage && (
                            <li>
                                <Select
                                    placeholder="Search or Select City"
                                    options={cities.map((city) => ({
                                        value: city.name,
                                        label: city.name,
                                        id: city._id,
                                    }))}
                                    onChange={handleCityChange}
                                    className="header-dropdown "
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            height: "50px",
                                            width: "15rem",
                                            borderRadius: "6px",
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
                            </li>
                        )}
                        <li>
                            <NavLink className="nav-button" onClick={() => Logout()} to="/login" >LOG OUT</NavLink>
                        </li>
                        <li>
                            {isAdmin ? (<NavLink to="/admindetails" className="icon nav-button"><CgProfile /></NavLink>) : (<NavLink to="/customerdetails" className="icon nav-button"><CgProfile /></NavLink>)}
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/signup" className="nav-button">SIGN UP</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className="nav-button">LOG IN</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Header;
