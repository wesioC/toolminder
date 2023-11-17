import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from './components/header/Header.jsx'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from './routes/Home.jsx';
import Loan from './routes/Loan.jsx'
import Tool from './routes/Tool.jsx'
import User from './routes/User.jsx'
import Tabletool from './components/tabletool/TableTool.jsx'
import TableLoan from './components/tableloan/TableLoan.jsx'

const router = createBrowserRouter([
  {
  path: "/", element: <Home />
  }, 
  {
    path: "Loan", element: <Loan />
  }, 
  {
    path: "Tool", element: <Tool />
  }, 
  {
    path: "User", element: <User />
  },
  {
    path: "Tabletoll", element: <Tabletool/>
  },
  {
    path: "TableLoan", element: <TableLoan/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme >
      <Header/>
      <RouterProvider router={router}/>
    </Theme>
  </React.StrictMode>,
)
