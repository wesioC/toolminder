import React, { useState, useEffect } from 'react'
import {Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import InputMask from 'react-input-mask';
import "./Loan.css"

const Loan = ({ toolName, toolCode, matricula, toolQuantity }) => {
  const [receiverName, setReceiverName] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [receiverPhone, setReceiverPhone] = useState(''); 
  const [returnDate, setReturnDate] = useState('');
  const [loanQuantity, setLoanQuantity] = useState('');
  const [userName, setUserName] = useState('');
  
  

  useEffect(() => {
    // Chama a rota para obter o nome do usuário ao carregar a página Home

    fetch(`${window.baseUrl}getusername?matricula=${matricula}`)
      .then((response) => response.json())
      .then((data) => {
        // Atualiza o estado com o nome retornado pela rota
        setUserName(data[0].name)
      })
      .catch((error) => console.error('Erro ao obter nome do usuário:', error));
    
  }, [location.pathname]);

  const handleLoanSubmission = () => {
    // Preparando os dados para enviar na solicitação POST
    const loanData = {
      toolCode: toolCode,
      toolName: toolName,
      toolQuantity: loanQuantity,
      dateHand: returnDate,
      receiver: receiverName,
      sender: userName, // Definindo o remetente como 'UserName'
      receiverEmail: receiverEmail,
      receiverPhone: receiverPhone
    };

    console.log(loanData);

    fetch(`${window.baseUrl}addloan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loanData),
    })
      .then(response => {
        if (response.ok) {
          // Lógica adicional caso a solicitação seja bem-sucedida
          console.log('Empréstimo realizado com sucesso!');
          window.location.reload();
        } else {
          throw new Error('Erro ao realizar empréstimo');
        }
      })
      .catch(error => {
        console.error('Erro ao realizar empréstimo:', error);
        // Lógica adicional para lidar com falhas na solicitação
      });
    
  };

  return (
    <Dialog.Root>
  <Dialog.Trigger>
    <Button variant="solid" color='orange'>Emprestar</Button>
  </Dialog.Trigger>

  <Dialog.Content style={{ maxWidth: 450 }}>
    <Dialog.Title>{toolName}</Dialog.Title>
    <Dialog.Description size="2" mb="4">
      Preencha os campos para emprestar a ferramenta.
    </Dialog.Description>

    <Flex direction="column" gap="3">
      <label >
        <Text as="div" size="2" mb="1" weight="bold">
          Nome do destinatário
        </Text>
        
        <TextField.Input 
          placeholder="Digite o nome completo"
          className='input_modal' value={receiverName} onChange={event => setReceiverName(event.target.value)}
        />
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Email do destinatário
        </Text>
        <TextField.Input
          type="email" 
          placeholder="Digite o email"
          className='input_modal'
          value={receiverEmail} onChange={event => setReceiverEmail(event.target.value)}
        />
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Telefone do destinatário
        </Text>
        <InputMask
          mask="(99) 99999-9999"
          placeholder="(99) 99999-9999"
          value={receiverPhone}
          onChange={(event) => setReceiverPhone(event.target.value)}
        >
          {(inputProps) => (
            <TextField.Input
              type="tel"
              className="input_modal"
              {...inputProps}
            />
          )}
        </InputMask>
      </label>
      <Flex gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Data de devolução
              </Text>
              <TextField.Input
                type="date"
                placeholder="Digite a data de devolução"
                className="input_modal"
                value={returnDate} onChange={event => setReturnDate(event.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Quantidade
              </Text>
              <TextField.Input
                type="number"
                placeholder="Digite a quantidade"
                style={{ width: '24.65rem' }}
                className="input_modal"
                value={loanQuantity} onChange={event => setLoanQuantity(event.target.value)}
              />
            </label>
          </Flex>
    </Flex>

    <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button color="red">Cancelar</Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button onClick={handleLoanSubmission} disabled={parseInt(loanQuantity, 10) > toolQuantity}>
            Emprestar
          </Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  </Dialog.Root>
  )
}

export default Loan