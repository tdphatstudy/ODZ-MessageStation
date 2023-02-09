import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter } from "react-router-dom"
import Login from "./page/login/Login.jsx"
import Register from './page/register/Register.jsx';
import Profile from './page/profile/Profile.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
