import React from 'react'
import "./Moviecard.css"
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


const Moviecard = (props) => {
    const isAdmin = useSelector((state) => state.setlogin.isAdmin)

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const handleDelete = async () => {
        const res = await axios.delete("http://localhost/5000/movie/${props.id}").catch((err) => console.log(err));

        if (res.status !== 200) {
            return console.log("Unexpected Error")
        }

        const resdata = res.data
        return resdata;
    }
    return (
        <div className="card">
            <img
                className="posterImg"
                src={props.image}
                alt={props.name}
            />
            <div className="movieInfo">
                <span className="movieName">{props.name}</span>
                <span className='genre'>{props.genre}</span>
                <span className=''>{`Release Date: ${formatDate(props.releasedate)}`}</span>
                <div className='book-container'>
                    {isAdmin ?
                        (<div><button className="book">
                            <NavLink className="navlink" to="/editmovie">
                                EDIT MOVIE
                            </NavLink>
                        </button>
                            <button className="book" onClick={handleDelete}>
                                DELETE MOVIE
                            </button>
                        </div>
                        ) :
                        (
                            <button className="book">
                                <NavLink className="navlink" to={`/booking/${props.id}`} >
                                    BOOK TICKETS
                                </NavLink>
                            </button>
                        )
                    }
                </div>
            </div>
        </div >
    )
}
export default Moviecard;