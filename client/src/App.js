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
import { useContext, useEffect, useState, lazy, Suspense }  from 'react';
import axios from 'axios';
import { AuthContext } from './context/AuthContext'; 


function App() {
  const authContext = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(authContext.AuthState === null? 'UN_LOGIN' : 'LOGIN');
  const LoginRoute = ({children}) => {
    if (authContext.AuthState !== null) {
      return <Navigate to='/login' replace />;
    } else if (isLogin === 'UNAVTIVITY') {
      return <Navigate to='/login' replace/>;
    }
    return children;
  };
  const UnLoginRoute = ({children}) => {
    if (isLogin === 'LOGIN') {
      return <Navigate to='/profile' replace />;
    }
    return children;
  };
  const CallScreenLazy = lazy(() => import('./page/call-screen/CallScreen'));
  const LoginLazy = lazy(() => import('./page/login/Login'));
  const RegisterLazy = lazy(() => import('./page/register/Register'));
  const ProfileLazy = lazy(() => import('./page/profile/Profile'));
  const ChatScreenLazy = lazy(() => import('./page/chatting-mode/ChatScreen'));
  
  useEffect(()=>{
    const LoadAuth = async () => {
     
      if (isLogin === 'UN_LOGIN') {
        try {
          
        const res = await axios.get('/auth/me');
        if (res.data.message === 'NO_TOKEN') {
          setIsLogin('UN_LOGIN');
          localStorage.setItem('user', 'null');
        } else if (res.data.message === 'UNACTIVITY') {
          setIsLogin('UNACTIVITY');
          localStorage.setItem('user', JSON.stringify(res.data.user));
          authContext.setAuth(res.data.user);
          
        } else if (res.data.message === 'SUCCESS'){
          localStorage.setItem('user', JSON.stringify(res.data.user));
          setIsLogin('LOGIN');
          authContext.setAuth(res.data.user);
          
        }   
  
      } catch(error) {
        setIsLogin('UN_LOGIN');
        localStorage.setItem('user', 'null');
      }
      }
    }
    if (authContext.AuthState === null) {
      setIsLogin('UN_LOGIN');
    } else if (authContext.AuthState.account_status === 'unactivity') {
      setIsLogin('UNACTIVITY');
    } else {
      setIsLogin('LOGIN');
    }
    authContext.setAuth(JSON.parse(localStorage.getItem('user')));
    LoadAuth();

  }, [])
 


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LoadingThemeTwo />} /> 
        <Route exact path='/login' element={<UnLoginRoute><Login isLogin={isLogin} /></UnLoginRoute>} />
        <Route exact path='/register' element={<UnLoginRoute><Register /></UnLoginRoute>} />
        <Route exact path='/profile' element={isLogin === 'LOGIN'? <Profile />: <Navigate to='/login' replace/>} />
        <Route  exact path='/chat' element={isLogin === 'LOGIN'? <ChatScreen />: <Navigate to='/login' replace/>} />
        <Route path="/call" element={isLogin === 'LOGIN'? <CallScreen />: <Navigate to='/login' replace/>} />
        <Route exact path='/forget-password' element={<UnLoginRoute><ForgetPassword /></UnLoginRoute>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
