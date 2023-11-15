import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import AddFriend from './pages/add_friend/AddFriend';
import Leaderboard from './components/leaderboard/Leaderboard';

function App() {
  const [isLogin, setLogin] = useState(false);
  const [isHome, setHome] = useState(true);

  return (
    <>
      {isLogin && (<Navbar setHome={setHome}/>)}
      <div className="container">
        {isHome && (<Leaderboard isLogin={isLogin} />) }
        <Routes>
          <Route path="/" element={<Login isLogin={isLogin} setLogin={setLogin} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addfriend" element={<AddFriend />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
