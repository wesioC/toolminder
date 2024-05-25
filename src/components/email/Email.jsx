import React from 'react';
import '../tableloan/TableLoan.css';
import './Email.css';
import { Flex, Button } from '@radix-ui/themes';
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

  try {
    const response = await fetch(`${window.baseUrl}enviarEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (response.status === 200) {
      showNotification('Email enviado com sucesso!', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      throw new Error('Erro ao enviar email');
    }
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    showNotification('Erro ao enviar email', 'error');
  }
};

const showNotification = (message, type) => {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerText = message;

  document.body.appendChild(notification);

  // Show the notification
  requestAnimationFrame(() => {
    notification.classList.add('show');
  });

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
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
