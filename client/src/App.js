import './App.css';
import {Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import Login from "./page/login/Login.jsx"
import Register from './page/register/Register.jsx';
import Profile from './page/profile/Profile.jsx';
import ChatScreen from './page/chatting-mode/ChatScreen';
import Error404 from './page/error/Error404.jsx';
import LoadingThemeOne from './page/loading/LoadingThemeOne';
import LoadingThemeTwo from './page/loading/LoadingThemeTwo';
import CallScreen from './page/call-screen/CallScreen';
import ForgetPassword from './page/login/ForgetPassword';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [isLogin, setIsLogin] = useState('UN_LOGIN');
  const LoginRoute = ({children}) => {
    if (isLogin === 'UN_LOGIN') {
      return <Navigate to='/login' replace />;
    } else if (isLogin === 'UNAVTIVITY') {
      return <Navigate to='/login' replace/>;
    }
    return children;
  };
  const UnLoginRoute = ({children}) => {
    if (isLogin === 'LOGIN') {
      return <Navigate to='/profile' replace />;
    } else if (isLogin === 'UNAVTIVITY') {
      return <Navigate to='/login' replace/>;
    }
    return children;
  };
  const LoadAuth = async () => {
    try {
      const res = await axios.get('/auth/me');
      console.log(res.data);
      if (res.data.message === 'NO_TOKEN') {
        setIsLogin('UN_LOGIN');
      } else if (res.data.message === 'UNACTIVITY') {
        setIsLogin('UNACTIVITY');
      } else if (res.data.message === 'SUCCESS') {
        setIsLogin('LOGIN')
      }
      

    } catch(error) {
      setIsLogin('UN_LOGIN');
    }
  }
  useEffect(() =>{
    LoadAuth();
  })


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LoadingThemeTwo />} /> 
        <Route exact path='/login' element={<UnLoginRoute><Login isLogin={isLogin} /></UnLoginRoute>} />
        <Route exact path='/register' element={<UnLoginRoute><Register /></UnLoginRoute>} />
        <Route exact path='/profile' element={<LoginRoute><Profile /></LoginRoute>} />
        <Route  exact path='/chat' element={<LoginRoute><ChatScreen /></LoginRoute>} />
        <Route exact path='/call' element={<LoginRoute><CallScreen /></LoginRoute>} />
        <Route exact path='/forget-password' element={<UnLoginRoute><ForgetPassword /></UnLoginRoute>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
