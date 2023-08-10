import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import editIcon from '../../../assets/images/edit.svg';
import trashIcon from '../../../assets/images/trash.svg';
import { cpfMask, parseDate } from '../../../Shared/Mascaras';
import './usuarioDashboard.scss';
import { Pagination } from '@mui/material';
import { ButtonLink } from '../../../components/Button/Button';

type UsuarioDashboardProps = {
  urlBase: string;
};

export interface UsuarioProps {
  name: string;
  email: string;
  cpf_user: string;
  created_at: string;
}

export default function UsuarioDashboard({ urlBase }: UsuarioDashboardProps) {
  const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getUsuarios(currentPage, 5);
  }, [currentPage]);

  async function getUsuarios(page: number, take: number) {
    try {
      await axios
        .get(`${urlBase}/users`, {
          params: {
            page: page,
            take: take,
          },
        })
        .then(res => {
          setUsuarios(res.data.users);
          setTotalPages(res.data.totalDeUsuarios);
        });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }

  const numeroDePaginas = Math.ceil(totalPages / 5);
  return (
    <div className="container-dashboard-usuario">
      <main>
        <div className="busca-content">
          <h1 style={{ paddingLeft: '20px', paddingTop: '20px' }}>Usuários</h1>
        </div>
        <div className="listagem-usuario">
          <table>
            <thead>
              <tr>
                <th className="listagem-usuario-nome">Nome</th>
                <th className="listagem-usuario-cpf">CPF</th>
                <th className="listagem-usuario-email">Email</th>
                <th className="listagem-usuario-date">Data de Criação</th>
                <th className="listagem-usuario-editar">Editar</th>
                <th className="listagem-usuario-excluir">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {usuarios?.length > 0
                ? usuarios?.map((usuario, index) => {
                    return (
                      <tr key={index}>
                        <td className="listagem-usuario-nome">
                          {usuario?.name}
                        </td>
                        <td
                          className="listagem-usuario-cpf"
                          style={{
                            color: usuario?.cpf_user ? undefined : 'red',
                          }}
                        >
                          {cpfMask(usuario?.cpf_user) ?? 'Não cadastrado'}
                        </td>
                        <td className="listagem-usuario-email">
                          {usuario?.email ?? 'Não cadastrado'}
                        </td>
                        <td className="listagem-usuario-date">
                          {parseDate(usuario?.created_at)}
                        </td>
                        <td className="listagem-usuario-editar">
                          <button>
                            <img src={editIcon} alt="Editar Candidato" />
                          </button>
                        </td>
                        <td className="listagem-usuario-excluir">
                          <button>
                            <img src={trashIcon} alt="Excluir Candidato" />
                          </button>
                        </td>
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
            path="/usuario/adicionar"
            name="Adicionar usuário"
          ></ButtonLink>
        </div>
      </main>
    </div>
  );
}
