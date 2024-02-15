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
import Booking from './components/Pages/User/Bookings/Bookings';
import SelectSeats from './components/Pages/User/SelectSeat/SelectSeat';
import AdminDetails from './components/Pages/Admin/AdminDetails/AdminDetails';
import UserDetails from './components/Pages/User/UserDetails/UserDetails';
import SummaryPage from './components/Pages/User/SummaryPage/SummaryPage';
import AddCity from './components/Pages/Admin/AddCity/AddCity';
import AddTheater from './components/Pages/Admin/AddTheater/AddTheater';


function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  const isAdmin = useSelector((state) => state.isAdmin)

  return (
    <Layout> 
      <Routes>
        <Route path="/homepage" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/admindetails" element={<AdminDetails />}></Route>
        <Route path="/userdetails" element={<UserDetails />}></Route>
        <Route path="/addmovie" element={<AddMovie />}></Route>
        <Route path="/addcity" element={<AddCity />}></Route>
        <Route path="/addtheater" element={<AddTheater />}></Route>
        <Route path="/editmovie/:id" element={<EditMovie />}></Route>
        <Route path="/booking/:id/:city" element={<Booking />} ></Route>
        <Route path="/selectseats" element={<SelectSeats />}></Route>
        <Route path="/summary" element={<SummaryPage />}></Route>

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Layout >
  );
}

export default App;
