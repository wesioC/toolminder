import React from 'react'
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import "../styles/Tool.css";

const Tool = () => {
  return (
    <Flex direction="column" gap="6" right="3" align="center">
      <Form.Root className="FormRoot">
      <Text as="div" size="6" mb="1" weight="bold"  color='green'>
          Cadastro de Ferramentas:
        </Text>
        <br></br>
        <Form.Field className="FormField" name="email">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Código</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Campo obrigatório
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="email" required />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="email">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Nome da Ferramenta</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Campo obrigatório
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="email" required />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="email">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Quantidade disponível</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Campo obrigatório
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="email" required />
          </Form.Control>
        </Form.Field>



        <Form.Submit asChild>
          <Button className="Button" color='green' style={{ marginTop: 10 }}>
            Enviar
          </Button>
        </Form.Submit>
      </Form.Root>
    </Flex>
  )
}

export default Tool