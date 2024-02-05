import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Header.css"
import { CgProfile } from "react-icons/cg";

const Header = () => {
    const [isActive, setIsActive] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost/user/user");
                const data = await response.json();
                setIsActive(data.is_active);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);


    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <nav>
            <Link className="title" to="/">PrimeSeats</Link>
            <div className='menu' onClick={() => {
                setMenuOpen(!menuOpen)
            }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                {isActive ? (
                    <li>
                        <NavLink to="/user" className="icon"><CgProfile /></NavLink>
                    </li>
                ) : (
                    <>
                        <li>
                            <NavLink to="/signup">Sign Up</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">Log In</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Header;