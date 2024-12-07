import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Authentication from './pages/Authentication';
import { Toaster } from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { user } from './store/atoms/auth';

function App() {

  return (
    <div data-theme="emerald">
      <Routes>
        <Route path="/login" element={<Authentication />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
