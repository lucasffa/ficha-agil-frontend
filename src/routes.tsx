import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import SignIn from './SignIn/SignIn';
import { SideMenu, TopMenu } from './components/Menu/Menu';
import Dashboard from './pages/Home/Dashboard';
import './styles/global.scss';
import CandidatoDashboard from './pages/candidato/candidatoDashboard/CandidatoDashboard';
import uniqid from 'uniqid';
import Copyright from './Shared/Copyright';
import { urlBase } from './services/Axios/axios';
import PrivateRoutes from './components/utils/PrivateRoutes';
import NotFound from './components/utils/NotFound';
import UsuarioDashboard from './pages/usuario/UsuarioDashboard/UsuarioDashboard';
import AdicionarUsuario from './pages/usuario/AdicionarUsuario/AdicionarUsuario';
import EditarUsuario from './pages/usuario/EditarUsuario/EditarUsuario';

export default function Rotas() {
  const location = useLocation();
  const validateToken = localStorage.getItem('token') ? true : false;

  return (
    <div className={location.pathname === '/login' ? '' : 'app'}>
      {location.pathname === '/login' ? null : <SideMenu />}
      <div className={location.pathname === '/login' ? '' : 'main-content'}>
        {location.pathname === '/login' ? null : <TopMenu />}
        <main className={location.pathname === '/login' ? '' : 'areas'}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} key={uniqid()} />
            <Route
              path="/login"
              element={<SignIn urlBase={urlBase} />}
              key={uniqid()}
            />
            <Route element={PrivateRoutes(validateToken)}>
              <Route path="/dashboard" element={<Dashboard />} key={uniqid()} />
              <Route
                path="/candidato"
                element={<CandidatoDashboard />}
                key={uniqid()}
              />
              <Route
                path="/usuario"
                element={<UsuarioDashboard urlBase={urlBase} />}
                key={uniqid()}
              />
            </Route>

            <Route
              path="/usuario/adicionar"
              element={<AdicionarUsuario urlBase={urlBase} />}
              key={uniqid()}
            />
            <Route
              path="/usuario/editar"
              element={<EditarUsuario urlBase={urlBase} />}
              key={uniqid()}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Copyright />
      </div>
    </div>
  );
}
