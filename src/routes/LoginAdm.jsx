import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginAdm.css';
import { Flex, TextField, Button } from '@radix-ui/themes';
import Footer from '../components/footer/Footer';

const LoginAdm = () => {
  let [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');  

  const handleLogin = async () => {
    const response = await fetch(`${window.baseUrl}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        matricula: matricula,
        senha: senha,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      // Se o login for bem-sucedido, redireciona para a página Home
      navigate(`/home?matricula=${matricula}`);
      // Atualiza o estado com o nome de usuário retornado na resposta
      setUserName(data.userName); // Supondo que o nome retornado esteja em data.userName
    } else {
      // Caso contrário, mostra uma mensagem de erro (pode ser exibido no frontend)
      console.log(data.error);
    }
  };

  // const handleLogin = async () => {
  //   matricula = 1;
  //   navigate(`/home?matricula=${matricula}`);
  // };

  return (
    <>
      <Flex className="body__">
        <div className="blurred-box">
          <div className="user-login-box">
          <a href="/" className="logo_login" ><img src="https://painel.toolminder.online/img/ToolMinder.svg"></img></a>
            <span className="user-icon"></span>
            <div className="user-name"></div>
            <label className="input_login">
              <TextField.Input
                placeholder="Matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
              />
            </label>
            <label className="input_login">
              <TextField.Input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </label>
            <Button onClick={handleLogin} className="button__" radius="full">
              Entrar
            </Button>
          </div>
        </div>
      </Flex>
    </>
  );
};

export default LoginAdm;
