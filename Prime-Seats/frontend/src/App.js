import './App.css';
import HomePage from './components/Pages/All/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
import Privateroute from './components/Privateroute';
import MovieDetails from './components/Pages/All/MovieDetails/MovieDetails';
import { adminActions, personActions } from './store';
import AddTimeSlot from './components/Pages/Admin/AddTimeSlot/AddTimeSlot';
import AddMovieInTheater from './components/Pages/Admin/AddMovieInTheater/AddMovieInTheater';


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const isAdmin = useSelector((state) => state.setlogin.isAdmin);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("token")
    if (accessToken) {
      dispatch(personActions.login())
    }

  }, [])
  useEffect(() => {
    const adminid = sessionStorage.getItem("adminId")
    if (adminid) {
      dispatch(adminActions.setlogin())
    }

  }, [])

  return (
    <Layout>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {isLoggedIn && (<>
          {isAdmin && (
            <>
              <Route path="/admindetails" element={<AdminDetails />} />
              <Route path="/addmovie" element={<AddMovie />} />
              <Route path="/addcity" element={<AddCity />} />
              <Route path="/addtheater" element={<AddTheater />} />
              <Route path="/addTimeslot" element={<AddTimeSlot />}></Route>
              <Route path="/editmovie/:id" element={<EditMovie />} />
              <Route path="/movieintheater" element={<AddMovieInTheater />} />

              movieintheater

            </>
          )}
          <Route path="/customerdetails" element={<CustomerDetails />} />
          <Route path="/moviedetails/:id/:city" element={<MovieDetails />} />
          <Route path="/booking/:id/:city" element={<Booking />} />
          <Route path="/selectseats" element={<SelectSeats />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </>
        )}
      </Routes>
    </Layout>
  );
}

export default App;
