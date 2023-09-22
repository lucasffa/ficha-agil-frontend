import { Link, useLocation } from 'react-router-dom';
import './menu.scss';
import '../../styles/global.scss';
import menuIcon from '../../assets/images/menu.svg';
import closeMenuIcon from '../../assets/images/close.svg';
import sairIcon from '../../assets/images/exit.svg';
import dashboardIcon from '../../assets/images/align-right.svg';
import userIcon from '../../assets/images/user.svg';
import { useState } from 'react';
import uniqid from 'uniqid';

const sections = [
  {
    rota: 'dashboard',
    name: 'Dashboard',
    icon: dashboardIcon,
    isSubRota: false,
  },
  { rota: 'candidato', name: 'Candidato', icon: userIcon, isSubRota: false },
  { rota: 'usuario', name: 'Usuário', icon: userIcon, isSubRota: false },
  {
    rota: 'usuario/adicionar',
    name: 'Adicionar Usuário',
    icon: userIcon,
    isSubRota: true,
  },
  {
    rota: 'usuario/editar',
    name: 'Edição de Usuário',
    icon: userIcon,
    isSubRota: true,
  },
];

export function SideMenu() {
  const [hiddenMenu, setHiddenMenu] = useState(false);

  const location = useLocation();

  return (
    <aside className={hiddenMenu === false ? 'side-menu closed' : 'side-menu'}>
      {hiddenMenu === false ? (
        <button className="icon-open" onClick={() => setHiddenMenu(true)}>
          <img src={menuIcon} alt="IconMenu" />
        </button>
      ) : (
        <div className="container-menu">
          <button className="icon-close" onClick={() => setHiddenMenu(false)}>
            <img src={closeMenuIcon} alt="IconMenu" />
          </button>
          <div className="name-project">
            <h4>Itaka</h4>
            <div className="separator"></div>
            <h4>Escolápios</h4>
          </div>
        </div>
      )}
      {hiddenMenu === false ? (
        <Link
          to="/login"
          className="icon-exit"
          onClick={() => {
            localStorage.setItem('token', '');
            localStorage.setItem('user', '');
          }}
        >
          <img src={sairIcon} alt="Sair" />
        </Link>
      ) : (
        <>
          <nav>
            <ul>
              {sections.map(section =>
                section.rota && !section.isSubRota ? (
                  <li key={uniqid()}>
                    <img src={section.icon} alt="" />
                    <Link to={section.rota} key={uniqid()}>
                      {section.name}
                    </Link>
                    <span
                      key={uniqid()}
                      className={
                        location.pathname.replace('/', '') === section.rota
                          ? 'active-section'
                          : ''
                      }
                    />
                  </li>
                ) : null
              )}
            </ul>
          </nav>
          <Link
            to="/login"
            className="icon-exit-active"
            onClick={() => {
              localStorage.setItem('token', '');
              localStorage.setItem('user', '');
            }}
          >
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
      {sections.map(section =>
        location.pathname.replace('/', '') === section.rota ? (
          <h1 className="top-menu-name" key={uniqid()}>
            {section.name}
          </h1>
        ) : null
      )}
      <h1 className="user">Usuario: {localStorage.getItem('user')}</h1>
    </header>
  );
}
