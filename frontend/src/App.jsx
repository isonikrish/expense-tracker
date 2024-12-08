import React, { useEffect } from 'react';
import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Authentication from './pages/Authentication';
import { Toaster } from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { isUserThere } from './store/atoms/auth';
import Home from './pages/Home';

function App() {
  const userThere = useRecoilValue(isUserThere)
  const navigate = useNavigate()
  useEffect(() => {
    if (!userThere) {
      navigate('/login')
    }
  }, [userThere])

  return (
    <div data-theme="emerald">
      <Routes>
        <Route path="/login" element={<Authentication />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
