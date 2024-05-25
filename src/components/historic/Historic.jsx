import React, {useState, useEffect} from 'react'
import { Table, Button } from '@radix-ui/themes';
import './Historic.css'

const Historic = ( {searchTerm} ) => {
  const [loans, setLoans] = useState([]);

  const filteredLoans = loans.filter(loan =>
    loan.toolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.toolCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.receiver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Busca os dados dos empréstimos da API
    fetch(`${window.baseUrl}getloanshistory`)
        .then(response => response.json())
        .then(data => {
            const formattedLoans = data.map(loan => {
                // Convertendo a data para o padrão brasileiro (dd/mm/aaaa)
                const formattedDate = new Date(loan.dateReturn).toLocaleDateString('pt-BR');
                return { ...loan, dateReturn: formattedDate };
            });
            setLoans(formattedLoans);
        })
        .catch(error => console.error('Erro ao buscar empréstimos:', error));
    }, []);

  return (
    <div className='table__historic'>
            <Table.Root className='custom__table__historic'>
                <Table.Header>
                    <Table.Row className='title__row'>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Nome</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Telefone</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Ferramenta</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Quantidade</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Data da devolução</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Responsável</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {filteredLoans.map((loan, index) => (
                        <Table.Row key={index}>
                            <Table.RowHeaderCell align='center'>{loan.receiver}</Table.RowHeaderCell>
                            <Table.RowHeaderCell align='center'>{loan.receiverPhone}</Table.RowHeaderCell>
                            <Table.RowHeaderCell align='center'>{loan.toolName}</Table.RowHeaderCell>
                            <Table.Cell align='center'>{loan.toolQuantity}</Table.Cell>
                            <Table.Cell align='center'>{loan.dateReturn}</Table.Cell>
                            <Table.Cell align='center'>{loan.sender}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <div className='margin__'></div>
        </div>
  )
}

export default Historic