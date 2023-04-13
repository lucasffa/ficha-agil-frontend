//chatGpt

import { Link, useLocation } from 'react-router-dom';
import './menu.scss';
import '../../styles/global.scss';
import menuIcon from '../../assets/images/menu.svg';
import closeMenuIcon from '../../assets/images/close.svg';
import sairIcon from '../../assets/images/exit.svg';
import { useState } from 'react';

const sections = [
  { rota: 'dashboard', name: 'Dashboard' },
  { rota: 'candidato', name: 'Candidato' },
  { rota: 'usuario', name: 'Usuário' },
];

export function SideMenu() {
  const [hiddenMenu, setHiddenMenu] = useState(false);

  return (
    <aside className={hiddenMenu === false ? 'side-menu closed' : 'side-menu'}>
      {hiddenMenu === false ? (
        <button className="icon-open" onClick={() => setHiddenMenu(true)}>
          <img src={menuIcon} alt="IconMenu" />
        </button>
      ) : (
        <button className="icon-close" onClick={() => setHiddenMenu(false)}>
          <img src={closeMenuIcon} alt="IconMenu" />
        </button>
      )}
      {hiddenMenu === false ? (
        <Link to="/login" className="icon-exit">
          <img src={sairIcon} alt="Sair" />
        </Link>
      ) : (
        <>
          <nav>
            <ul>
              {sections.map((section, idx) => (
                <li key={idx}>
                  <Link to={section.rota} key={idx}>
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link to="/login" className="icon-exit-active">
            <img src={sairIcon} alt="Sair" />
          </Link>
        </>
      )}
    </aside>
  );
}

export function TopMenu() {
  const location = useLocation();

  return (
    <header className="top-menu">
      {sections.map((section, idx) =>
        location.pathname.replace('/', '') === section.rota ? (
          <h1 className="top-menu-name" key={idx}>
            {section.name}
          </h1>
        ) : null
      )}
    </header>
  );
}
