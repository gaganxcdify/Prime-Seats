import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Header.css"
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import logo from "./logo/0ZIby5-LogoMakr.png"
import { adminActions, personActions } from '../../../../store';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const isAdmin = useSelector((state) => state.setlogin.isAdmin);
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost/user/user");
                const data = await response.json();
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Perform search based on searchQuery
        // Example: navigate(`/search?q=${searchQuery}`)
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
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search City"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <button type="submit" className="nav-button">Search</button>
                </form>
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
                            <li>
                                <NavLink to="/addmovie" className="nav-button">ADD NEW MOVIE</NavLink>
                            </li>
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

