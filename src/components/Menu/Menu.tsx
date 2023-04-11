//chatGpt

import { Link, useLocation } from 'react-router-dom';
import './menu.scss';
import '../../styles/global.scss';
import menuIcon from '../../assets/images/menu.svg';
import closeMenuIcon from '../../assets/images/close.svg';
import sairIcon from '../../assets/images/exit.svg';
import { useState } from 'react';

export function SideMenu() {
  const [hiddenMenu, setHiddenMenu] = useState(false);

  const sections = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'candidato', name: 'Candidato' },
    { id: 'voluntario', name: 'Voluntário' },
    { id: 'usuario', name: 'Usuário' },
  ];

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
              {sections.map(section => (
                <li key={section.id}>
                  <Link to={section.id}>{section.name}</Link>
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

  const sections = [
    { id: 'dashboard', name: 'Dashboard', key: 1 },
    { id: 'candidato', name: 'Candidato', key: 2 },
    { id: 'voluntario', name: 'Voluntário', key: 3 },
    { id: 'usuario', name: 'Usuário', key: 4 },
  ];

  return (
    <header className="top-menu">
      {sections.map(section =>
        location.pathname.replace('/', '') === section.id ? (
          <h1 className="top-menu-name" key={section.id}>
            {section.name}
          </h1>
        ) : null
      )}
    </header>
  );
}
