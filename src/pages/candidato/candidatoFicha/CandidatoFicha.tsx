import { useForm } from 'react-hook-form';
import useFormSteps from '../../../hooks/useFormSteps';
import './candidatoFicha.scss';
import Tabs from '../../../Shared/Tabs/Tabs';

//Import dos componentes/etapas do formulário
import {
  IdentificacaoCandidato,
  IdentificacaoCandidatoPaiMae,
} from './components/IdentificacaoCandidato';
import OutrasFichasGrupoFamiliar from './components/OutrasFichasGrupoFamiliar';
import DadosEducacionaisCandidato from './components/DadosEducacionaisCandidato';
import BeneficiosPleiteados from './components/BeneficiosPleiteados';
import CondicoesSaudeCandidato from './components/CondicoesSaudeCandidato';
import CondicoesSociaisESaudeFamilia from './components/CondicoesSociaisESaudeFamilia';
import CondicoesMoradia from './components/CondicoesMoradia';
import ComposicaoFamiliar from './components/ComposicaoFamiliar';
import Despesas from './components/Despesas';
import OutrosGastos from './components/OutrosGastos';
import SituacaoSocioEconomicaFamiliar from './components/SituacaoSocioEconomicaFamiliar';
import ObservacoesNecessarias from './components/ObservacoesNecessarias';
import ParecerAssistSocial from './components/ParecerAssistSocial';
import DeclaracaoResponsabilidadeInfoDoc from './components/DeclaracaoResponsabilidadeInfoDoc';
//import TermoAutorizacaoUsoDeImagemEVoz from './components/TermoAutorizacaoUsoDeImagemEVoz';
import axiosInstance from '../../../components/utils/axios';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DateFormToSend } from '../../../Shared/FormatadoresDadosEnvio';
import { useLocation } from 'react-router-dom';
import BlockUI from '../../../components/utils/BlockUI/BlockUI';
import { removeMask } from '../../../Shared/Mascaras';

export type SituacaoTrabalhista = {
  IDSITTRABALHISTA: number;
  DESCRICAO: string;
  ATIVO: string;
};

export type RacaEtnia = {
  IDRACAETNIA: number;
  DESCRICAO: string;
  ATIVO: string;
};

export type EstadoCivil = {
  IDESTADOCIVIL: number;
  DESCRICAO: string;
  ATIVO: string;
};

export type Parentesco = {
  IDPARENTESCO: number;
  DESCRICAO: string;
};

export type Escolaridade = {
  IDESCOLARIDADE: number;
  DESCRICAO: string;
};

export type CoberturaMoradia = {
  DESCRICAO: string;
  IDCOBERTURAMORADIA: number;
};

export interface Ficha {
  IdentificacaoCandidato: {
    NomeCompleto: string;
    Cpf: string;
    DocIdentidade: string;
    DataNascimento: Date | null;
    Naturalidade: string;
    IdRacaEtnia: number;
    IdSitTrabalhista: number;
    OutraSitTrabalhista: string;
    IdEstadoCivil: number;
    Email: string;
    NecessidadeEspecial: string;
    EnderecoResidencial: string;
    Numero: string;
    Complemento: string;
    Bairro: string;
    Cep: string;
    TelefoneResidencial: string;
    TelefoneRecado: string;
    TelefoneCelular: string;
    NomePai: string;
    CpfPai: string;
    NomeMae: string;
    CpfMae: string;
    NomeResponsavel: string;
    IdParentescoResponsavel: number;
    IdEstadoCivilPai: number;
    IdEstadoCivilMae: number;
  };
  OutrasFichasGrupoFamiliar: {
    IdFicha: number | undefined;
    NomeCompleto: string;
    IdParentesco: number | undefined;
    IdGrupoFamiliar: number | undefined;
  }[];
  DadosEducacionaisCandidato: {
    Estuda: string;
    InstituicaoEnsino: string;
    NomeInstituicaoEnsino: string;
    EnderecoInstituicao: string;
    BairroInstituicao: string;
    SerieAtual: number;
    Turma: string;
    Turno: string;
    IdEscolaridade: number;
    OutrosCursosRealizados: string;
  };
  BeneficiosPleiteados: {
    NomeCursoPretendido: string;
    Turno: string;
    Horario: string;
    IdBeneficio?: number;
  }[];
  CondicoesSaudeCandidato: {
    NomeContatoEmergencia: string;
    TelefoneEmergencia1: string;
    TelefoneEmergencia2: string;
    Alergia: string;
    SitMedicaEspecial: string;
    FraturasCirurgicas: string;
    MedicacaoControlada: string;
    ProvidenciaRecomendada: string;
  };
  CondicoesSociaisESaudeFamilia: {
    FamiliarTratamentoMedico: string;
    FamiliarUsoMedico: string;
    FamiliarDeficiencia: string;
    FamiliarDependenciaQuimica: string;
    AcompanhamentoTerapeutico: string;
    ProgramaSocial: string;
  };
  CondicoesMoradia: {
    AguaPotavel: string;
    RedeEsgoto: string;
    IdCoberturaMoradia: number;
    RuaPavimentada: string;
    PossuiEletricidade: string;
    ComodosMoradia: number;
    TipoImovelResidencia: string;
    ValorAluguel: number;
    IdParentescoProprietario: number;
    PrestacaoFinanciamento: number;
  };
  ComposicaoFamiliar: {
    IdCompFamiliar: number | undefined;
    IdFicha: number | undefined;
    Nome: string;
    IdParentesco: number | undefined;
    Idade: number | undefined;
    IdEstadoCivil: number | undefined;
    Profissao: string;
    IdSitTrabalhista: number | undefined;
    IdEscolaridade: number | undefined;
    Renda: number | undefined;
  }[];
  Despesas: {
    DespesasDescontos: number;
    DespesasRendaBruta: number;
    DespesasMoradia: number;
    DespesasRendaLiquida: number;
    DespesasEducacao: number;
    DespesasPessoasResidencia: number;
    DespesasSaude: number;
    DespesasRpc: number;
    DespesasTotal: number;
    DespesasObs: string;
  };
  OutrosGastos: string;
  SituacaoSocioEconomicaFamiliar: string;
  ObservacoesNecessarias: string;
  ParecerAssistSocial: {
    ParecerAssistSocial: string;
    StatusProcesso: string;
  };
  DataCad: Date;
  IdUsuario: number;
}

