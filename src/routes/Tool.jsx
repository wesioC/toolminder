import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import "../styles/Tool.css";
import { FaSearch } from 'react-icons/fa';
import TableAllTool from '../components/tablealltool/TableAllTool';
import Header from '../components/header/Header';

const Tool = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const matricula = params.get('matricula') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [toolCode, setToolCode] = useState('');
  const [toolName, setToolName] = useState('');
  const [toolQuantity, setToolQuantity] = useState('');

  // Dentro do componente Tool, adicione o novo estado
  const [isUploading, setIsUploading] = useState(false);
  const [buttonText, setButtonText] = useState('Enviar Arquivo');


  // Funções para atualizar os estados quando os inputs mudarem
  const handleToolCodeChange = (event) => {
    setToolCode(event.target.value);
  };

  const handleToolNameChange = (event) => {
    setToolName(event.target.value);
  };

  const handleToolQuantityChange = (event) => {
    setToolQuantity(event.target.value);
  };

  // Função para imprimir as informações no terminal
  const handleAddButtonClick = async () => {
    const toolData = {
      toolCode: toolCode,
      toolName: toolName,
      toolQuantity: toolQuantity 
    };
  
    try {
      const response = await fetch(`${window.baseUrl}addtools`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toolData)
      });
  
      if (!response.ok) {
        throw new Error('Erro ao adicionar a ferramenta');
      }
  
      const data = await response.json();
      console.log('Resposta do servidor:', data);
      setToolCode('');
      setToolName('');
      setToolQuantity('');
    } catch (error) {
      console.error('Erro ao adicionar a ferramenta:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
  
    setIsUploading(true); // Desabilita o botão e inicia o upload
    setButtonText('Enviando...'); // Opção para indicar que está em progresso
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch(`${window.baseUrl}uploadtools`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Erro ao enviar arquivo');
      }
  
      const data = await response.json();
      console.log('Arquivo enviado com sucesso:', data.message);
      setButtonText('Objetos cadastrados!'); // Altera o texto do botão após sucesso
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
      setButtonText('Erro no envio! Tente novamente'); // Opção para indicar erro
    } finally {
      setIsUploading(false); // Reabilita o botão após a conclusão do upload
    }
  };  

  return (
    <>
    <Header matricula={matricula} /> 
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
            <input className="Input" required  value={toolCode} onChange={handleToolCodeChange}/>
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
            <input className="Input" value={toolName} onChange={handleToolNameChange} required />
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
            <input className="Input" type="number" value={toolQuantity} onChange={handleToolQuantityChange} required />
          </Form.Control>
        </Form.Field>

        



        <Form.Submit asChild>
          <Button className="Button" color='green' style={{ marginTop: 10 }} onClick={handleAddButtonClick}>
            Enviar
          </Button>
        </Form.Submit>
      </Form.Root>

      <Form.Root className="FormRoot">
        <Form.Field className="FormField">
            <Form.Label className="FormLabel">Upload de Arquivo Excel</Form.Label>
            <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} disabled={isUploading} />
            {isUploading ? (
              <Button className="Button" disabled={true}>
                {buttonText}
              </Button>
            ) : (
              <Button className="Button" onClick={() => {}}>{buttonText}</Button>
            )}
        </Form.Field>
      </Form.Root>

      <div className='div__input'>
        <TextField.Root className='input__busca'>
          <TextField.Slot>
            <FaSearch />
          </TextField.Slot>
          <TextField.Input
            radius="full"
            placeholder="Digite o nome ou código da ferramenta"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </TextField.Root>
      </div>

      <TableAllTool searchTerm={searchTerm} />
      <div className='margin__'></div>
    </Flex>
    </>
  )
}

export default Tool