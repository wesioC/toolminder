import React from 'react'
import { Table, Button } from '@radix-ui/themes';
import './tableloan.css'
import { FaBell } from "react-icons/fa";

const TableLoan = () => {
    return (
        <div className='table__loan'>
            <Table.Root className='custom-table' >
                <Table.Header>
                    <Table.Row className='title__row'>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Nome</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Ferramenta</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Quantidade</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Data de devolução</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Ação</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.RowHeaderCell align='center'>Gustavo Barroso</Table.RowHeaderCell>
                        <Table.RowHeaderCell align='center'>Mangueira</Table.RowHeaderCell>
                        <Table.Cell align='center'>1</Table.Cell>
                        <Table.Cell align='center'>12/12/2012</Table.Cell>
                        <Table.Cell align='center'>
                            <div className="button-container">
                                <Button variant="solid" color='blue'><FaBell /></Button>
                                <Button variant="solid" color='green'>Devolver</Button>
                            </div>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default TableLoan