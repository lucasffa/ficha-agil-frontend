import { useForm } from 'react-hook-form';
import './candidatoFichaImpressao.scss';

import { ImpressaoCandidato } from './components/ImpressaoCandidato';
import axiosInstance from '../../../components/utils/axios';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

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
    CadUnico: string;
    EncaminhadoPor: string;
    DataUltimaAlt: Date;
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
    NomeCompletoFamiliar: string;
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
  CADUNICO: string;
  ENCAMINHADOPOR: string;
  DATAULTIMAALT: Date;
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
    NOMECOMPLETOFAMILIAR: string;
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

export function CandidatoFichaImpressao() {
  const location = useLocation();
  const fichaCandidato: FichaEdit = location.state?.valuesImpressaoFicha.ficha;

  if (
    location.pathname === '/candidato/imprimir' &&
    fichaCandidato === undefined
  ) {
    window.location.href = '/candidato';
  }

  const [situacaoTrabalhista, setSituacaoTrabalhista] =
    useState<SituacaoTrabalhista[]>();
  const [racaEtnia, setRacaEtnia] = useState<RacaEtnia[]>();
  const [estadoCivil, setEstadoCivil] = useState<EstadoCivil[]>();
  const [parentesco, setParentesco] = useState<Parentesco[]>();
  const [escolaridade, setEscolaridade] = useState<Escolaridade[]>();
  const [coberturaMoradia, setCoberturaMoradia] =
    useState<CoberturaMoradia[]>();

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

  const { control, getValues, setValue, watch } = useForm<Ficha>({
    mode: 'onBlur',
    defaultValues: {
      IdentificacaoCandidato: {
        NomeCompleto: fichaCandidato?.NOMECOMPLETO,
        CadUnico: fichaCandidato?.CADUNICO ?? '',
        EncaminhadoPor: fichaCandidato?.ENCAMINHADOPOR ?? '',
        DataUltimaAlt: fichaCandidato?.DATAULTIMAALT ?? undefined,
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
      OutrasFichasGrupoFamiliar:
        fichaCandidato?.GRUPOFAMILIAR?.map(fichaFamiliar => ({
          IdFicha: fichaFamiliar?.IDFICHAFAMILIAR ?? '',
          NomeCompletoFamiliar: fichaFamiliar?.NOMECOMPLETOFAMILIAR ?? '',
          IdParentesco: fichaFamiliar?.IDPARENTESCO ?? '',
          IdGrupoFamiliar: fichaFamiliar?.IDGRUPOFAMILIAR ?? '',
        })) ?? [],

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
      DataCad: fichaCandidato?.DATACAD ?? undefined,
      IdUsuario: fichaCandidato?.IDUSUARIO ?? 0,
    },
    criteriaMode: 'all',
  });

  return (
    <React.Fragment>
      <div className="form-cadastrar-ficha-impressao">
        <div className="container-ficha-impressao">
          <ImpressaoCandidato
            control={control}
            getValues={getValues}
            setValue={setValue}
            watch={watch}
            estadoCivil={estadoCivil}
            racaEtnia={racaEtnia}
            situacaoTrabalhista={situacaoTrabalhista}
            parentesco={parentesco}
            escolaridade={escolaridade}
            coberturaMoradia={coberturaMoradia}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
