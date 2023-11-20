import React from 'react'
import '../styles/home.css'
import '@radix-ui/themes/styles.css';
import { Flex, TextField, Button } from '@radix-ui/themes';

import TableTool from '../components/tabletool/tabletool';
import TableLoan from '../components/tableloan/TableLoan';
import { FaSearch } from "react-icons/fa";

const Home = () => {
  return (

    <Flex direction="column" gap="6" right="3" align="center">
      <div className='div__input'>
        <TextField.Root className='input__busca'>
          <TextField.Slot>
          <FaSearch />
          </TextField.Slot>
          <TextField.Input  radius="full" placeholder="Search the docs…" />
        </TextField.Root>
      </div>
      <TableTool />
      <div className="responsive-text">
        <h4>Materiais com devolução próximo ao vencimento:</h4>
        <TableLoan />
      </div>
    </Flex>
  )
}

export default Home