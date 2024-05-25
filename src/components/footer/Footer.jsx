import React from 'react';
import { Grid, Box, Text } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './Footer.css';

const Footer = () => {
  return (
    <Grid className='footer_' columns="1" gap="3" width="100%" align='center'>
      <Box height="9" align='center'>
      <a href="/" className="nav__brand" ><img src="https://painel.toolminder.online/img/ToolMinder.svg"></img></a>
      <div><Text className='text__gw' align='center'>Aplicativo desenvolvido por Gustavo Moura e Wésio Coelho para auxiliar na adminstração das ferramentas do Laboratório de Ciências Agrárias do Instituto Federal Goiano - campus Rio Verde</Text>
      </div>
      </Box>
      <br/>
    </Grid>
  );
};

export default Footer;
