import './App.css';
import HomePage from './components/Pages/All/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from './components/Pages/All/Login/Login';
import SignUp from './components/Pages/All/Signup/SignUp';
import AddMovie from './components/Pages/Admin/AddMovie/AddMovie';
import Layout from './components/Pages/All/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import EditMovie from './components/Pages/Admin/EditMovie/EditMovie';
import Booking from './components/Pages/Customer/Bookings/Bookings';
import SelectSeats from './components/Pages/Customer/SelectSeat/SelectSeat';
import AdminDetails from './components/Pages/Admin/AdminDetails/AdminDetails';
import SummaryPage from './components/Pages/Customer/SummaryPage/SummaryPage';
import AddCity from './components/Pages/Admin/AddCity/AddCity';
import AddTheater from './components/Pages/Admin/AddTheater/AddTheater';
import CustomerDetails from './components/Pages/Customer/CustomerDetails/CustomerDetails';
import MovieDetails from './components/Pages/All/MovieDetails/MovieDetails';
import { adminActions, homePageActions, personActions } from './store';
import AddTimeSlot from './components/Pages/Admin/AddTimeSlot/AddTimeSlot';
import AddMovieInTheater from './components/Pages/Admin/AddMovieInTheater/AddMovieInTheater';
import Success from './components/Pages/Customer/Success/Succress';
import Failure from './components/Pages/Customer/Failure/Failure';


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const isAdmin = useSelector((state) => state.setlogin.isAdmin);
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const accessToken = sessionStorage.getItem("token");
    if (accessToken) {
      dispatch(personActions.login());
    }

    const adminid = sessionStorage.getItem("adminId");
    if (adminid) {
      dispatch(adminActions.setlogin());
    }

    if (location.pathname === "/homepage") {
      dispatch(homePageActions.homePage());
    }
  }, [dispatch, location.pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/login" />} />
        {isLoggedIn && (
          <>
            {isAdmin && (
              <>
                <Route path="/admindetails" element={<AdminDetails />} />
                <Route path="/addmovie" element={<AddMovie />} />
                <Route path="/addcity" element={<AddCity />} />
                <Route path="/addtheater" element={<AddTheater />} />
                <Route path="/addTimeslot" element={<AddTimeSlot />} />
                <Route path="/editmovie/:id" element={<EditMovie />} />
                <Route path="/movieintheater" element={<AddMovieInTheater />} />
              </>
            )}
            <Route path="/customerdetails" element={<CustomerDetails />} />
            <Route path="/moviedetails/:movieid/:cityid" element={<MovieDetails />} />
            <Route path="/booking/:movieid/:cityid" element={<Booking />} />
            <Route path="/selectseats/:movieid/:theaterid/:timeslotid/:selecteddate" element={<SelectSeats />} />
            <Route path="/summary/:movieid/:theaterid/:timeslotid/:selectedSeats" element={<SummaryPage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure />} />
          </>
        )}
      </Routes>
    </Layout>
  );
}

export default App;
