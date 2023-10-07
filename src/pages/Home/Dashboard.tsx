import React from 'react';
export default function Dashboard() {
  function saudacao() {
    const horaAtual = new Date().getHours();

    if (horaAtual >= 5 && horaAtual < 12) {
      return 'Bom dia';
    } else if (horaAtual >= 12 && horaAtual < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }

  const usuario = localStorage.getItem('user');

  return (
    <React.Fragment>
      <h1 style={{ paddingLeft: '20px', paddingTop: '20px' }}>Dashboard</h1>
      <h4 style={{ paddingLeft: '20px' }}>
        {saudacao()}, {usuario}, bem-vindo!
      </h4>
    </React.Fragment>
  );
}
