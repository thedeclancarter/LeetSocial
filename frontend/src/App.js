import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Navbar from './components/navbar/Navbar';

function App() {
  const [isLogin, setLogin] = useState(false);
  const [isUpdate, setUpdate] = useState(false);

  return (
    <>
      <div className='grid-background'>
        {isLogin && (
          <Navbar
            isLogin={isLogin}
            setLogin={setLogin}
            isUpdate={isUpdate}
            setUpdate={setUpdate}
          />
        )}
      </div>
      <Routes>
        <Route
          path='/'
          element={<Login isLogin={isLogin} isUpdate={isUpdate} />}
        />
        <Route
          path='/home'
          element={<Home isLogin={isLogin} setLogin={setLogin} isUpdate={isUpdate} />}
        />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;