import React from 'react';
export default function Dashboard() {
  console.log(localStorage.getItem('token'));
  return <h1 style={{ paddingLeft: '20px' }}>Bem vindo</h1>;
}
