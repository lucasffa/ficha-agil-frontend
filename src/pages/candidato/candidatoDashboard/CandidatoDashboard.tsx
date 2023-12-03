import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import editIcon from '../../../assets/images/edit.svg';
import inativoIcon from '../../../assets/images/inativo-icon.svg';
import viewIcon from '../../../assets/images/view.svg';
import ativoIcon from '../../../assets/images/ativo-icon.svg';
import closeIcon from '../../../assets/images/close.svg';
import { cpfMask, removeMask } from '../../../Shared/Mascaras';
import './candidatoDashboard.scss';
import { Alert, Grid, Pagination, TextField } from '@mui/material';
import { Button, ButtonLink } from '../../../components/Button/Button';
import axiosInstance from '../../../components/utils/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FichaEdit } from '../candidatoFicha/CandidatoFicha';
import BlockUI from '../../../components/utils/BlockUI/BlockUI';
import Modal from '../../../Shared/Modal';
import { Controller, useForm } from 'react-hook-form';
import { InputComMascara, MascaraInput } from '../../../Shared/InputPadraoForm';
import { AxiosError } from 'axios';

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

interface FiltroBuscaCandidato {
  Nome: string;
  Cpf: string;
}
export default function CandidatoDashboard({
  urlBase,
}: CandidatoDashboardProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [candidato, setCandidato] = useState<CandidatoProps>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterInativos, setIsFilterInativos] = useState<string>('S');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);
  const [idFicha, setIdFicha] = useState<number>(0);
  const [fichaCandidato, setFichaCandidato] = useState<FichaEdit>();
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isFichaCandidatoFiltrado, setIsFichaCandidatoFiltrado] =
    useState(false);

  const { control, getValues, setValue } = useForm<FiltroBuscaCandidato>({
    mode: 'onBlur',
    defaultValues: {
      Nome: '',
      Cpf: '',
    },
    criteriaMode: 'all',
  });
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
      } catch (err) {
        const errorResponse = err as AxiosError;
        const error = errorResponse.response?.data as Record<string, string>;
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

  const getFichaCandidatoFiltrado = useCallback(
    async (
      Nome: string,
      Cpf: string,
      Ativo: string,
      page: number,
      take: number
    ) => {
      try {
        setIsLoading(true);
        setIsFichaCandidatoFiltrado(true);
        await axiosInstance
          .get(`/fichaCandidatoFilter`, {
            params: {
              nome: Nome,
              cpf: Cpf,
              ativo: Ativo,
              page: page,
              take: take,
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
  useEffect(() => {
    !isFichaCandidatoFiltrado
      ? getFichas(currentPage, 5, isFilterInativos)
      : getFichaCandidatoFiltrado(
          getValues('Nome'),
          removeMask(getValues('Cpf')),
          isFilterInativos,
          currentPage,
          5
        );
  }, [
    getFichas,
    getFichaCandidatoFiltrado,
    currentPage,
    isFilterInativos,
    getValues,
    isFichaCandidatoFiltrado,
  ]);

  function handleCandidatosInativos(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setIsFilterInativos('N');
      if (!isFichaCandidatoFiltrado) {
        getFichas(1, 5, 'N');
      } else {
        setCurrentPage(1);
        getFichaCandidatoFiltrado(
          getValues('Nome'),
          removeMask(getValues('Cpf')),
          'N',
          1,
          5
        );
      }
    } else {
      setIsFilterInativos('S');
      if (!isFichaCandidatoFiltrado) {
        getFichas(1, 5, 'S');
      } else {
        setCurrentPage(1);
        getFichaCandidatoFiltrado(
          getValues('Nome'),
          removeMask(getValues('Cpf')),
          'S',
          1,
          5
        );
      }
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

  const handleView = useCallback(
    function () {
      if (isView && fichaCandidato !== undefined) {
        navigate('/candidato/imprimir', {
          state: {
            valuesImpressaoFicha: {
              isView: isView,
              idFicha: idFicha,
              ficha: fichaCandidato,
            },
          },
        });
      }
    },
    [isView, navigate, idFicha, fichaCandidato]
  );

  useEffect(() => {
    handleView();
  }, [isView, navigate, handleView, idFicha]);

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
        <div className="filtros-busca-candidato">
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Controller
                control={control}
                name="Nome"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    id="outlined-basic-12"
                    label="Nome do Candidato"
                    color="primary"
                    variant="outlined"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Controller
                control={control}
                name="Cpf"
                render={() => (
                  <InputComMascara
                    mask={MascaraInput.cpf}
                    name="Cpf do Candidato"
                    value={getValues('Cpf')}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setValue('Cpf', event.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={() => {
                  setCurrentPage(1);
                  getFichaCandidatoFiltrado(
                    getValues('Nome'),
                    removeMask(getValues('Cpf')),
                    isFilterInativos,
                    1,
                    5
                  );
                }}
              >
                Filtrar
              </Button>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </div>
        {!isLoading && (
          <React.Fragment>
            {candidato?.length > 0 ? (
              <div className="listagem-candidato">
                <table>
                  <thead>
                    <tr>
                      <th className="listagem-candidato-nome">Nome</th>
                      <th className="listagem-candidato-cpf">CPF</th>
                      <th className="listagem-candidato-email">Email</th>
                      <th className="listagem-candidato-editar">Editar</th>
                      <th className="listagem-candidato-visualizar">
                        Visualizar
                      </th>
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
                              <td className="listagem-candidato-visualizar">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsView(true);
                                    setIdFicha(candidato?.IDFICHA);
                                    getFichaCandidato(candidato?.IDFICHA);
                                    handleView();
                                  }}
                                >
                                  <img
                                    src={viewIcon}
                                    alt="Visualizar Candidato"
                                  />
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
            ) : (
              <Alert severity="info" style={{ marginTop: '2%' }}>
                Não foi encontrado nenhum candidato
              </Alert>
            )}
            <div className="bottom">
              {candidato?.length > 0 && (
                <Pagination
                  count={numeroDePaginas}
                  color="primary"
                  page={currentPage}
                  onChange={(event, value) => setCurrentPage(value)}
                />
              )}

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
