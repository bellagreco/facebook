
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate, 
} from "react-router-dom";
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage'
import Header from './components/Header';
import  { Redirect } from 'react-router-dom'
const rootElement = document.getElementById("root");
const token = localStorage.getItem('token')
render(
  <>
    <BrowserRouter>
      <Routes>
      {token ? <Route path="/" element={<Navigate replace to="/profile-page" />} /> :    <Route path="/" element={<Login />} />}
      {token ?   <Route path="/profile-page" element={<ProfilePage />} /> :     <Route path="/" element={<Login />} />}

     
        <Route path="/profile-page" element={<ProfilePage />} />
        {/* <Route path="/profile-page" element={<Navigate replace to="/login" />} /> */}
      </Routes>
    </BrowserRouter>
  </>,
  rootElement

);