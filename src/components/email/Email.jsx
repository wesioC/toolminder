import React from 'react';
import '../tableloan/TableLoan.css';
import { Flex, DropdownMenu, Button } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { FaBell } from 'react-icons/fa';

const sendEmail = async (toolName, toolQuantity, receiver, receiverEmail, dateHand) => {
  const emailData = {
    email: receiverEmail,
    toolName: toolName,
    toolQuantity: toolQuantity,
    receiver: receiver,
    dateHand: dateHand,
  };

  fetch(`${window.baseUrl}enviarEmail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  })
    .then(response => {
      if (response.status === 200) {
        console.log('Email enviado com sucesso!');
        // Lógica adicional caso a solicitação seja bem-sucedida
        window.location.reload();
      } else {
        throw new Error('Erro ao enviar email');
      }
    })
    .catch(error => {
      console.error('Erro ao enviar email:', error);
    });
};

const Email = ({ toolName, toolQuantity, receiver, receiverEmail, dateHand }) => {
  return (
    <Flex gap="3" align="center">
      <Button
        variant="solid"
        color="blue"
        onClick={() => sendEmail(toolName, toolQuantity, receiver, receiverEmail, dateHand)}
      >
        <FaBell />
      </Button>
    </Flex>
  );
};

export default Email;
