// main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './routes/Home.jsx';
import Loan from './routes/Loan.jsx';
import Tool from './routes/Tool.jsx';
import User from './routes/User.jsx';
import Header from './components/header/Header.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Theme>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Loan" element={<Loan />} />
          <Route path="/Tool" element={<Tool />} />
          <Route path="/User" element={<User />} />
        </Routes>
      </Theme>
    </Router>
  </React.StrictMode>
);
