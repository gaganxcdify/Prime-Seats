// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import "./Header.css"
// import { CgProfile } from "react-icons/cg";
// import { useDispatch, useSelector } from 'react-redux';
// import logo from "./logo/Prime seats-01.png"
// import { adminActions, personActions, cityActions } from '../../../../store/index'; // Import cityActions
// import axios from 'axios';

// const Header = () => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const isAdmin = useSelector((state) => state.setlogin.isAdmin);
//     const isHomePage = useSelector((state) => state.homePage.isHomePage);
//     const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
//     const selectedCity = useSelector((state) => state.city.cityName); // Get selected city from Redux store
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     // const [cities, setCities] = useState([]);

//     useEffect(() => {
//         const fetchCities = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/city/");
//                 const citiesData = response.data.cities.map(city => city.name);
//                 setCities(citiesData);
//                 if (!selectedCity && citiesData.length > 0) {
//                     dispatch(cityActions.setCity(citiesData[0])); // Set default city in Redux store
//                 }
//             } catch (error) {
//                 console.error("Error fetching cities:", error);
//             }
//         };

//         fetchCities();
//     }, [dispatch, selectedCity]); // Add dispatch and selectedCity to dependencies array

//     const handleCityChange = (event) => {
//         const selectedCity = event.target.value;
//         dispatch(cityActions.setCity(selectedCity)); // Dispatch action to update selected city in Redux store
//     };

//     const handleSearchInputChange = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     const Logout = () => {
//         if (isAdmin) {
//             dispatch(adminActions.setlogout());
//             dispatch(personActions.logout());
//         } else {
//             dispatch(personActions.logout());
//         }
//         navigate("/login")
//     }

//     return (
//         <nav>
//             <Link className="header-logo" to="/homepage"><img src={logo} /></Link>

//             <div className='menu' onClick={() => {
//                 setMenuOpen(!menuOpen)
//             }}>
//                 <span></span>
//                 <span></span>
//                 <span></span>
//             </div>
//             <ul className={menuOpen ? "open" : ""}>
//                 {isLoggedIn ? (
//                     <>
//                         {isAdmin && (
//                             <>
//                                 <li>
//                                     <NavLink to="/addcity" className="nav-button">ADD CITY</NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink to="/addtheater" className="nav-button">ADD THEATER</NavLink>

//                                 </li>
//                                 <li>
//                                     <NavLink to="/addTimeslot" className="nav-button">ADD TIMESLOT</NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink to="/addmovie" className="nav-button">ADD MOVIE</NavLink>
//                                 </li>
//                                 <li>

//                                     <NavLink to="/movieintheater" className="nav-button">
//                                         Add MOVIE IN THEATER
//                                     </NavLink>
//                                 </li>
//                             </>
//                         )}
//                         {/* <div>
//                             {isHomePage && (
//                                 <div className="nav-button-dropdown">
//                                     <select value={selectedCity} onChange={handleCityChange}>
//                                         {cities.map((city, index) => (
//                                             <option key={index} value={city}>{city}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             )}
//                         </div> */}
//                         <li>
//                             <NavLink className="nav-button" onClick={() => Logout()} to="/login" >LOG OUT</NavLink>
//                         </li>
//                         <li>
//                             {isAdmin ? (<NavLink to="/admindetails" className="icon nav-button"><CgProfile /></NavLink>) : (<NavLink to="/customerdetails" className="icon nav-button"><CgProfile /></NavLink>)}
//                         </li>
//                     </>
//                 ) : (
//                     <>
//                         <li>
//                             <NavLink to="/signup" className="nav-button">SIGN UP</NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/login" className="nav-button">LOG IN</NavLink>
//                         </li>
//                     </>
//                 )}
//             </ul>
//         </nav>
//     );
// }

// export default Header;


import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Header.css"
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import logo from "./logo/Prime seats-01.png"
import { adminActions, personActions } from '../../../../store/index';
import axios from 'axios';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const isAdmin = useSelector((state) => state.setlogin.isAdmin);
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    const Logout = () => {
        if (isAdmin) {
            dispatch(adminActions.setlogout());
            dispatch(personActions.logout());
        } else {
            dispatch(personActions.logout());
        }
        navigate("/login")
    }


    // useEffect(() => {
    //     Logout()
    // }, [])

    // useEffect(() => {
    //     const Logout = () => {
    //         if (isAdmin) {
    //             dispatch(adminActions.setlogout());
    //         } else {
    //             dispatch(personActions.logout());
    //         }
    //         navigate("/login");
    //     }
    // }, [isAdmin]);

    return (
        <nav>
            <Link className="header-logo" to="/homepage"><img src={logo} /></Link>
            {/* {isLoggedIn && (
                <>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search City"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        <button type="submit" className="nav-button">Search</button>
                    </form>
                </>
            )} */}

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