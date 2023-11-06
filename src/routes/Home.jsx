import React from 'react'
import '../styles/home.css'
import '@radix-ui/themes/styles.css';
import { Flex, Table, Button} from '@radix-ui/themes';
import Tabletool from '../components/tabletool/tabletool';

const Home = () => {
    return (
        <Flex direction="column" gap="6" right="3" align="center">
            <div>
                <input type='text' id='busca' placeholder='Buscar ferramenta...' />
            </div>
            <Tabletool/>
        </Flex>
    )
}

export default Home