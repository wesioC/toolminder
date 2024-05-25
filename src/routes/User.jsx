import React from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../components/header/Header';

const User = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const matricula = params.get('matricula') || '';
  return (
    <Header matricula={matricula} /> 
  )
}

export default User