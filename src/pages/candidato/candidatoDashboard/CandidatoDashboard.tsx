import React from 'react';
import { Candidatos } from '../../dataFake';
import './candidatoDashboard.scss';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../../components/Button/Button';
import { TextField } from '@mui/material';

import editIcon from '../../../assets/images/edit.svg';
import trashIcon from '../../../assets/images/trash.svg';

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
      Cpf: '',
    },
  });

  return (
    <div className="container-dashboard-candidato">
      <main>
        <div className="busca-content">
          <h1 style={{ paddingLeft: '20px', paddingTop: '20px' }}>
            Candidatos
          </h1>
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
                  <TextField
                    id="outlined-basic"
                    label="Cpf do candidato"
                    color="primary"
                    variant="outlined"
                    type="text"
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
                <th className="listagem-candidatos-idade">Editar</th>
                <th className="listagem-candidatos-excluir">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {Candidatos.map((candidato, index) => {
                return (
                  <tr key={index}>
                    <td className="listagem-candidatos-nome">
                      {candidato.nome}
                    </td>
                    <td className="listagem-candidatos-cpf">{candidato.cpf}</td>
                    <td className="listagem-candidatos-idade">
                      {candidato.idade}
                    </td>
                    <td className="listagem-candidatos-editar">
                      <button>
                        <img src={editIcon} alt="Editar Candidato" />
                      </button>
                    </td>
                    <td className="listagem-candidatos-excluir">
                      <button>
                        <img src={trashIcon} alt="Excluir Candidato" />
                      </button>
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
