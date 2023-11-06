import React from 'react'
import { BsSearch } from "react-icons/bs";
import '../assets/styles/home.css'
import '@radix-ui/themes/styles.css';
import { Slot } from '@radix-ui/react-slot';
import { Flex, Table, Button} from '@radix-ui/themes';

const Home = () => {
    return (
        <Flex direction="column" gap="6" right="3" align="center">
            <div>
                <input type='text' id='busca' placeholder='Buscar ferramenta...' />

            </div>
            <div className='table__tool'>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell align='center'>Ferramenta</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align='center'>Quantidade</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align='center'>Proprietário</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align='center'>Ação</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.RowHeaderCell align='center'>Mangueira</Table.RowHeaderCell>
                        <Table.Cell align='center'>1</Table.Cell>
                        <Table.Cell align='center'>IF Goiano</Table.Cell>
                        <Table.Cell align='center'><Button variant="solid" color='orange'>Emprestar</Button> <Button variant="solid" color='green'>Devolver</Button></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
            </div>
        </Flex>
    )
}

export default Home