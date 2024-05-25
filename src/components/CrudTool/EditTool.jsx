import React, { useState } from 'react';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import InputMask from 'react-input-mask';
import './CrudTool.css';

const EditTool = ({ toolName: initialToolName, toolCode: initialToolCode, toolQuantity: initialToolQuantity }) => {
  const [toolName, setToolName] = useState(initialToolName);
  const [toolCode, setToolCode] = useState(initialToolCode);
  const [toolQuantity, setToolQuantity] = useState(initialToolQuantity);
  const [oldToolCode, setOldToolCode] = useState(initialToolCode); // Novo estado para guardar o código antigo

  const handleToolEdit = () => {
    console.log(toolCode, toolName, toolQuantity, oldToolCode); // Exibe os valores para verificar

    const toolData = {
      oldToolCode: oldToolCode, // Adiciona o código antigo na requisição
      toolCode: toolCode,
      toolName: toolName,
      toolQuantity: toolQuantity,
    };

    console.log(toolData);

    fetch(`${window.baseUrl}edittools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toolData),
    })
      .then(response => {
        if (response.ok) {
          showNotification('Alteração realizada com sucesso!', 'success');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          throw new Error('Erro ao realizar alteração');
        }
      })
      .catch(error => {
        console.error('Erro ao realizar alteração:', error);
        showNotification('Erro ao realizar alteração', 'error');
      });
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

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant='outline' color='green'>Editar</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>{toolName}</Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Código da ferramenta
            </Text>
            <TextField.Input 
              className='input_modal' value={toolCode} onChange={event => setToolCode(event.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Nome da ferramenta
            </Text>
            <TextField.Input 
              className='input_modal' value={toolName} onChange={event => setToolName(event.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Quantidade
            </Text>
            <TextField.Input 
              type='number' className='input_modal' value={toolQuantity} onChange={event => setToolQuantity(event.target.value)}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button color="red">
              Cancelar
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleToolEdit}>Editar</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditTool;
