import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Verify from './pages/verify/Verify';
import Leaderboard from './components/leaderboard/Leaderboard';
import Navbar from './components/navbar/Navbar';
import AddFriend from './pages/add_friend/AddFriend';

function App() {
  const [isLogin, setLogin] = useState(false);
  const [isHome, setHome] = useState(true);

  return (
    <>
      {isLogin && (<Navbar setHome={setHome} setLogin={setLogin} />)}
      <BrowserRouter>
        {isHome && (<Leaderboard isLogin={isLogin} />)}
        <Routes>
          <Route path="/" element={<Login isLogin={isLogin} setLogin={setLogin} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/addfriend" element={<AddFriend />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;