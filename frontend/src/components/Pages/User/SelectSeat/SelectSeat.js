import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SelectSeat.css";
import { useParams } from "react-router-dom";
import { NavLink } from 'react-router-dom';


const SeatSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    let { movieId } = useParams();
    console.log(movieId);
    const userId = sessionStorage.getItem("userId");
    console.log(userId);
    useEffect(() => {
        const fetchBookedSeats = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/booking/${movieId}`
                );
                console.log(response.data.allSeats);
                setBookedSeats(response.data.allSeats);
            } catch (error) {
                console.error("Error fetching booked seats:", error);
            }
        };

        fetchBookedSeats();
    }, [movieId]);

    const toggleSeat = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    console.log(selectedSeats);

    const bookSeats = async () => {
        try {
            await axios.post(`http://localhost:5000/booking/${movieId}`, {
                userId,
                seats: selectedSeats,
            });
            console.log("Seats booked successfully!");
        } catch (error) {
            console.error("Error booking seats:", error);
        }
    };

    return (
        <div className="selectseat-bigbox">
            <div className="selectseat-seatSelectionContainer">
                <h2>Select Your Seats</h2>


                <div class="selectseat-color-box-container">
                    <div>
                        <div class="selectseat-color-box selectseat-available"></div>
                        <span class="selectseat-label">Available</span>
                    </div>
                    <div>
                        <div class="selectseat-color-box selectseat-selected"></div>
                        <span class="selectseat-label">Selected</span>
                    </div>
                    <div>
                        <div class="selectseat-color-box selectseat-booked"></div>
                        <span class="selectseat-label">Booked</span>
                    </div>
                </div>
                <div className="selectseat-screen"></div>
                <div className="selectseat-seats">
                    {Array.from({ length: 6 }, (_, row) => (
                        <div key={row} className="selectseat-row">
                            <div className="selectseat-rowLabel">{String.fromCharCode(65 + row)}</div>
                            {Array.from({ length: 10 }, (_, col) => (
                                <div
                                    key={col}
                                    className={`selectseat-seat ${selectedSeats.includes(
                                        `${String.fromCharCode(65 + row)}-${col}`
                                    )
                                        ? "selectseat-selected"
                                        : bookedSeats.includes(
                                            `${String.fromCharCode(65 + row)}-${col}`
                                        )
                                            ? "selectseat-booked"
                                            : ""
                                        }`}
                                    onClick={() =>
                                        toggleSeat(`${String.fromCharCode(65 + row)}-${col}`)
                                    }
                                >
                                    {col + 1}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <button className="selectseat-button" onClick={bookSeats}>
                    <NavLink className="homepage-navlink" to="/summary" >
                        SELECT SEATS
                    </NavLink>
                </button>
            </div>
        </div>

    );
};

export default SeatSelection;