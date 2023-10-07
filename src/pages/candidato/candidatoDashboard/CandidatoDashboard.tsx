//import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
//import { toast } from 'react-toastify';
import editIcon from '../../../assets/images/edit.svg';
//import trashIcon from '../../../assets/images/trash.svg';
import { cpfMask } from '../../../Shared/Mascaras';
import './candidatoDashboard.scss';
import { Pagination } from '@mui/material';
import { ButtonLink } from '../../../components/Button/Button';
//import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../components/utils/axios';
import { toast } from 'react-toastify';

type UsuarioDashboardProps = {
  urlBase?: string;
};

export interface UsuarioProps {
  IDUSUARIO: number;
  USUARIO: string;
  EMAIL: string;
  CPF: string;
  ATIVO: string;
  TELEFONE?: string;
  //created_at: string;
}
type DashboardCandidatoProps = {
  NOMECOMPLETO: string;
  CPF: string;
  EMAIL: string;
};

export default function CandidatoDashboard({ urlBase }: UsuarioDashboardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [candidato, setCandidato] = useState<DashboardCandidatoProps[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const getFichas = useCallback(
    async (page: number, take: number, status: string) => {
      try {
        await axiosInstance
          .get('/fichas', {
            params: {
              page: page,
              take: take,
              ativo: status,
            },
          })
          .then(res => {
            setCandidato(res.data.fichasCandidatos);
            setTotalPages(res.data.totalDefichasCandidatos);
          });
      } catch (err: any) {
        const error = err.response?.data;
        Object.keys(error).map(key => {
          return toast.error(error[key]);
        });
      }
    },
    []
  );

  useEffect(() => {
    getFichas(currentPage, 5, 'S');
  }, [getFichas, currentPage]);

  function handleUsuariosInativos(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      //getFichas(1, 5, 'N');
    } else {
      //getFichas(1, 5, 'S');
    }
  }

  const numeroDePaginas = Math.ceil(totalPages / 5);

  return (
    <div className="container-dashboard-candidato">
      <main>
        <div className="busca-content">
          <h1 style={{ paddingLeft: '20px', paddingTop: '20px' }}>
            Candidatos
          </h1>
          <div className="busca-inativos-content">
            <input
              type="checkbox"
              id="busca-inativos"
              onChange={e => handleUsuariosInativos(e)}
            />
            <label htmlFor="busca-inativos">Mostrar candidatos inativos</label>
          </div>
        </div>
        <div className="listagem-candidato">
          <table>
            <thead>
              <tr>
                <th className="listagem-candidato-nome">Nome</th>
                <th className="listagem-candidato-cpf">CPF</th>
                <th className="listagem-candidato-email">Email</th>
                <th className="listagem-candidato-editar">Editar</th>
                {/* <th className="listagem-candidato-excluir">Excluir</th> */}
              </tr>
            </thead>
            <tbody>
              {candidato?.length > 0
                ? candidato?.map((usuario, index) => {
                    return (
                      <tr key={index}>
                        <td className="listagem-candidato-nome">
                          {usuario?.NOMECOMPLETO}
                        </td>
                        <td
                          className="listagem-candidato-cpf"
                          style={{
                            color: usuario?.CPF ? undefined : 'red',
                          }}
                        >
                          {cpfMask(usuario?.CPF) ?? 'Não cadastrado'}
                        </td>
                        <td className="listagem-candidato-email">
                          {usuario?.EMAIL ?? 'Não cadastrado'}
                        </td>
                        <td className="listagem-candidato-editar">
                          <button type="button" onClick={() => {}}>
                            <img src={editIcon} alt="Editar Candidato" />
                          </button>
                        </td>
                        {/* <td className="listagem-candidato-excluir">
                          <button>
                            <img src={trashIcon} alt="Excluir Candidato" />
                          </button>
                        </td> */}
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
        <div className="bottom">
          <Pagination
            count={numeroDePaginas}
            color="primary"
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
          />
          <ButtonLink
            className="button"
            pathname="/candidato/adicionar"
            name="Cadastrar nova ficha"
          ></ButtonLink>
        </div>
      </main>
    </div>
  );
}
