import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter } from "react-router-dom"
import Login from "./page/login/Login.jsx"
import Register from './page/register/Register.jsx';
import Profile from './page/profile/Profile.jsx';
import Error404 from './page/error/Error404.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
