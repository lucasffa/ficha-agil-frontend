import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import SignIn from './SignIn/SignIn';
import { SideMenu, TopMenu } from './components/Menu/Menu';
import Home from './Home/Home';
import './styles/global.scss';
import CandidatoDashboard from './pages/candidato/candidatoDashboard/CandidatoDashboard';

export default function Rotas() {
  const location = useLocation();

  return (
    <div className={location.pathname === '/login' ? '' : 'app'}>
      {location.pathname === '/login' ? null : <SideMenu />}
      <div className={location.pathname === '/login' ? '' : 'main-content'}>
        {location.pathname === '/login' ? null : <TopMenu />}
        <main className={location.pathname === '/login' ? '' : 'areas'}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/candidato" element={<CandidatoDashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
