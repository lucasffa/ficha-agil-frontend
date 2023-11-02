import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import SignIn from './pages/signIn/SignIn';
import { SideMenu, TopMenu } from './components/Menu/Menu';
import Relatorios from './pages/relatorios/Relatorios';
import './styles/global.scss';
import CandidatoDashboard from './pages/candidato/candidatoDashboard/CandidatoDashboard';
import uniqid from 'uniqid';
import Copyright from './Shared/Copyright';
import PrivateRoutes from './components/utils/PrivateRoutes';
import NotFound from './components/utils/NotFound';
import UsuarioDashboard from './pages/usuario/UsuarioDashboard/UsuarioDashboard';
import AdicionarUsuario from './pages/usuario/AdicionarUsuario/AdicionarUsuario';
import EditarUsuario from './pages/usuario/EditarUsuario/EditarUsuario';
import { CandidatoFicha } from './pages/candidato/candidatoFicha/CandidatoFicha';

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
            <Route path="/login" element={<SignIn />} key={uniqid()} />
            <Route element={PrivateRoutes(validateToken)}>
              {/* NotFound rota */}
              <Route path="*" element={<NotFound />} />
              {/* Dashboard rota */}
              <Route
                path="/relatorios"
                element={<Relatorios />}
                key={uniqid()}
              />
              {/* Candidato/ficha rotas */}
              <Route
                path="/candidato"
                element={<CandidatoDashboard />}
                key={uniqid()}
              />
              <Route
                path="/candidato/adicionar"
                element={<CandidatoFicha />}
                key={uniqid()}
              />
              <Route
                path="/candidato/editar"
                element={<CandidatoFicha />}
                key={uniqid()}
              />
              {/* Usuário rotas */}
              <Route
                path="/usuario"
                element={<UsuarioDashboard />}
                key={uniqid()}
              />
              <Route
                path="/usuario/adicionar"
                element={<AdicionarUsuario />}
                key={uniqid()}
              />
              <Route
                path="/usuario/editar"
                element={<EditarUsuario />}
                key={uniqid()}
              />
            </Route>
          </Routes>
        </main>
        <Copyright />
      </div>
    </div>
  );
}
