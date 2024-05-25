import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Dialog, Flex, Text, TextField, Separator } from '@radix-ui/themes';
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
  const [isUploading, setIsUploading] = useState(false);
  const [buttonText, setButtonText] = useState('Enviar Arquivo');

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;

    document.body.appendChild(notification);

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

  const handleToolCodeChange = (event) => {
    setToolCode(event.target.value);
  };

  const handleToolNameChange = (event) => {
    setToolName(event.target.value);
  };

  const handleToolQuantityChange = (event) => {
    setToolQuantity(event.target.value);
  };

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
      showNotification('Ferramenta cadastrada com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao adicionar a ferramenta:', error);
      showNotification('Erro ao cadastrar a ferramenta', 'error');
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    setIsUploading(true);
    setButtonText('Enviando...');

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
      setButtonText('Objetos cadastrados!');
      showNotification('Arquivo enviado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
      setButtonText('Erro no envio! Tente novamente');
      showNotification('Erro ao enviar arquivo', 'error');
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <>
      <Header matricula={matricula} />
      <Flex direction="column" gap="6" right="3" align="center">
        <Form.Root className="FormRoot">
          <Text as="div" size="6" mb="1" weight="bold" color='green' className="title-center">
            Cadastro de Ferramentas:
          </Text>
          <br></br>

          <div className="warning-note">
            Para inserir ferramentas de propriedade do Marconi adicione M+cod. Para adicionar de propriedade do Frederico F+cod e de propriedade do IF Goiano apenas cod.
          </div>

          <Form.Field className="FormField" name="email">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Form.Label className="FormLabel">Código</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Campo obrigatório
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className="Input" required value={toolCode} onChange={handleToolCodeChange} />
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
            <Text as="div" size="6" mb="1" weight="bold" color='green' className="title-center">
              Cadastro de Ferramentas com Planilha Excel:
            </Text>
            <div className="warning-note">
              Para inserir as ferramentas corretamente a planilha deve conter as colunas a seguir: <br /> CÓDIGO - NOME DA FERRAMENTA - QUANTIDADE
            </div>
            <br></br>

            <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} disabled={isUploading} style={{ color: "gray" }} />
            {isUploading ? (
              <Button className="Button" disabled={true}>
                {buttonText}
              </Button>
            ) : (
              <Button className="Button" color='green' style={{ marginTop: 10 }} onClick={() => { }}>{buttonText}</Button>
            )}
          </Form.Field>
        </Form.Root>

        <Separator orientation="horizontal" size="4" color='green' />

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

        <div className="responsive-text">
          <h4>Todos os Materias Cadastrados:</h4>
          <TableAllTool searchTerm={searchTerm} />
        </div>
        <div className='margin__'></div>
      </Flex>
    </>
  );
}

export default Tool;
