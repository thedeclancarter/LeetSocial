import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';

function App() {
  const [isLogin, setLogin] = useState(false);

  return (
    <>
      {isLogin && (<Navbar />)}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home isLogin={isLogin} setLogin={setLogin} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
