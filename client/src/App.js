import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter } from "react-router-dom"
import Login from "./page/login/Login.jsx"
import Register from './page/register/Register.jsx';
import Profile from './page/profile/Profile.jsx';
import ChatScreen from './page/chatting-mode/ChatScreen';
import Error404 from './page/error/Error404.jsx';
import LoadingThemeOne from './page/loading/LoadingThemeOne';
import LoadingThemeTwo from './page/loading/LoadingThemeTwo';
import CallScreen from './page/call-screen/CallScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LoadingThemeTwo />} /> 
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route  exact path='/chat' element={<ChatScreen />} />
        <Route exact path='/call' element={<CallScreen />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
