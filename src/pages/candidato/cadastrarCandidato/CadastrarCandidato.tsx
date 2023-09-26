import { useForm } from 'react-hook-form';
import useFormSteps from '../../../hooks/useFormSteps';
import './cadastrarCandidato.scss';

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
import TermoAutorizacaoUsoDeImagemEVoz from './components/TermoAutorizacaoUsoDeImagemEVoz';
import axiosInstance from '../../../components/utils/axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
    OutraSitTrabalhista?: string;
    IdEstadoCivil: number;
    Email: string;
    NecessidadeEspecial: number;
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
    DespoesasEducacao: number;
    DespesasPessoasResidencia: number;
    DespesasSaude: number;
    DespesasRpc: number;
    DespesasTotal: number;
    DespesasObs: Blob;
  };
  OutrosGastos: Blob;
  SituacaoSocioEconomicaFamiliar: Blob;
  ObservacoesNecessarias: Blob;
  ParecerAssistSocial: {
    ParecerAssistSocial: Blob;
    StatusProcesso: string;
  };
  DataCad: Date;
  IdUsuario: number;
}

export function CadastrarCandidato() {
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

  const { control, handleSubmit, getValues, setValue, watch } = useForm<Ficha>({
    mode: 'onBlur',
    defaultValues: {
      IdentificacaoCandidato: {
        NomeCompleto: 'Guilherme Coelho Vieira',
        Cpf: '1234567890',
        DocIdentidade: 'mg12345678',
        DataNascimento: null,
        Naturalidade: 'Governador Valadares',
        IdRacaEtnia: 2,
        IdSitTrabalhista: 4,
        OutraSitTrabalhista: '',
        IdEstadoCivil: 1,
        Email: 'guilherme.coelho@univale.br',
        NecessidadeEspecial: undefined,
        EnderecoResidencial: 'Rua 0',
        Numero: '000',
        Complemento: '',
        Bairro: 'Centro',
        Cep: '00000000',
        TelefoneResidencial: '3300000000',
        TelefoneRecado: '3300000000',
        TelefoneCelular: '33000000000',
        NomePai: 'Lúcio A Vieira',
        CpfPai: '1234567890',
        NomeMae: 'Silvia Coelho',
        CpfMae: '1234567890',
        NomeResponsavel: 'Silvia Coelho',
        IdParentescoResponsavel: 2,
        IdEstadoCivilPai: 3,
        IdEstadoCivilMae: 3,
      },
      OutrasFichasGrupoFamiliar: [
        {
          IdFicha: 18,
          NomeCompleto: 'Pamela Morgan Halpert',
          IdParentesco: 1,
        },
      ],
      DadosEducacionaisCandidato: {
        Estuda: 'S',
        InstituicaoEnsino: 'I',
        NomeInstituicaoEnsino: 'Univale',
        EnderecoInstituicao: 'R. Israel Pinheiro, 2000',
        BairroInstituicao: 'Universitário',
        SerieAtual: 6,
        Turma: 'Sistema de Informação',
        Turno: 'N',
        IdEscolaridade: 4,
        OutrosCursosRealizados: '',
      },
      BeneficiosPleiteados: [
        {
          NomeCursoPretendido: 'Programação 1',
          Turno: 'N',
          Horario: '18:00',
        },
      ],
      CondicoesSaudeCandidato: {
        NomeContatoEmergencia: 'Deus',
        TelefoneEmergencia1: '33000000000',
        TelefoneEmergencia2: '33000000000',
        Alergia: 'Amoxicilina',
        SitMedicaEspecial: 'Não',
        FraturasCirurgicas: 'Não',
        MedicacaoControlada: 'Não',
        ProvidenciaRecomendada: 'Não',
      },
      CondicoesSociaisESaudeFamilia: {
        FamiliarTratamentoMedico: 'Não',
        FamiliarUsoMedico: 'Não',
        FamiliarDeficiencia: 'Não',
        FamiliarDependenciaQuimica: 'Não',
        AcompanhamentoTerapeutico: 'Não',
        ProgramaSocial: 'Não',
      },
      CondicoesMoradia: {
        AguaPotavel: 'S',
        RedeEsgoto: 'S',
        IdCoberturaMoradia: 1,
        RuaPavimentada: 'S',
        PossuiEletricidade: 'S',
        ComodosMoradia: 6,
        TipoImovelResidencia: 'A',
        ValorAluguel: 600,
        IdParentescoProprietario: undefined,
        PrestacaoFinanciamento: undefined,
      },
      ComposicaoFamiliar: [
        {
          IdCompFamiliar: 1,
          IdFicha: 18,
          Nome: 'Pamela Morgan Halpert',
          IdParentesco: 1,
          Idade: 30,
          IdEstadoCivil: 2,
          Profissao: 'Administradora de escritório',
          IdSitTrabalhista: 3,
          IdEscolaridade: 5,
          Renda: 3500,
        },
      ],
      Despesas: {
        DespesasDescontos: undefined,
        DespesasRendaBruta: undefined,
        DespesasMoradia: undefined,
        DespesasRendaLiquida: undefined,
        DespoesasEducacao: undefined,
        DespesasPessoasResidencia: undefined,
        DespesasSaude: undefined,
        DespesasRpc: undefined,
        DespesasTotal: undefined,
        DespesasObs: '',
      },
      OutrosGastos: '',
      SituacaoSocioEconomicaFamiliar: '',
      ObservacoesNecessarias: '',
      ParecerAssistSocial: {
        ParecerAssistSocial: '',
        StatusProcesso: '',
      },
      DataCad: undefined,
      IdUsuario: undefined,
    },
    criteriaMode: 'all',
  });

  async function postFicha(ficha: Ficha) {
    const dataForm = new FormData();
    dataForm.append('NOMECOMPLETO', ficha.IdentificacaoCandidato.NomeCompleto);
    dataForm.append('CPF', ficha.IdentificacaoCandidato.Cpf);

    dataForm.append(
      'DOCIDENTIDADE',
      ficha.IdentificacaoCandidato.DocIdentidade
    );
    // dataForm.append(
    //   'DATANASCIMENTO',
    //   ficha.IdentificacaoCandidato.DataNascimento?.toJSON()
    // );
    // dataForm.append('NATURALIDADE', ficha.IdentificacaoCandidato.Naturalidade);
    // dataForm.append(
    //   'IDRACAETNIA',
    //   ficha.IdentificacaoCandidato.IdRacaEtnia.toString
    // );
    dataForm.append(
      'IDSITTRABALHISTA',
      ficha.IdentificacaoCandidato.IdSitTrabalhista.toString()
    );

    try {
      await axiosInstance
        .post(`/createFichaCandidato`, ficha)
        .then(res => console.log(res.data));
    } catch (err) {
      console.log(err);
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
    <Despesas />,
    <OutrosGastos />,
    <SituacaoSocioEconomicaFamiliar />,
    <ObservacoesNecessarias />,
    <ParecerAssistSocial />,
    <DeclaracaoResponsabilidadeInfoDoc />,
    <TermoAutorizacaoUsoDeImagemEVoz />,
  ];

  const { changeStep, currentComponent, currentStep, isLastStep, isFirstStep } =
    useFormSteps(formComponents);

  return (
    <form
      onSubmit={handleSubmit((data, event) => {
        event?.preventDefault();
        if (data) {
          console.log(data);
          postFicha(data);
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
        ) : (
          <button type="submit" className="btn-avancar">
            Adicionar
          </button>
        )}
      </div>
    </form>
  );
}
