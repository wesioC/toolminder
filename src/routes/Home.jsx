import React from 'react'
import '../styles/Home.css'
import '@radix-ui/themes/styles.css';
import { Flex, Table, Button } from '@radix-ui/themes';
import Tabletool from '../components/tabletool/TableTool';
import TableLoan from '../components/tableloan/TableLoan';
import Header from '../components/header/Header';

const Home = () => {
  return (
    
    <Flex direction="column" gap="6" right="3" align="center">
      
    <div>
        <input type='text' id='busca' placeholder='Buscar ferramenta...' />
    </div>
    
    <Tabletool />
    <div className="responsive-text">
        <h4>Materiais com devolução próximo ao vencimento:</h4>
        <TableLoan />
    </div>
</Flex>
  )
}

export default Home