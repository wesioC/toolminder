import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Home.css';
import '@radix-ui/themes/styles.css';
import { Flex, TextField, Button } from '@radix-ui/themes';
import { FaSearch } from 'react-icons/fa';

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import TableTool from '../components/tabletool/TableTool';
import TableLoan from '../components/tableloan/TableLoan';
import Historic from '../components/historic/Historic';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const matricula = params.get('matricula') || '';

  return (
    <>
      <Header matricula={matricula} /> 
      <Flex direction="column" gap="6" right="3" align="center">
        <div className='div__input'>
          <TextField.Root className='input__busca'>
            <TextField.Slot>
              <FaSearch />
            </TextField.Slot>
            <TextField.Input
              radius="full"
              placeholder="Digite o nome ou código da ferramenta"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </TextField.Root>
        </div>
        <TableTool searchTerm={searchTerm} matricula={matricula} />
        <div className="responsive-text">
          <h4>Materiais com devolução próximo ao vencimento:</h4>
          <TableLoan searchTerm={searchTerm} />
        </div>
        {/* <Historic/> */}
        <div className='margin__'></div>
      </Flex>
      {/* <Footer/>  */}
    </>
  );
};

export default Home;
