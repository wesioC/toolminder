import React, {useState} from "react";
import './Header.css'

function Header() {
    const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");
    

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
    return (
        <nav className="nav">
            <a href="/" className="nav__brand"><img src="\src\img\toolminder.svg"></img></a>
            <ul className={active}>
                <li className="nav__item"><a href="/tool" className="nav__link">Ferramentas</a></li>
                <li className="nav__item"><a href="/loan" className="nav__link">Emprestimos</a></li>
                <li className="nav__item"><a href="/user" className="nav__link">Wilker</a></li>
                <li className="nav__item"><a href="#" className="nav__link" >sair</a></li>
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