import React, { useState, useEffect } from 'react';
import { Table, Button } from '@radix-ui/themes';
import './TableLoan.css';
import { FaBell } from 'react-icons/fa';
import Email from '../email/Email';


const TableLoan = ({ searchTerm }) => {
    const formatPhoneNumberForWhatsApp = (phoneNumber) => {
        // Remover todos os caracteres não numéricos
        const cleanedNumber = phoneNumber.replace(/\D/g, '');
        // Se o número começar com 55 (código de país do Brasil), remova-o
        const formattedNumber = cleanedNumber.startsWith('55') ? cleanedNumber.substring(2) : cleanedNumber;
        let n = '55' + formattedNumber;
        return n;
    };

    const [loans, setLoans] = useState([]);

    const filteredLoans = loans.filter(loan =>
        loan.toolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.toolCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.receiver.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        // Busca os dados dos empréstimos da API
        fetch(`${window.baseUrl}getloans`)
            .then(response => response.json())
            .then(data => {
                const formattedLoans = data.map(loan => {
                    // Convertendo a data para o padrão brasileiro (dd/mm/aaaa)
                    const formattedDate = new Date(loan.dateHand).toLocaleDateString('pt-BR');
                    return { ...loan, dateHand: formattedDate };
                });
                setLoans(formattedLoans);
            })
            .catch(error => console.error('Erro ao buscar empréstimos:', error));
    }, []);

    const updateLoan = (loanCode, loanQuantity) => {
        // Preparando os dados para enviar na solicitação POST
        const loanData = {
            loanCode: loanCode,
            toolQuantity: loanQuantity
        };
        // Enviar a solicitação POST para a rota http://localhost:3000/addloan
        fetch(`${window.baseUrl}updateloan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loanData),
        })
            .then(response => {
                if (response.ok) {
                    // Lógica adicional caso a solicitação seja bem-sucedida
                    console.log('Empréstimo atualizado com sucesso!');
                    window.location.reload();
                } else {
                    throw new Error('Erro ao atualizado empréstimo');
                }
            })
            .catch(error => {
                console.error('Erro ao atualizado empréstimo:', error);
                // Lógica adicional para lidar com falhas na solicitação
            });

    };

    return (
        <div className='table__loan'>
            <Table.Root className='custom-table'>
                <Table.Header>
                    <Table.Row className='title__row'>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Nome</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Telefone</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Ferramenta</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Quantidade</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Data de devolução</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Ação</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {filteredLoans.map((loan, index) => (
                        <Table.Row key={index}>
                            <Table.RowHeaderCell align='center'>{loan.receiver}</Table.RowHeaderCell>
                            <Table.RowHeaderCell align='center'>
                            <a className='a__link' href={`https://wa.me/${formatPhoneNumberForWhatsApp(loan.receiverPhone)}`} target='_blank'>
                                {loan.receiverPhone}
                            </a>
                            </Table.RowHeaderCell>
                            <Table.RowHeaderCell align='center'>{loan.toolName}</Table.RowHeaderCell>
                            <Table.Cell align='center'>{loan.toolQuantity}</Table.Cell>
                            <Table.Cell align='center'>{loan.dateHand}</Table.Cell>
                            <Table.Cell align='center'>
                                <div className="button-container">
                                    <Email receiver={loan.receiver} receiverEmail={loan.receiverEmail} toolName={loan.toolName} toolQuantity={loan.toolQuantity} dateHand={loan.dateHand} />
                                    <Button variant="solid" color='green'
                                        onClick={() => updateLoan(loan.loanCode, loan.toolQuantity)}
                                    >Devolver</Button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default TableLoan;
