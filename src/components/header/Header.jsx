import React, { useState, useEffect } from "react";
import './Header.css'
import { useLocation, useSearchParams } from 'react-router-dom';

function Header() {
  const [active, setActive] = useState('nav__menu');
  const [icon, setIcon] = useState('nav__toggler');
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const matricula = searchParams.get('matricula');

  useEffect(() => {
    if (matricula) {
      fetch(`${window.baseUrl}getusername?matricula=${matricula}`)
        .then((response) => response.json())
        .then((data) => {
          setUserName(data[0].name);
        })
        .catch((error) => console.error('Erro ao obter nome do usuário:', error));
    }
  }, [location.pathname, matricula]);

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  return (
    <nav className="nav">
      <a href={`/home?matricula=${matricula}`} className="nav__brand">
        <img src="http://painel.toolminder.online/img/ToolMinder.svg" alt="ToolMinder" />
      </a>
      <ul className={active}>
        <li className="nav__item"><a href={`/tool?matricula=${matricula}`} className="nav__link">Ferramentas</a></li>
        <li className="nav__item"><a href={`/historico?matricula=${matricula}`} className="nav__link">Histórico</a></li>
        <li className="nav__item"><a href={`/user?matricula=${matricula}`} className="nav__link">{userName}</a></li>
        <li className="nav__item"><a href="/" className="nav__link">Sair</a></li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Header;