export interface FichaEdit {
  IDFICHA: number;
  NOMECOMPLETO: string;
  CPF: string;
  DOCIDENTIDADE: string;
  DATANASCIMENTO: Date | null;
  NATURALIDADE: string;
  IDRACAETNIA: number;
  IDSITTRABALHISTA: number;
  OUTRASITTRABALHISTA: string;
  IDESTADOCIVIL: number;
  EMAIL: string;
  NECESSIDADEESPECIAL: string;
  ENDERECORESIDENCIAL: string;
  NUMERO: string;
  COMPLEMENTO: string;
  BAIRRO: string;
  CEP: string;
  TELEFONERESIDENCIAL: string;
  TELEFONERECADO: string;
  TELEFONECELULAR: string;
  NOMEPAI: string;
  CPFPAI: string;
  NOMEMAE: string;
  CPFMAE: string;
  NOMERESPONSAVEL: string;
  IDPARENTESCORESPONSAVEL: number;
  IDESTADOCIVILPAI: number;
  IDESTADOCIVILMAE: number;
  IDPARENTESCO: number | undefined;
  ESTUDA: string;
  INSTITUICAOENSINO: string;
  NOMEINSTITUICAOENSINO: string;
  ENDERECOINSTITUICAO: string;
  BAIRROINSTITUICAO: string;
  SERIEATUAL: number;
  TURMA: string;
  IDESCOLARIDADE: number;
  OUTROSCURSOSREALIZADOS: string;
  NOMECURSOPRETENDIDO: string;
  HORARIO: string;
  NOMECONTATOEMERGENCIA: string;
  TELEFONEEMERGENCIA1: string;
  TELEFONEEMERGENCIA2: string;
  ALERGIA: string;
  SITMEDICAESPECIAL: string;
  FRATURASCIRURGICAS: string;
  MEDICACAOCONTROLADA: string;
  PROVIDENCIARECOMENDADA: string;
  FAMILIARTRATAMENTOMEDICO: string;
  FAMILIARUSOMEDICO: string;
  FAMILIARDEFICIENCIA: string;
  FAMILARDEPENDENCIAQUIMICA: string;
  ACOMPANHAMENTOTERAPEUTICO: string;
  PROGRAMASOCIAL: string;
  AGUAPOTAVEL: string;
  REDEESGOTO: string;
  IDCOBERTURAMORADIA: number;
  RUAPAVIMENTADA: string;
  POSSUIELETRICIDADE: string;
  COMODOSMORADIA: number;
  TIPOIMOVELRESIDENCIA: string;
  VALORALUGUEL: number;
  IDPARENTESCOPROPRIETARIO: number;
  PRESTACAOFINANCIAMENTO: number;
  IDCOMPFAMILIAR: number | undefined;
  NOME: string;
  IDADE: number | undefined;
  PROFISSAO: string;
  RENDA: number | undefined;
  DESPESASDESCONTOS: number;
  DESPESASRENDABRUTA: number;
  DESPESASMORADIA: number;
  DESPESASRENDALIQUIDA: number;
  DESPESASEDUCACAO: number;
  DESPESASPESSOASRESIDENCIA: number;
  DESPESASSAUDE: number;
  DESPESASRPC: number;
  DESPESASTOTAL: number;
  DESPESASOBS: string;
  OUTROSGASTOS: string;
  SITUACAOSOCIOECONOMICAFAMILIAR: string;
  OBSERVACOESNECESSARIAS: string;
  PARECERASSISTSOCIAL: string;
  STATUSPROCESSO: string;
  DATACAD: Date;
  IDUSUARIO: number;
  GRUPOFAMILIAR: {
    IDFICHAFAMILIAR: number;
    IDFICHAPRINCIPAL: number;
    IDGRUPOFAMILIAR: number;
    IDPARENTESCO: number;
    NOMECOMPLETO: string;
  }[];
  BENEFICIOS: {
    ATIVIDADECURSO: string;
    HORARIO: string;
    IDBENEFICIO: number;
    IDFICHA: number;
    PRIORIDADE: null | string;
    TURNO: string;
  }[];
  COMPFAMILIAR: {
    IDADE?: number;
    IDCOMPFAMILIAR?: number;
    IDESCOLARIDADE?: number;
    IDESTADOCIVIL?: number;
    IDFICHA?: number;
    IDPARENTESCO?: number;
    IDSITTRABALHISTA?: number;
    NOME?: string;
    PROFISSAO?: string;
    RENDA?: number;
  }[];
}

