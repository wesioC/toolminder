import React, { useState, useEffect } from 'react'
import { Table, Button } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './TableAllTool.css';
import Loan from '../loan/Loan';
import CrudTool from '../CrudTool/CrudTool';



const TableAllTool = ({ searchTerm }) => {
    const [tools, setTools] = useState([]);

    const filteredTools = tools.filter(tool =>
        tool.toolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.toolCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetch(`${window.baseUrl}getalltools`)
            .then(response => response.json())
            .then(data => setTools(data))
            .catch(error => console.error('Erro ao buscar ferramentas:', error));
    }, []);

    const handleDelete = (toolCode) => {
        fetch(`${window.baseUrl}removetools`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ toolCode }) // Envia o toolCode para remoção
        })
        .then(response => {
            if (response.ok) {
                // Se a remoção for bem-sucedida, atualize os dados
                fetch(`${window.baseUrl}getalltools`)
                    .then(response => response.json())
                    .then(data => setTools(data))
                    .catch(error => console.error('Erro ao buscar ferramentas:', error));
            }
        })
        .catch(error => console.error('Erro ao remover ferramenta:', error));
    };

    return (
        <div className='table__tool'>
            <Table.Root className='custom-table-tool'>
                <Table.Header>
                    <Table.Row className='title__row__tool'>
                        <Table.ColumnHeaderCell align='center'>Código</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align='center'>Ferramenta</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align='center'>Quantidade</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align='center'>Proprietário</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align='center'>Ação</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {filteredTools.map((tool, index) => (
                        <Table.Row key={index}>
                            <Table.Cell align='center'>{tool.toolCode}</Table.Cell>
                            <Table.Cell align='center'>{tool.toolName}</Table.Cell>
                            <Table.Cell align='center'>{tool.toolQuantity}</Table.Cell>
                            <Table.Cell align='center'> 
                                {tool.toolCode.startsWith('F') ? 'Frederico' : tool.toolCode.startsWith('M') ? 'Marconi' : 'IF Goiano'}
                            </Table.Cell>
                            <Table.Cell align='center'>
                            <div className="button-container">
                                <CrudTool onDelete={() => handleDelete(tool.toolCode)} />
                            </div>
                        </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default TableAllTool