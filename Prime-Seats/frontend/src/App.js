import './App.css';
import HomePage from './components/HomePage/HomePage';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Signup And Login/Login';
import SignUp from './components/Signup And Login/SignUp';
import User from './components/User/User';
import AddMovie from './components/Admin/AddMovie';

function App() {
  return (<div>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/user" element={<User />}></Route>
      <Route path="/addmovie" element={<AddMovie />}></Route>
    </Routes>
  </div>
  );
}

export default App;
