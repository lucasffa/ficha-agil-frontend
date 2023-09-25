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
  ComposicaoFamiliar: {};
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
  const { control, handleSubmit, getValues, setValue, watch } = useForm<Ficha>({
    mode: 'onBlur',
    defaultValues: {
      IdentificacaoCandidato: {
        NomeCompleto: '',
        Cpf: '',
        DocIdentidade: '',
        DataNascimento: null,
        Naturalidade: '',
        IdRacaEtnia: undefined,
        IdSitTrabalhista: undefined,
        OutraSitTrabalhista: '',
        IdEstadoCivil: undefined,
        Email: '',
        NecessidadeEspecial: undefined,
        EnderecoResidencial: '',
        Numero: '',
        Complemento: '',
        Bairro: '',
        Cep: '',
        TelefoneResidencial: '',
        TelefoneRecado: '',
        TelefoneCelular: '',
        NomePai: '',
        CpfPai: '',
        NomeMae: '',
        CpfMae: '',
        NomeResponsavel: '',
        IdParentescoResponsavel: undefined,
        IdEstadoCivilPai: undefined,
        IdEstadoCivilMae: undefined,
      },
      OutrasFichasGrupoFamiliar: [
        {
          IdFicha: undefined,
          NomeCompleto: '',
          IdParentesco: undefined,
        },
      ],
      DadosEducacionaisCandidato: {
        Estuda: '',
        InstituicaoEnsino: '',
        NomeInstituicaoEnsino: '',
        EnderecoInstituicao: '',
        BairroInstituicao: '',
        SerieAtual: undefined,
        Turma: '',
        Turno: '',
        IdEscolaridade: undefined,
        OutrosCursosRealizados: '',
      },
      BeneficiosPleiteados: [
        {
          NomeCursoPretendido: '',
          Turno: '',
          Horario: '',
        },
      ],
      CondicoesSaudeCandidato: {
        NomeContatoEmergencia: '',
        TelefoneEmergencia1: '',
        TelefoneEmergencia2: '',
        Alergia: '',
        SitMedicaEspecial: '',
        FraturasCirurgicas: '',
        MedicacaoControlada: '',
        ProvidenciaRecomendada: '',
      },
      CondicoesSociaisESaudeFamilia: {
        FamiliarTratamentoMedico: '',
        FamiliarUsoMedico: '',
        FamiliarDeficiencia: '',
        FamiliarDependenciaQuimica: '',
        AcompanhamentoTerapeutico: '',
        ProgramaSocial: '',
      },
      CondicoesMoradia: {
        AguaPotavel: '',
        RedeEsgoto: '',
        IdCoberturaMoradia: undefined,
        RuaPavimentada: '',
        PossuiEletricidade: '',
        ComodosMoradia: undefined,
        TipoImovelResidencia: '',
        ValorAluguel: undefined,
        IdParentescoProprietario: undefined,
        PrestacaoFinanciamento: undefined,
      },
      ComposicaoFamiliar: {},
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
    />,
    <IdentificacaoCandidatoPaiMae
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
    />,
    <OutrasFichasGrupoFamiliar
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
    />,
    <DadosEducacionaisCandidato
      control={control}
      getValues={getValues}
      setValue={setValue}
      watch={watch}
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
    />,
    <ComposicaoFamiliar />,
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
