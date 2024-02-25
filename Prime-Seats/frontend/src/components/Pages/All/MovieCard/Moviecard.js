import React from 'react'
import "./Moviecard.css"
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { homePageActions } from '../../../../store';


const Moviecard = (props) => {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state) => state.setlogin.isAdmin)
    const isHomePage = useSelector((state) => state.homePage.isHomePage);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const handlePatch = async (id) => {
        console.log(id)
        const res = await axios.patch(`http://localhost:5000/movie/${id}`, {
            is_active: false,
        }).catch((err) => console.log(err));

        if (res.status !== 200) {
            return console.log("Unexpected Error")
        }
        const resdata = res.data
        return resdata;
    }
    const handleCardClick = () => {
        dispatch(homePageActions.notHomePage());
    }

    return (
        <NavLink className="homepage-card" onClick={handleCardClick} to={`/moviedetails/${props.id}/city=${props.city}`} >
            <img
                className="homepage-posterImg"
                src={props.image}
                alt={props.name}
            />
            <div className="movieInfo">
                <span className="moviecard-movieName">{props.name}</span>
                <span className='genre'>{props.genre}</span>
                <span className=''>{`COMING ON: ${formatDate(props.releasedate)}`}</span>
            </div>
        </NavLink >
    )
}
export default Moviecard;


