
import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './pages/Login'
import ProfilePage from './pages/ProfilePage'
import Header from './components/Header';

const rootElement = document.getElementById("root");
const token = localStorage.getItem('token')
render(
  <>
  {token && <Header /> }
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        
        {/* <Route path="/profile-page" element={<Navigate replace to="/login" />} /> */}
      </Routes>
    </BrowserRouter>
  </>,
  rootElement

);