import React from 'react'
import {Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import "./Loan.css"

const Loan = () => {
  return (
    <Dialog.Root>
  <Dialog.Trigger>
    <Button variant="solid" color='orange'>Emprestar</Button>
  </Dialog.Trigger>

  <Dialog.Content style={{ maxWidth: 450 }}>
    <Dialog.Title>ToolName{}</Dialog.Title>
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
          className='input_modal'
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
        />
      </label>
      <Flex gap="3" alignItems="center" >
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Data de devolução
              </Text>
              <TextField.Input
                type="date"
                placeholder="Digite a data de devolução"
                className="input_modal"
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
              />
            </label>
          </Flex>
    </Flex>

    <Flex gap="3" mt="4" justify="end">
      <Dialog.Close>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button>Save</Button>
      </Dialog.Close>
    </Flex>
  </Dialog.Content>
</Dialog.Root>
  )
}

export default Loan