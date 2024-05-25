import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Historic from '../components/historic/Historic'
import Header from '../components/header/Header'
import { Flex } from '@radix-ui/themes';
import { TextField, Button } from '@radix-ui/themes';
import { FaSearch } from 'react-icons/fa';

const Historico = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const matricula = params.get('matricula') || '';
  return (
    <>
    <Header matricula={matricula} /> 
    
    <Flex direction="column" gap="6" right="3" align="center">
      <div></div>
      <div className='div__input'>
        <TextField.Root className='input__busca'>
          <TextField.Slot>
            <FaSearch />
          </TextField.Slot>
          <TextField.Input
            radius="full"
            placeholder="Pesquisar pelo nome ou ferramenta"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </TextField.Root>
      </div>
      <Historic searchTerm={searchTerm} />
    </Flex>
    </>
  )
}

export default Historico