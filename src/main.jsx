import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/header/header.jsx'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './routes/home.jsx'
import Loan from './routes/Loan.jsx'
import Tool from './routes/Tool.jsx'
import User from './routes/User.jsx'

const router = createBrowserRouter([
  {
  path: "/", element: <Home />
}, {
  path: "loan", element: <Loan />
}, {
  path: "Tool", element: <Tool />
}, {
  path: "user", element: <User />
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme >
     <Header/>
    <RouterProvider router={router}/>
    </Theme>

  </React.StrictMode>,
)