export function CandidatoFicha() {
  const location = useLocation();
  const [situacaoTrabalhista, setSituacaoTrabalhista] =
    useState<SituacaoTrabalhista[]>();
  const [racaEtnia, setRacaEtnia] = useState<RacaEtnia[]>();
  const [estadoCivil, setEstadoCivil] = useState<EstadoCivil[]>();
  const [parentesco, setParentesco] = useState<Parentesco[]>();
  const [escolaridade, setEscolaridade] = useState<Escolaridade[]>();
  const [coberturaMoradia, setCoberturaMoradia] =
    useState<CoberturaMoradia[]>();
  const [aceitarTermos, setAceitarTermos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const valuesEditFicha = location.state?.valuesEditFicha;
  const fichaCandidato: FichaEdit = location.state?.valuesEditFicha.ficha;

  const getRacaEtnia = useCallback(async () => {
    try {
      await axiosInstance.get(`/racaEtnia`).then(res => {
        setRacaEtnia(res.data);
      });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }, []);

  const getSituacaoTrabalhista = useCallback(async () => {
    try {
      await axiosInstance.get(`/situacaoTrabalhista`).then(res => {
        setSituacaoTrabalhista(res.data);
      });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }, []);

  const getEstadoCivil = useCallback(async () => {
    try {
      await axiosInstance.get(`/estadocivil`).then(res => {
        setEstadoCivil(res.data);
      });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }, []);

  const getParentesco = useCallback(async () => {
    try {
      await axiosInstance.get(`/parentesco`).then(res => {
        setParentesco(res.data);
      });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }, []);

  const getEscolaridade = useCallback(async () => {
    try {
      await axiosInstance.get(`/escolaridade`).then(res => {
        setEscolaridade(res.data);
      });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }, []);

  const getCoberturaMoradia = useCallback(async () => {
    try {
      await axiosInstance.get(`/coberturamoradia`).then(res => {
        setCoberturaMoradia(res.data);
      });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }, []);

  useEffect(() => {
    getRacaEtnia();
    getSituacaoTrabalhista();
    getEstadoCivil();
    getParentesco();
    getEscolaridade();
    getCoberturaMoradia();
  }, [
    getRacaEtnia,
    getSituacaoTrabalhista,
    getEstadoCivil,
    getParentesco,
    getEscolaridade,
    getCoberturaMoradia,
  ]);

  const { control, handleSubmit, getValues, setValue, watch } = useForm<Ficha>({
    mode: 'onBlur',
    defaultValues: {
      IdentificacaoCandidato: {
        NomeCompleto: fichaCandidato?.NOMECOMPLETO,
        Cpf: fichaCandidato?.CPF ?? '',
        DocIdentidade: fichaCandidato?.DOCIDENTIDADE ?? '',
        DataNascimento: fichaCandidato?.DATANASCIMENTO ?? null,
        Naturalidade: fichaCandidato?.NATURALIDADE ?? '',
        IdRacaEtnia: fichaCandidato?.IDRACAETNIA ?? '',
        IdSitTrabalhista: fichaCandidato?.IDSITTRABALHISTA ?? '',
        OutraSitTrabalhista: fichaCandidato?.OUTRASITTRABALHISTA ?? '',
        IdEstadoCivil: fichaCandidato?.IDESTADOCIVIL ?? '',
        Email: fichaCandidato?.EMAIL ?? '',
        NecessidadeEspecial: fichaCandidato?.NECESSIDADEESPECIAL ?? '',
        EnderecoResidencial: fichaCandidato?.ENDERECORESIDENCIAL ?? '',
        Numero: fichaCandidato?.NUMERO ?? '',
        Complemento: fichaCandidato?.COMPLEMENTO ?? '',
        Bairro: fichaCandidato?.BAIRRO ?? '',
        Cep: fichaCandidato?.CEP ?? '',
        TelefoneResidencial: fichaCandidato?.TELEFONERESIDENCIAL ?? '',
        TelefoneRecado: fichaCandidato?.TELEFONERECADO ?? '',
        TelefoneCelular: fichaCandidato?.TELEFONECELULAR ?? '',
        NomePai: fichaCandidato?.NOMEPAI ?? '',
        CpfPai: fichaCandidato?.CPFPAI ?? '',
        NomeMae: fichaCandidato?.NOMEMAE ?? '',
        CpfMae: fichaCandidato?.CPFMAE ?? '',
        NomeResponsavel: fichaCandidato?.NOMERESPONSAVEL ?? '',
        IdParentescoResponsavel: fichaCandidato?.IDPARENTESCORESPONSAVEL ?? '',
        IdEstadoCivilPai: fichaCandidato?.IDESTADOCIVILPAI ?? '',
        IdEstadoCivilMae: fichaCandidato?.IDESTADOCIVILMAE ?? '',
      },
      OutrasFichasGrupoFamiliar: fichaCandidato?.GRUPOFAMILIAR?.map(
        fichaFamiliar => ({
          IdFicha: fichaFamiliar?.IDFICHAFAMILIAR ?? '',
          NomeCompleto: fichaFamiliar?.NOMECOMPLETO ?? '',
          IdParentesco: fichaFamiliar?.IDPARENTESCO ?? '',
          IdGrupoFamiliar: fichaFamiliar?.IDGRUPOFAMILIAR ?? '',
        })
      ),

      DadosEducacionaisCandidato: {
        Estuda: fichaCandidato?.ESTUDA ?? '',
        InstituicaoEnsino: fichaCandidato?.INSTITUICAOENSINO ?? '',
        NomeInstituicaoEnsino: fichaCandidato?.NOMEINSTITUICAOENSINO ?? '',
        EnderecoInstituicao: fichaCandidato?.ENDERECOINSTITUICAO ?? '',
        BairroInstituicao: fichaCandidato?.BAIRROINSTITUICAO ?? '',
        SerieAtual: fichaCandidato?.SERIEATUAL ?? '',
        Turma: fichaCandidato?.TURMA ?? '',
        Turno: '',
        IdEscolaridade: fichaCandidato?.IDESCOLARIDADE ?? '',
        OutrosCursosRealizados: fichaCandidato?.OUTROSCURSOSREALIZADOS ?? '',
      },
      BeneficiosPleiteados: fichaCandidato?.BENEFICIOS?.map(beneficio => ({
        NomeCursoPretendido: beneficio?.ATIVIDADECURSO ?? '',
        Turno: beneficio.TURNO ?? '',
        Horario: beneficio?.HORARIO.slice(0, 5) ?? '',
        IdBeneficio: beneficio?.IDBENEFICIO ?? 0,
      })),
      CondicoesSaudeCandidato: {
        NomeContatoEmergencia: fichaCandidato?.NOMECONTATOEMERGENCIA ?? '',
        TelefoneEmergencia1: fichaCandidato?.TELEFONEEMERGENCIA1 ?? '',
        TelefoneEmergencia2: fichaCandidato?.TELEFONEEMERGENCIA2 ?? '',
        Alergia: fichaCandidato?.ALERGIA ?? '',
        SitMedicaEspecial: fichaCandidato?.SITMEDICAESPECIAL ?? '',
        FraturasCirurgicas: fichaCandidato?.FRATURASCIRURGICAS ?? '',
        MedicacaoControlada: fichaCandidato?.MEDICACAOCONTROLADA ?? '',
        ProvidenciaRecomendada: fichaCandidato?.PROVIDENCIARECOMENDADA ?? '',
      },
      CondicoesSociaisESaudeFamilia: {
        FamiliarTratamentoMedico:
          fichaCandidato?.FAMILIARTRATAMENTOMEDICO ?? '',
        FamiliarUsoMedico: fichaCandidato?.FAMILIARUSOMEDICO ?? '',
        FamiliarDeficiencia: fichaCandidato?.FAMILIARDEFICIENCIA ?? '',
        FamiliarDependenciaQuimica:
          fichaCandidato?.FAMILARDEPENDENCIAQUIMICA ?? '',
        AcompanhamentoTerapeutico:
          fichaCandidato?.ACOMPANHAMENTOTERAPEUTICO ?? '',
        ProgramaSocial: fichaCandidato?.PROGRAMASOCIAL ?? '',
      },
      CondicoesMoradia: {
        AguaPotavel: fichaCandidato?.AGUAPOTAVEL ?? '',
        RedeEsgoto: fichaCandidato?.REDEESGOTO ?? '',
        IdCoberturaMoradia: fichaCandidato?.IDCOBERTURAMORADIA ?? '',
        RuaPavimentada: fichaCandidato?.RUAPAVIMENTADA ?? '',
        PossuiEletricidade: fichaCandidato?.POSSUIELETRICIDADE ?? '',
        ComodosMoradia: fichaCandidato?.COMODOSMORADIA ?? '',
        TipoImovelResidencia: fichaCandidato?.TIPOIMOVELRESIDENCIA ?? '',
        ValorAluguel: fichaCandidato?.VALORALUGUEL ?? 0,
        IdParentescoProprietario: fichaCandidato?.IDPARENTESCOPROPRIETARIO ?? 1,
        PrestacaoFinanciamento: fichaCandidato?.PRESTACAOFINANCIAMENTO ?? 0,
      },
      ComposicaoFamiliar: fichaCandidato?.COMPFAMILIAR?.map(compFamiliar => ({
        IdCompFamiliar: compFamiliar?.IDCOMPFAMILIAR ?? 0,
        IdFicha: compFamiliar?.IDFICHA ?? 0,
        Nome: compFamiliar?.NOME ?? '',
        IdParentesco: compFamiliar?.IDPARENTESCO ?? 0,
        Idade: compFamiliar?.IDADE ?? 0,
        IdEstadoCivil: compFamiliar?.IDESTADOCIVIL ?? 0,
        Profissao: compFamiliar?.PROFISSAO ?? '',
        IdSitTrabalhista: compFamiliar?.IDSITTRABALHISTA ?? 0,
        IdEscolaridade: compFamiliar?.IDESCOLARIDADE ?? 0,
        Renda: compFamiliar?.RENDA ?? 0,
      })),
      Despesas: {
        DespesasDescontos: fichaCandidato?.DESPESASDESCONTOS ?? 0,
        DespesasRendaBruta: fichaCandidato?.DESPESASRENDABRUTA ?? 0,
        DespesasMoradia: fichaCandidato?.DESPESASMORADIA ?? 0,
        DespesasRendaLiquida: fichaCandidato?.DESPESASRENDALIQUIDA ?? 0,
        DespesasEducacao: fichaCandidato?.DESPESASEDUCACAO ?? 0,
        DespesasPessoasResidencia:
          fichaCandidato?.DESPESASPESSOASRESIDENCIA ?? 0,
        DespesasSaude: fichaCandidato?.DESPESASSAUDE ?? 0,
        DespesasRpc: fichaCandidato?.DESPESASRPC ?? 0,
        DespesasTotal: fichaCandidato?.DESPESASTOTAL ?? 0,
        DespesasObs: fichaCandidato?.DESPESASOBS ?? '',
      },
      OutrosGastos: fichaCandidato?.OUTROSGASTOS ?? '',
      SituacaoSocioEconomicaFamiliar:
        fichaCandidato?.SITUACAOSOCIOECONOMICAFAMILIAR ?? '',
      ObservacoesNecessarias: fichaCandidato?.OBSERVACOESNECESSARIAS ?? '',
      ParecerAssistSocial: {
        ParecerAssistSocial: fichaCandidato?.PARECERASSISTSOCIAL ?? '',
        StatusProcesso: fichaCandidato?.STATUSPROCESSO ?? '',
      },
      DataCad: fichaCandidato?.DATACAD ?? new Date(),
      IdUsuario: fichaCandidato?.IDUSUARIO ?? 0,
    },
    criteriaMode: 'all',
  });

  async function postFicha(ficha: Ficha) {
    const dataForm = new FormData();
    dataForm.append('NOMECOMPLETO', ficha.IdentificacaoCandidato.NomeCompleto);
    dataForm.append('CPF', removeMask(ficha.IdentificacaoCandidato.Cpf));
    dataForm.append(
      'DOCIDENTIDADE',
      ficha.IdentificacaoCandidato.DocIdentidade
    );
    dataForm.append(
      'DATANASCIMENTO',
      ficha.IdentificacaoCandidato.DataNascimento !== null
        ? DateFormToSend(
            ficha.IdentificacaoCandidato.DataNascimento?.toString()
          )
        : ''
    );
    dataForm.append('NATURALIDADE', ficha.IdentificacaoCandidato.Naturalidade);
    dataForm.append(
      'IDRACAETNIA',
      ficha.IdentificacaoCandidato.IdRacaEtnia.toString()
    );
    dataForm.append(
      'IDSITTRABALHISTA',
      ficha.IdentificacaoCandidato.IdSitTrabalhista.toString()
    );
    dataForm.append(
      'OUTRASITTRABALHISTA',
      ficha.IdentificacaoCandidato.OutraSitTrabalhista
    );
    dataForm.append(
      'IDESTADOCIVIL',
      ficha.IdentificacaoCandidato.IdEstadoCivil.toString()
    );
    dataForm.append('EMAIL', ficha.IdentificacaoCandidato.Email);
    dataForm.append(
      'NECESSIDADEESPECIAL',
      ficha.IdentificacaoCandidato.NecessidadeEspecial
    );
    dataForm.append(
      'ENDERECORESIDENCIAL',
      ficha.IdentificacaoCandidato.EnderecoResidencial
    );
    dataForm.append('NUMERO', ficha.IdentificacaoCandidato.Numero);
    dataForm.append('COMPLEMENTO', ficha.IdentificacaoCandidato.Complemento);
    dataForm.append('BAIRRO', ficha.IdentificacaoCandidato.Bairro);
    dataForm.append('CEP', removeMask(ficha.IdentificacaoCandidato.Cep));
    dataForm.append(
      'TELEFONERESIDENCIAL',
      removeMask(ficha.IdentificacaoCandidato.TelefoneResidencial)
    );
    dataForm.append(
      'TELEFONERECADO',
      removeMask(ficha.IdentificacaoCandidato.TelefoneRecado)
    );
    dataForm.append(
      'TELEFONECELULAR',
      removeMask(ficha.IdentificacaoCandidato.TelefoneCelular)
    );
    dataForm.append('NOMEPAI', ficha.IdentificacaoCandidato.NomePai);
    dataForm.append('CPFPAI', removeMask(ficha.IdentificacaoCandidato.CpfPai));
    dataForm.append('NOMEMAE', ficha.IdentificacaoCandidato.NomeMae);
    dataForm.append('CPFMAE', removeMask(ficha.IdentificacaoCandidato.CpfMae));
    dataForm.append(
      'NOMERESPONSAVEL',
      ficha.IdentificacaoCandidato.NomeResponsavel
    );
    dataForm.append(
      'IDPARENTESCORESPONSAVEL',
      ficha.IdentificacaoCandidato.IdParentescoResponsavel.toString()
    );
    dataForm.append(
      'IDESTADOCIVILPAI',
      ficha.IdentificacaoCandidato.IdEstadoCivilPai.toString()
    );
    dataForm.append(
      'IDESTADOCIVILMAE',
      ficha.IdentificacaoCandidato.IdEstadoCivilMae.toString()
    );
    dataForm.append('ESTUDA', ficha.DadosEducacionaisCandidato.Estuda);
    dataForm.append(
      'INSTITUICAOENSINO',
      ficha.DadosEducacionaisCandidato.InstituicaoEnsino
    );
    dataForm.append(
      'NOMEINSTITUICAO',
      ficha.DadosEducacionaisCandidato.NomeInstituicaoEnsino
    );
    dataForm.append(
      'ENDERECOINSTITUICAO',
      ficha.DadosEducacionaisCandidato.EnderecoInstituicao
    );
    dataForm.append(
      'BAIRROINSTITUICAO',
      ficha.DadosEducacionaisCandidato.BairroInstituicao
    );
    dataForm.append(
      'SERIEATUAL',
      ficha.DadosEducacionaisCandidato.SerieAtual.toString()
    );
    dataForm.append('TURMA', ficha.DadosEducacionaisCandidato.Turma);
    dataForm.append('TURNO', ficha.DadosEducacionaisCandidato.Turno);
    dataForm.append(
      'IDESCOLARIDADE',
      ficha.DadosEducacionaisCandidato.IdEscolaridade.toString()
    );
    dataForm.append(
      'OUTROSCURSOSREALIZADOS',
      ficha.DadosEducacionaisCandidato.OutrosCursosRealizados
    );
    dataForm.append(
      'NOMECONTATOEMERGENCIA',
      ficha.CondicoesSaudeCandidato.NomeContatoEmergencia
    );
    dataForm.append(
      'TELEFONEEMERGENCIA1',
      removeMask(ficha.CondicoesSaudeCandidato.TelefoneEmergencia1)
    );
    dataForm.append(
      'TELEFONEEMERGENCIA2',
      removeMask(ficha.CondicoesSaudeCandidato.TelefoneEmergencia2)
    );
    dataForm.append('ALERGIA', ficha.CondicoesSaudeCandidato.Alergia);
    dataForm.append(
      'SITMEDICAESPECIAL',
      ficha.CondicoesSaudeCandidato.SitMedicaEspecial
    );
    dataForm.append(
      'FRATURASCIRURGIAS',
      ficha.CondicoesSaudeCandidato.FraturasCirurgicas
    );
    dataForm.append(
      'MEDICACAOCONTROLADA',
      ficha.CondicoesSaudeCandidato.MedicacaoControlada
    );
    dataForm.append(
      'PROVIDENCIARECOMENDADA',
      ficha.CondicoesSaudeCandidato.ProvidenciaRecomendada
    );
    dataForm.append(
      'FAMILIARTRATAMENTOMEDICO',
      ficha.CondicoesSociaisESaudeFamilia.FamiliarTratamentoMedico
    );
    dataForm.append(
      'FAMILIARUSOMEDICAMENTO',
      ficha.CondicoesSociaisESaudeFamilia.FamiliarUsoMedico
    );
    dataForm.append(
      'FAMILIARDEFICIENCIA',
      ficha.CondicoesSociaisESaudeFamilia.FamiliarDeficiencia
    );
    dataForm.append(
      'FAMILIARDEPENDENCIAQUIMICA',
      ficha.CondicoesSociaisESaudeFamilia.FamiliarDependenciaQuimica
    );
    dataForm.append(
      'ACOMPTERAPEUTICO',
      ficha.CondicoesSociaisESaudeFamilia.AcompanhamentoTerapeutico
    );
    dataForm.append(
      'PROGRAMASOCIAL',
      ficha.CondicoesSociaisESaudeFamilia.ProgramaSocial
    );
    dataForm.append('AGUAPOTAVEL', ficha.CondicoesMoradia.AguaPotavel);
    dataForm.append('REDEESGOTO', ficha.CondicoesMoradia.RedeEsgoto);
    dataForm.append(
      'IDCOBERTURAMORADIA',
      ficha.CondicoesMoradia.IdCoberturaMoradia.toString()
    );
    dataForm.append('RUAPAVIMENTADA', ficha.CondicoesMoradia.RuaPavimentada);
    dataForm.append(
      'POSSUIELETRICIDADE',
      ficha.CondicoesMoradia.PossuiEletricidade
    );
    dataForm.append(
      'COMODOSMORADIA',
      ficha.CondicoesMoradia.ComodosMoradia.toString()
    );
    dataForm.append(
      'TIPOIMOVELRESIDENCIA',
      ficha.CondicoesMoradia.TipoImovelResidencia
    );
    dataForm.append(
      'VALORALUGUEL',
      ficha.CondicoesMoradia.ValorAluguel.toString()
    );
    dataForm.append(
      'IDPARENTESCOPROPRIETARIO',
      ficha.CondicoesMoradia.IdParentescoProprietario.toString()
    );
    dataForm.append(
      'PRESTACAOFINANCIAMENTO',
      ficha.CondicoesMoradia.PrestacaoFinanciamento.toString()
    );
    dataForm.append(
      'DESPESASDESCONTOS',
      ficha.Despesas.DespesasDescontos.toString()
    );
    dataForm.append(
      'DESPESASRENDABRUTA',
      ficha.Despesas.DespesasRendaBruta.toString()
    );
    dataForm.append(
      'DESPESASMORADIA',
      ficha.Despesas.DespesasMoradia.toString()
    );
    dataForm.append(
      'DESPESASRENDALIQUIDA',
      ficha.Despesas.DespesasRendaLiquida.toString()
    );
    dataForm.append(
      'DESPESASEDUCACAO',
      ficha.Despesas.DespesasEducacao.toString()
    );
    dataForm.append(
      'DESPESASPESSOASRESIDENCIA',
      ficha.Despesas.DespesasPessoasResidencia.toString()
    );
    dataForm.append('DESPESASSAUDE', ficha.Despesas.DespesasSaude.toString());
    dataForm.append('DESPESASRPC', ficha.Despesas.DespesasRpc.toString());
    dataForm.append('DESPESASTOTAL', ficha.Despesas.DespesasTotal.toString());
    dataForm.append('DESPESASOBS', ficha.Despesas.DespesasObs);
    dataForm.append('OUTROSGASTOS', ficha.OutrosGastos.toString());
    dataForm.append(
      'SITSOCIOECONOMICOFAMILIAR',
      ficha.SituacaoSocioEconomicaFamiliar.toString()
    );
    dataForm.append(
      'OBSERVACOESNECESSARIAS',
      ficha.ObservacoesNecessarias.toString()
    );
    dataForm.append(
      'PARECERASSISTSOCIAL',
      ficha.ParecerAssistSocial.ParecerAssistSocial.toString()
    );
    dataForm.append('STATUSPROCESSO', ficha.ParecerAssistSocial.StatusProcesso);
    dataForm.append('DATACAD', ficha.DataCad.toString());
    dataForm.append('IDUSUARIO', ficha.IdUsuario.toString());
    //forEach usado para transformar o array de BeneficiosPleiteados em um array de objetos
    ficha.BeneficiosPleiteados.forEach((element, key) => {
      dataForm.append(
        `BENEFICIOSPLEITEADOS[${key}].NomeCursoPretendido`,
        element.NomeCursoPretendido
      );
      dataForm.append(`BENEFICIOSPLEITEADOS[${key}].Turno`, element.Turno);
      dataForm.append(`BENEFICIOSPLEITEADOS[${key}].Horario`, element.Horario);
      dataForm.append(
        `BENEFICIOSPLEITEADOS[${key}].IdBeneficio`,
        `${element.IdBeneficio}`
      );
    });

    //forEach usado para transformar o array de OutrasFichasGrupoFamiliar em um array de objetos
    ficha.OutrasFichasGrupoFamiliar.forEach((element, key) => {
      dataForm.append(
        `GRUPOFAMILIAR[${key}].IdFichaFamiliar`,
        element.IdFicha?.toString() ?? ''
      );
      dataForm.append(
        `GRUPOFAMILIAR[${key}].IdParentesco`,
        element.IdParentesco?.toString() ?? ''
      );
    });

    //forEach usado para transformar o array de ComposicaoFamiliar em um array de objetos
    ficha.ComposicaoFamiliar.forEach((element, key) => {
      dataForm.append(`COMPFAMILIAR[${key}].Nome`, element.Nome);
      dataForm.append(
        `COMPFAMILIAR[${key}].IdParentesco`,
        element.IdParentesco?.toString() ?? ''
      );
      dataForm.append(
        `COMPFAMILIAR[${key}].Idade`,
        element.Idade?.toString() ?? ''
      );
      dataForm.append(
        `COMPFAMILIAR[${key}].IdEstadoCivil`,
        element.IdEstadoCivil?.toString() ?? ''
      );
      dataForm.append(`COMPFAMILIAR[${key}].Profissao`, element.Profissao);
      dataForm.append(
        `COMPFAMILIAR[${key}].IdSitTrabalhista`,
        element.IdSitTrabalhista?.toString() ?? ''
      );
      dataForm.append(
        `COMPFAMILIAR[${key}].IdEscolaridade`,
        element.IdEscolaridade?.toString() ?? ''
      );
      dataForm.append(
        `COMPFAMILIAR[${key}].Renda`,
        element.Renda?.toString() ?? ''
      );
    });
    try {
      setIsLoading(true);
      await axiosInstance
        .post(`/createFichaCandidato`, dataForm)
        .then(res => toast.success(res.data.message));
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function putFicha(ficha: Ficha) {
    const dataForm = new FormData();
    dataForm.append('IDFICHA', fichaCandidato.IDFICHA.toString());
    dataForm.append('NOMECOMPLETO', ficha.IdentificacaoCandidato.NomeCompleto);
    dataForm.append('CPF', removeMask(ficha.IdentificacaoCandidato.Cpf));
    dataForm.append(
      'DOCIDENTIDADE',
      ficha.IdentificacaoCandidato.DocIdentidade
    );
    dataForm.append(
      'DATANASCIMENTO',
      ficha.IdentificacaoCandidato.DataNascimento !== null
        ? DateFormToSend(
            ficha.IdentificacaoCandidato.DataNascimento?.toString()
          )
        : ''
    );
    dataForm.append('NATURALIDADE', ficha.IdentificacaoCandidato.Naturalidade);
    dataForm.append(
      'IDRACAETNIA',
      ficha.IdentificacaoCandidato.IdRacaEtnia.toString()
    );
    dataForm.append(
      'IDSITTRABALHISTA',
      ficha.IdentificacaoCandidato.IdSitTrabalhista.toString()
    );
    dataForm.append(
      'OUTRASITTRABALHISTA',
      ficha.IdentificacaoCandidato.OutraSitTrabalhista
    );
    dataForm.append(
      'IDESTADOCIVIL',
      ficha.IdentificacaoCandidato.IdEstadoCivil.toString()
    );
    dataForm.append('EMAIL', ficha.IdentificacaoCandidato.Email);
    dataForm.append(
      'NECESSIDADEESPECIAL',
      ficha.IdentificacaoCandidato.NecessidadeEspecial
    );
    dataForm.append(
      'ENDERECORESIDENCIAL',
      ficha.IdentificacaoCandidato.EnderecoResidencial
    );
    dataForm.append('NUMERO', ficha.IdentificacaoCandidato.Numero);
    dataForm.append('COMPLEMENTO', ficha.IdentificacaoCandidato.Complemento);
    dataForm.append('BAIRRO', ficha.IdentificacaoCandidato.Bairro);
    dataForm.append('CEP', removeMask(ficha.IdentificacaoCandidato.Cep));
    dataForm.append(
      'TELEFONERESIDENCIAL',
      removeMask(ficha.IdentificacaoCandidato.TelefoneResidencial)
    );
    dataForm.append(
      'TELEFONERECADO',
      removeMask(ficha.IdentificacaoCandidato.TelefoneRecado)
    );
    dataForm.append(
      'TELEFONECELULAR',
      removeMask(ficha.IdentificacaoCandidato.TelefoneCelular)
    );
    dataForm.append('NOMEPAI', ficha.IdentificacaoCandidato.NomePai);
    dataForm.append('CPFPAI', removeMask(ficha.IdentificacaoCandidato.CpfPai));
    dataForm.append('NOMEMAE', ficha.IdentificacaoCandidato.NomeMae);
    dataForm.append('CPFMAE', removeMask(ficha.IdentificacaoCandidato.CpfMae));
    dataForm.append(
      'NOMERESPONSAVEL',
      ficha.IdentificacaoCandidato.NomeResponsavel
    );
    dataForm.append(
      'IDPARENTESCORESPONSAVEL',
      ficha.IdentificacaoCandidato.IdParentescoResponsavel.toString()
    );
    dataForm.append(
      'IDESTADOCIVILPAI',
      ficha.IdentificacaoCandidato.IdEstadoCivilPai.toString()
    );
    dataForm.append(
      'IDESTADOCIVILMAE',
      ficha.IdentificacaoCandidato.IdEstadoCivilMae.toString()
    );
    dataForm.append('ESTUDA', ficha.DadosEducacionaisCandidato.Estuda);
    dataForm.append(
      'INSTITUICAOENSINO',
      ficha.DadosEducacionaisCandidato.InstituicaoEnsino
    );
    dataForm.append(
      'NOMEINSTITUICAO',
      ficha.DadosEducacionaisCandidato.NomeInstituicaoEnsino
    );
    dataForm.append(
      'ENDERECOINSTITUICAO',
      ficha.DadosEducacionaisCandidato.EnderecoInstituicao
    );
    dataForm.append(
      'BAIRROINSTITUICAO',
      ficha.DadosEducacionaisCandidato.BairroInstituicao
    );
    dataForm.append(
      'SERIEATUAL',
      ficha.DadosEducacionaisCandidato.SerieAtual.toString()
    );
    dataForm.append('TURMA', ficha.DadosEducacionaisCandidato.Turma);
    dataForm.append('TURNO', ficha.DadosEducacionaisCandidato.Turno);
    dataForm.append(
      'IDESCOLARIDADE',
      ficha.DadosEducacionaisCandidato.IdEscolaridade.toString()
    );
    dataForm.append(
      'OUTROSCURSOSREALIZADOS',
      ficha.DadosEducacionaisCandidato.OutrosCursosRealizados
    );
    dataForm.append(
      'NOMECONTATOEMERGENCIA',
      ficha.CondicoesSaudeCandidato.NomeContatoEmergencia
    );
    dataForm.append(
      'TELEFONEEMERGENCIA1',
      removeMask(ficha.CondicoesSaudeCandidato.TelefoneEmergencia1)
    );
    dataForm.append(
      'TELEFONEEMERGENCIA2',
      removeMask(ficha.CondicoesSaudeCandidato.TelefoneEmergencia2)
    );
    dataForm.append('ALERGIA', ficha.CondicoesSaudeCandidato.Alergia);
    dataForm.append(
      'SITMEDICAESPECIAL',
      ficha.CondicoesSaudeCandidato.SitMedicaEspecial
    );
    dataForm.append(
      'FRATURASCIRURGIAS',
      ficha.CondicoesSaudeCandidato.FraturasCirurgicas
    );
    dataForm.append(
      'MEDICACAOCONTROLADA',
      ficha.CondicoesSaudeCandidato.MedicacaoControlada
    );
    dataForm.append(
      'PROVIDENCIARECOMENDADA',
      ficha.CondicoesSaudeCandidato.ProvidenciaRecomendada
    );
    dataForm.append(
      'FAMILIARTRATAMENTOMEDICO',
      ficha.CondicoesSociaisESaudeFamilia.FamiliarTratamentoMedico
    );
    dataForm.append(
      'FAMILIARUSOMEDICAMENTO',
      ficha.CondicoesSociaisESaudeFamilia.FamiliarUsoMedico
    );
    dataForm.append(
      'FAMILIARDEFICIENCIA',
      ficha.CondicoesSociaisESaudeFamilia.FamiliarDeficiencia
    );
    dataForm.append(
      'FAMILIARDEPENDENCIAQUIMICA',
      ficha.CondicoesSociaisESaudeFamilia.FamiliarDependenciaQuimica
    );
    dataForm.append(
      'ACOMPTERAPEUTICO',
      ficha.CondicoesSociaisESaudeFamilia.AcompanhamentoTerapeutico
    );
    dataForm.append(
      'PROGRAMASOCIAL',
      ficha.CondicoesSociaisESaudeFamilia.ProgramaSocial
    );
    dataForm.append('AGUAPOTAVEL', ficha.CondicoesMoradia.AguaPotavel);
    dataForm.append('REDEESGOTO', ficha.CondicoesMoradia.RedeEsgoto);
    dataForm.append(
      'IDCOBERTURAMORADIA',
      ficha.CondicoesMoradia.IdCoberturaMoradia.toString()
    );
    dataForm.append('RUAPAVIMENTADA', ficha.CondicoesMoradia.RuaPavimentada);
    dataForm.append(
      'POSSUIELETRICIDADE',
      ficha.CondicoesMoradia.PossuiEletricidade
    );
    dataForm.append(
      'COMODOSMORADIA',
      ficha.CondicoesMoradia.ComodosMoradia.toString()
    );
    dataForm.append(
      'TIPOIMOVELRESIDENCIA',
      ficha.CondicoesMoradia.TipoImovelResidencia
    );
    dataForm.append(
      'VALORALUGUEL',
      ficha.CondicoesMoradia.ValorAluguel.toString()
    );
    dataForm.append(
      'IDPARENTESCOPROPRIETARIO',
      ficha.CondicoesMoradia.IdParentescoProprietario.toString()
    );
    dataForm.append(
      'PRESTACAOFINANCIAMENTO',
      ficha.CondicoesMoradia.PrestacaoFinanciamento.toString()
    );
    dataForm.append(
      'DESPESASDESCONTOS',
      ficha.Despesas.DespesasDescontos.toString()
    );
    dataForm.append(
      'DESPESASRENDABRUTA',
      ficha.Despesas.DespesasRendaBruta.toString()
    );
    dataForm.append(
      'DESPESASMORADIA',
      ficha.Despesas.DespesasMoradia.toString()
    );
    dataForm.append(
      'DESPESASRENDALIQUIDA',
      ficha.Despesas.DespesasRendaLiquida.toString()
    );
    dataForm.append(
      'DESPESASEDUCACAO',
      ficha.Despesas.DespesasEducacao.toString()
    );
    dataForm.append(
      'DESPESASPESSOASRESIDENCIA',
      ficha.Despesas.DespesasPessoasResidencia.toString()
    );
    dataForm.append('DESPESASSAUDE', ficha.Despesas.DespesasSaude.toString());
    dataForm.append('DESPESASRPC', ficha.Despesas.DespesasRpc.toString());
    dataForm.append('DESPESASTOTAL', ficha.Despesas.DespesasTotal.toString());
    dataForm.append('DESPESASOBS', ficha.Despesas.DespesasObs);
    dataForm.append('OUTROSGASTOS', ficha.OutrosGastos.toString());
    dataForm.append(
      'SITSOCIOECONOMICOFAMILIAR',
      ficha.SituacaoSocioEconomicaFamiliar.toString()
    );
    dataForm.append(
      'OBSERVACOESNECESSARIAS',
      ficha.ObservacoesNecessarias.toString()
    );
    dataForm.append(
      'PARECERASSISTSOCIAL',
      ficha.ParecerAssistSocial.ParecerAssistSocial.toString()
    );
    dataForm.append('STATUSPROCESSO', ficha.ParecerAssistSocial.StatusProcesso);
    dataForm.append('DATACAD', ficha.DataCad.toString());
    dataForm.append('IDUSUARIO', ficha.IdUsuario.toString());
    //forEach usado para transformar o array de BeneficiosPleiteados em um array de objetos
    ficha.BeneficiosPleiteados.forEach((element, key) => {
      dataForm.append(
        `BENEFICIOSPLEITEADOS[${key}].NomeCursoPretendido`,
        element.NomeCursoPretendido
      );
      dataForm.append(`BENEFICIOSPLEITEADOS[${key}].Turno`, element.Turno);
      dataForm.append(`BENEFICIOSPLEITEADOS[${key}].Horario`, element.Horario);
      dataForm.append(
        `BENEFICIOSPLEITEADOS[${key}].IdBeneficio`,
        `${element.IdBeneficio}`
      );
    });

    //forEach usado para transformar o array de OutrasFichasGrupoFamiliar em um array de objetos
    ficha.OutrasFichasGrupoFamiliar.forEach((element, key) => {
      dataForm.append(
        `GRUPOFAMILIAR[${key}].IdFichaFamiliar`,
        element.IdFicha?.toString() ?? ''
      );
      dataForm.append(
        `GRUPOFAMILIAR[${key}].IdParentesco`,
        element.IdParentesco?.toString() ?? ''
      );
      dataForm.append(
        `GRUPOFAMILIAR[${key}].IdGrupoFamiliar`,
        element.IdGrupoFamiliar?.toString() ?? ''
      );
    });

    //forEach usado para transformar o array de ComposicaoFamiliar em um array de objetos
    ficha.ComposicaoFamiliar.forEach((element, key) => {
      dataForm.append(
        `COMPFAMILIAR[${key}].IdCompFamiliar`,
        `${element.IdCompFamiliar}`
      );
      dataForm.append(`COMPFAMILIAR[${key}].Nome`, element.Nome);
      dataForm.append(
        `COMPFAMILIAR[${key}].IdParentesco`,
        element.IdParentesco?.toString() ?? ''
      );
      dataForm.append(
        `COMPFAMILIAR[${key}].Idade`,
        element.Idade?.toString() ?? ''
      );
      dataForm.append(
        `COMPFAMILIAR[${key}].IdEstadoCivil`,
        element.IdEstadoCivil?.toString() ?? ''
      );
      dataForm.append(`COMPFAMILIAR[${key}].Profissao`, element.Profissao);
      dataForm.append(
        `COMPFAMILIAR[${key}].IdSitTrabalhista`,
        element.IdSitTrabalhista?.toString() ?? ''
      );
      dataForm.append(
        `COMPFAMILIAR[${key}].IdEscolaridade`,
        element.IdEscolaridade?.toString() ?? ''
      );
      dataForm.append(
        `COMPFAMILIAR[${key}].Renda`,
        element.Renda?.toString() ?? ''
      );
    });
    try {
      setIsLoading(true);
      await axiosInstance
        .put(`/updateFicha`, dataForm)
        .then(res => toast.success(res.data.message));
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formComponents = [
    <IdentificacaoCandidato
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
      estadoCivil={estadoCivil}
      racaEtnia={racaEtnia}
      situacaoTrabalhista={situacaoTrabalhista}
      parentesco={parentesco}
    />,
    <IdentificacaoCandidatoPaiMae
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
      estadoCivil={estadoCivil}
      racaEtnia={racaEtnia}
      situacaoTrabalhista={situacaoTrabalhista}
      parentesco={parentesco}
    />,
    <OutrasFichasGrupoFamiliar
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
      parentesco={parentesco}
    />,
    <DadosEducacionaisCandidato
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
      escolaridade={escolaridade}
    />,
    <BeneficiosPleiteados
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
    />,
    <CondicoesSaudeCandidato
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
    />,
    <CondicoesSociaisESaudeFamilia
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
    />,
    <CondicoesMoradia
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
      coberturaMoradia={coberturaMoradia}
      parentesco={parentesco}
    />,
    <ComposicaoFamiliar
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
      parentesco={parentesco}
      estadoCivil={estadoCivil}
      situacaoTrabalhista={situacaoTrabalhista}
      escolaridade={escolaridade}
    />,
    <Despesas
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
    />,
    <OutrosGastos
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
    />,
    <SituacaoSocioEconomicaFamiliar
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
    />,
    <ObservacoesNecessarias
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
    />,
    <ParecerAssistSocial
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
    />,
    !valuesEditFicha?.isEdit && (
      <DeclaracaoResponsabilidadeInfoDoc
        aceitarTermos={aceitarTermos}
        setAceitarTermos={setAceitarTermos}
      />
    ),
    //<TermoAutorizacaoUsoDeImagemEVoz />,
  ];

  const { changeStep, currentComponent, currentStep, isLastStep, isFirstStep } =
    useFormSteps(formComponents);

  return (
    <React.Fragment>
      <BlockUI blocking={isLoading} />
      <Tabs
        tabQuantidade={
          //usando o filter para filtrar os componentes que não quero que apareça na tela quando for editar
          formComponents.filter(componentes => componentes !== false).length
        }
        tabContent={formComponents}
        currentTab={currentStep}
        onTabChange={changeStep}
      />
      <form
        onSubmit={handleSubmit((data, event) => {
          event?.preventDefault();
          if (data) {
            !valuesEditFicha?.isEdit ? postFicha(data) : putFicha(data);
          }
        })}
        className="form-cadastrar-ficha"
      >
        <div className="container-ficha">{currentComponent}</div>
        <div className="container-btn">
          {!isFirstStep ? (
            <span></span>
          ) : (
            <button
              type="button"
              className="btn-voltar"
              onClick={event => changeStep(currentStep - 1, event)}
            >
              Voltar
            </button>
          )}

          {!isLastStep ? (
            <button
              type="button"
              className="btn-avancar"
              onClick={event => changeStep(currentStep + 1, event)}
            >
              Próximo
            </button>
          ) : isLastStep && !valuesEditFicha?.isEdit ? (
            <button
              type="submit"
              className="btn-avancar"
              disabled={aceitarTermos === false}
            >
              Adicionar
            </button>
          ) : (
            <button type="submit" className="btn-avancar">
              Salvar
            </button>
          )}
        </div>
      </form>
    </React.Fragment>
  );
}
