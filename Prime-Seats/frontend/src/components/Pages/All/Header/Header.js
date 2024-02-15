import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Header.css"
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import logo from "./logo/0ZIby5-LogoMakr.png"
import { adminActions, personActions } from '../../../../store';
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
        } else {
            dispatch(personActions.logout());
        }
        navigate("/login")
    }

    return (
        <nav>
            <Link className="title" to="/homepage"><img src={logo} /></Link>
            {isLoggedIn && (
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
            )}

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
                                    <NavLink to="/addmovie" className="nav-button">ADD MOVIE</NavLink>
                                </li>

                            </>
                        )}
                        <li>
                            <NavLink className="nav-button" onClick={() => Logout()} to="/login" >LOG OUT</NavLink>
                        </li>
                        <li>
                            {isAdmin ? (<NavLink to="/admindetails" className="icon nav-button"><CgProfile /></NavLink>) : (<NavLink to="/userdetails" className="icon"><CgProfile /></NavLink>)}
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