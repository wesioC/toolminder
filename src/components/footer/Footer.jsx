import React from 'react';
import { Grid, Box } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './Footer.css';

const Footer = () => {
  return (
    <Grid className='footer_' columns="3" gap="3" width="100%">
      <Box height="9" >
        <h1>teste</h1>
      </Box>
      <Box height="9" >
      <h1>teste</h1>
      </Box>
      <Box height="9" >
      <h1>teste</h1>
      </Box>
    </Grid>
  );
};

export default Footer;
