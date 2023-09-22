import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import editIcon from '../../../assets/images/edit.svg';
import trashIcon from '../../../assets/images/trash.svg';
import { cpfMask } from '../../../Shared/Mascaras';
import './usuarioDashboard.scss';
import { Pagination } from '@mui/material';
import { ButtonLink } from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../components/utils/axios';

export interface UsuarioProps {
  IDUSUARIO: number;
  USUARIO: string;
  EMAIL: string;
  CPF: string;
  ATIVO: string;
  TELEFONE?: string;
  //created_at: string;
}

export default function UsuarioDashboard() {
  const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [dadosUsuarioEditar, setDadosUsuarioEditar] = useState<UsuarioProps>();
  const navigate = useNavigate();

  const getUsuarios = useCallback(
    async (page: number, take: number, status: string) => {
      try {
        await axiosInstance
          .get('/users', {
            params: {
              page: page,
              take: take,
              ativo: status,
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
    },
    []
  );

  useEffect(() => {
    getUsuarios(currentPage, 5, 'S');
  }, [getUsuarios, currentPage]);

  async function getDadosUsuarioEditar(idUsuario: number) {
    try {
      await axiosInstance
        .get(`/user`, {
          params: {
            IDUSUARIO: idUsuario,
          },
        })
        .then(res => {
          setDadosUsuarioEditar(res.data);
        });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }

  useEffect(() => {
    if (dadosUsuarioEditar !== undefined) {
      navigate('/usuario/editar', {
        state: {
          ValuesRefDadosUsuario: dadosUsuarioEditar,
        },
      });
    }
  }, [dadosUsuarioEditar, navigate]);

  function handleUsuariosInativos(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      getUsuarios(1, 5, 'N');
    } else {
      getUsuarios(1, 5, 'S');
    }
  }

  const numeroDePaginas = Math.ceil(totalPages / 5);

  return (
    <div className="container-dashboard-usuario">
      <main>
        <div className="busca-content">
          <h1 style={{ paddingLeft: '20px', paddingTop: '20px' }}>Usuários</h1>
          <div className="busca-inativos-content">
            <input
              type="checkbox"
              id="busca-inativos"
              onChange={e => handleUsuariosInativos(e)}
            />
            <label htmlFor="busca-inativos">Mostrar usuários inativos</label>
          </div>
        </div>
        <div className="listagem-usuario">
          <table>
            <thead>
              <tr>
                <th className="listagem-usuario-nome">Nome</th>
                <th className="listagem-usuario-cpf">CPF</th>
                <th className="listagem-usuario-email">Email</th>
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
                          {usuario?.USUARIO}
                        </td>
                        <td
                          className="listagem-usuario-cpf"
                          style={{
                            color: usuario?.CPF ? undefined : 'red',
                          }}
                        >
                          {cpfMask(usuario?.CPF) ?? 'Não cadastrado'}
                        </td>
                        <td className="listagem-usuario-email">
                          {usuario?.EMAIL ?? 'Não cadastrado'}
                        </td>
                        <td className="listagem-usuario-editar">
                          <button
                            type="button"
                            onClick={() => {
                              getDadosUsuarioEditar(usuario.IDUSUARIO);
                            }}
                          >
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
            pathname="/usuario/adicionar"
            name="Adicionar usuário"
          ></ButtonLink>
        </div>
      </main>
    </div>
  );
}
