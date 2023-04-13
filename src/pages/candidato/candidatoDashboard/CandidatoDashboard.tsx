import React from 'react';
import { Candidatos } from '../../dataFake';
import './candidatoDashboard.scss';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../../components/Button/Button';

// type CandidatoDashboardProps = {
//   candidatos: CandidatosProps;
// }

interface CandidatoFilterProps {
  Nome: string;
  Cpf: string;
  //Status: string;
}
export default function CandidatoDashboard() {
  const { control, handleSubmit } = useForm<CandidatoFilterProps>({
    mode: 'onBlur',
    defaultValues: {
      Nome: '',
      Cpf: '',
    },
  });
  return (
    <div className="container-dashboard-candidato">
      <main>
        <h1 style={{ paddingLeft: '20px', paddingTop: '20px' }}>Candidatos</h1>
        <div className="busca-content">
          <form
            onSubmit={handleSubmit((data, event) => {
              event?.preventDefault();

              if (data) {
                console.log(data);
              }
            })}
          >
            <Controller
              control={control}
              name="Cpf"
              render={({ field }) => {
                return (
                  <input
                    type="text"
                    placeholder="Cpf do Candidato"
                    {...field}
                  />
                );
              }}
            />
            <br />
            <Controller
              control={control}
              name="Nome"
              render={({ field }) => {
                return (
                  <input
                    type="text"
                    placeholder="Nome do Candidato"
                    {...field}
                  />
                );
              }}
            />
            <Button className="button">Filtrar</Button>
          </form>
        </div>
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
                    <td className="listagem-candidatos-nome">
                      {candidato.nome}
                    </td>
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
      </main>
    </div>
  );
}
