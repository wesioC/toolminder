import React from 'react';
import { createRoot } from 'react-dom/client'; // Alteração na importação
import './index.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Footer from './components/footer/Footer.jsx';
import Home from './routes/Home.jsx';
import Tool from './routes/Tool.jsx';
import User from './routes/User.jsx';
import Header from './components/header/Header.jsx';
import LoginAdm from './routes/LoginAdm.jsx';
import Historico from './routes/Historico.jsx';


const root = createRoot(document.getElementById('root'));

window.baseUrl = "https://toolminder.online/";

root.render(
  <React.StrictMode>
    <Router>
      <Theme appearance="light" accentColor="grass" panelBackground="solid" radius="full" >
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Tool" element={<Tool />} />
          <Route path="/User" element={<User />} />
          <Route path='/' element={<LoginAdm/>}/>
          <Route path='/Historico' element={<Historico/>}/>
        </Routes>
        <Footer />
      </Theme>
    </Router>
  </React.StrictMode>
);
