import './App.css';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './components/Signup And Login/Login';
import SignUp from './components/Signup And Login/SignUp';
import PersonDetails from './components/PersonDetails/PersonDetails';
import AddMovie from './components/Admin/AddMovie/AddMovie';
import Layout from './components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import EditMovie from './components/Admin/EditMovie/EditMovie';
import Booking from './components/Bookings/Bookings';


function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  const isAdmin = useSelector((state) => state.isAdmin)
  
  return (
    <Layout>
      <Routes>
        <Route path="/homepage" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/persondetails" element={<PersonDetails />}></Route>
        <Route path="/addmovie" element={<AddMovie />}></Route>
        <Route path="/editmovie" element={<EditMovie />}></Route>
        <Route path="/booking/:id" element={<Booking />}></Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Layout>
  );
}

export default App;
