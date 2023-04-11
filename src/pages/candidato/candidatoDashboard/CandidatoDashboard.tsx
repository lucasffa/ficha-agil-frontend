import React from 'react';
import { Candidatos } from '../../dataFake';
import './candidatoDashboard.scss';

// type CandidatoDashboardProps = {
//   candidatos: CandidatosProps;
// }

export default function CandidatoDashboard() {
  return (
    <>
      <h1 style={{ paddingLeft: '20px', paddingTop: '20px' }}>Candidatos</h1>
      <div className="listagem-candidatos">
        <table>
          <thead>
            <tr>
              <th className="listagem-candidatos-nome">Nome</th>
              <th className="listagem-candidatos-cpf">CPF</th>
              <th className="listagem-candidatos-idade">Idade</th>
            </tr>
          </thead>
          <tbody>
            {Candidatos.map(candidato => {
              return (
                <tr key={candidato.id}>
                  <td className="listagem-candidatos-nome">{candidato.nome}</td>
                  <td className="listagem-candidatos-cpf">{candidato.cpf}</td>
                  <td className="listagem-candidatos-idade">
                    {candidato.idade}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
