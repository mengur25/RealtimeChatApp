import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast";
import { useThemeStore } from './store/useThemeStore';

const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  console.log({onlineUsers})
  const {theme} = useThemeStore();
  useEffect(() =>{
    checkAuth();
  }, [checkAuth]);


  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage />: <Navigate to="/login"/>} />
        <Route path='/signUp' exact element={!authUser ?<SignUp /> : <Navigate to="/"/>} />
        <Route path='/login' exact element={!authUser ?<Login /> : <Navigate to="/"/>} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ?<ProfilePage /> : <Navigate to="/login"/>} />
      </Routes>

      <Toaster />
    </div>


  )
}

export default App