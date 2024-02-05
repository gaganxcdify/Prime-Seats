import React from 'react'
import "./Moviecard.css"

const Moviecard = (props) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <div className="card">
            <img
                className="posterImg"
                src={props.posterurl}
                alt={props.name}
            />
            <div className="movieInfo">
                <span className="movieName">{props.name}</span>
                <span className='genre'>{props.genre}</span>
                <span className=''>{`Release Date: ${formatDate(props.releasedate)}`}</span>
                <div className='book-container'>
                        <button className="book">BOOK TICKETS</button>
                    </div>
            </div>
        </div>
    )
}
export default Moviecard;