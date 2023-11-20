import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import editIcon from '../../../assets/images/edit.svg';
import inativoIcon from '../../../assets/images/inativo-icon.svg';
import ativoIcon from '../../../assets/images/ativo-icon.svg';
import closeIcon from '../../../assets/images/close.svg';
import { cpfMask } from '../../../Shared/Mascaras';
import './candidatoDashboard.scss';
import { Pagination } from '@mui/material';
import { ButtonLink } from '../../../components/Button/Button';
import axiosInstance from '../../../components/utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FichaEdit } from '../candidatoFicha/CandidatoFicha';
import BlockUI from '../../../components/utils/BlockUI/BlockUI';
import Modal from '../../../Shared/Modal';

type CandidatoDashboardProps = {
  urlBase?: string;
};

type CandidatoProps = {
  NOMECOMPLETO: string;
  CPF: string;
  EMAIL: string;
  ATIVO: string;
  IDFICHA: number;
}[];

export default function CandidatoDashboard({
  urlBase,
}: CandidatoDashboardProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [candidato, setCandidato] = useState<CandidatoProps>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterInativos, setIsFilterInativos] = useState<string>('S');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [idFicha, setIdFicha] = useState<number>(0);
  const [fichaCandidato, setFichaCandidato] = useState<FichaEdit>();
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const getFichas = useCallback(
    async (page: number, take: number, status: string) => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getFichaCandidato = useCallback(async (IDFICHA: number) => {
    try {
      setIsLoading(true);
      await axiosInstance
        .get(`/ficha`, {
          params: {
            idFicha: IDFICHA,
          },
        })
        .then(res => {
          setFichaCandidato(res.data.ficha);
        });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getFichas(currentPage, 5, isFilterInativos);
  }, [getFichas, currentPage, isFilterInativos]);

  function handleCandidatosInativos(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      getFichas(1, 5, 'N');
      setIsFilterInativos('N');
    } else {
      getFichas(1, 5, 'S');
      setIsFilterInativos('S');
    }
  }

  const handleEdit = useCallback(
    function () {
      if (isEdit && fichaCandidato !== undefined) {
        navigate('/candidato/editar', {
          state: {
            valuesEditFicha: {
              isEdit: isEdit,
              idFicha: idFicha,
              ficha: fichaCandidato,
            },
          },
        });
      }
    },
    [isEdit, navigate, idFicha, fichaCandidato]
  );

  useEffect(() => {
    handleEdit();
  }, [isEdit, navigate, handleEdit, idFicha]);

  const numeroDePaginas = Math.ceil(totalPages / 5);

  async function deleteCandidato(idFicha: number) {
    try {
      setIsLoading(true);
      await axiosInstance
        .delete('/deleteFicha', {
          params: {
            idFicha: idFicha,
          },
        })
        .then(res => {
          setModalOpen(false);
          toast.success(res.data.message);
        });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    } finally {
      setModalOpen(false);
      setIsLoading(false);
      getFichas(currentPage, 5, isFilterInativos);
    }
  }

  const handleExcluirCandidato = (fichaId: number) => {
    deleteCandidato(fichaId);
  };
  return (
    <div className="container-dashboard-candidato">
      <BlockUI blocking={isLoading} />

      <main>
        <div className="busca-content">
          <h1 style={{ paddingLeft: '20px', paddingTop: '20px' }}>
            Candidatos
          </h1>
          <div className="busca-inativos-content">
            <input
              type="checkbox"
              id="busca-inativos"
              onChange={e => handleCandidatosInativos(e)}
            />
            <label htmlFor="busca-inativos">Mostrar candidatos inativos</label>
          </div>
        </div>

        {!isLoading && (
          <React.Fragment>
            <div className="listagem-candidato">
              <table>
                <thead>
                  <tr>
                    <th className="listagem-candidato-nome">Nome</th>
                    <th className="listagem-candidato-cpf">CPF</th>
                    <th className="listagem-candidato-email">Email</th>
                    <th className="listagem-candidato-editar">Editar</th>
                    <th className="listagem-candidato-status">Status</th>
                    {isFilterInativos === 'N' ? null : (
                      <th className="listagem-candidato-excluir">Excluir</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {candidato?.length > 0
                    ? candidato?.map((candidato, index) => {
                        return (
                          <tr key={index}>
                            <td className="listagem-candidato-nome">
                              {candidato?.NOMECOMPLETO}
                            </td>
                            <td
                              className="listagem-candidato-cpf"
                              style={{
                                color: candidato?.CPF ? undefined : 'red',
                              }}
                            >
                              {cpfMask(candidato?.CPF) ?? 'Não cadastrado'}
                            </td>
                            <td className="listagem-candidato-email">
                              {candidato?.EMAIL === ''
                                ? 'Não cadastrado'
                                : candidato?.EMAIL}
                            </td>
                            <td className="listagem-candidato-editar">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsEdit(true);
                                  setIdFicha(candidato?.IDFICHA);
                                  getFichaCandidato(candidato?.IDFICHA);
                                  handleEdit();
                                }}
                              >
                                <img src={editIcon} alt="Editar Candidato" />
                              </button>
                            </td>
                            <td className="listagem-candidato-status">
                              {candidato.ATIVO === 'S' ? (
                                <span>
                                  <img
                                    src={ativoIcon}
                                    alt="Candidato Ativo"
                                    title="Candidato Ativo"
                                  />
                                </span>
                              ) : (
                                <span>
                                  <img
                                    src={inativoIcon}
                                    alt="Candidato Inativo"
                                    title="Candidato Inativo"
                                  />
                                </span>
                              )}
                            </td>
                            {isFilterInativos === 'N' ? null : (
                              <td className="listagem-candidato-excluir">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIdFicha(candidato?.IDFICHA);
                                    setModalOpen(true);
                                  }}
                                >
                                  <img
                                    src={closeIcon}
                                    alt="Excluir Candidato"
                                  />
                                </button>
                              </td>
                            )}
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
            <Modal
              title="Exclusão de Ficha"
              isOpen={modalOpen}
              setModalOpen={() => setModalOpen(!modalOpen)}
              handleConfirm={() => {
                handleExcluirCandidato(idFicha);
              }}
            >
              Tem certeza que deseja excluir a ficha do candidato?
            </Modal>
          </React.Fragment>
        )}
      </main>
    </div>
  );
}
