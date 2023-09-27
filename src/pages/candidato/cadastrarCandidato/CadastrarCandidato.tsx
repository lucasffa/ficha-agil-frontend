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
//import TermoAutorizacaoUsoDeImagemEVoz from './components/TermoAutorizacaoUsoDeImagemEVoz';
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
const fakeData: Ficha = {
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
    NecessidadeEspecial: 'Nenhuma',
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
    IdParentescoProprietario: 0,
    PrestacaoFinanciamento: 0,
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
    DespesasDescontos: 500,
    DespesasRendaBruta: 500,
    DespesasMoradia: 500,
    DespesasRendaLiquida: 500,
    DespesasEducacao: 500,
    DespesasPessoasResidencia: 500,
    DespesasSaude: 500,
    DespesasRpc: 500,
    DespesasTotal: 500,
    DespesasObs:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  OutrosGastos:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc risus leo, bibendum eget ligula a, laoreet mollis mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut felis in nibh sollicitudin volutpat. Proin pellentesque sed libero ac finibus. Sed quis pretium elit, a placerat dolor. In euismod turpis lobortis, sodales mi vel, ultrices enim. Nullam commodo nibh non lacinia tempor. Vestibulum lacus tortor, consequat id massa eu, laoreet aliquet nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque lectus mi, semper quis nibh sed, pharetra elementum urna. Sed et lectus tincidunt, placerat ipsum nec, tincidunt tortor. Fusce in metus vulputate, dignissim nunc eu, rutrum massa. In eget luctus orci. Nam eget nisl sed velit pretium maximus vel vitae diam. Mauris placerat erat in dui bibendum pellentesque. In rhoncus eros eget ipsum fermentum, sit amet semper nulla convallis. Nam elit dolor, hendrerit vel imperdiet a, tempor ornare turpis. Curabitur posuere tempor dolor vel finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus lobortis malesuada orci. Cras dignissim, orci vitae egestas tempus, sapien ipsum consectetur diam, quis molestie est sem in mauris. Integer accumsan sem vitae sollicitudin volutpat. Praesent laoreet sem quis mauris sodales varius. Donec vestibulum, erat sed pellentesque rutrum, nulla nisi imperdiet nibh, ac aliquet nibh urna quis magna. Aliquam quis interdum nisi. Cras bibendum fringilla turpis, a semper nunc fringilla et. Vestibulum lobortis consequat sapien a rutrum. Mauris tincidunt rutrum dui vitae tempor. Aliquam iaculis, ante quis dignissim congue, metus mauris pellentesque elit, porta molestie tortor tellus vel purus. Nulla vitae dignissim elit.',
  SituacaoSocioEconomicaFamiliar:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  ObservacoesNecessarias:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  ParecerAssistSocial: {
    ParecerAssistSocial:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    StatusProcesso: '',
  },
  DataCad: new Date(),
  IdUsuario: 1,
};

export function CadastrarCandidato() {
  const [situacaoTrabalhista, setSituacaoTrabalhista] =
    useState<SituacaoTrabalhista[]>();
  const [racaEtnia, setRacaEtnia] = useState<RacaEtnia[]>();
  const [estadoCivil, setEstadoCivil] = useState<EstadoCivil[]>();
  const [parentesco, setParentesco] = useState<Parentesco[]>();
  const [escolaridade, setEscolaridade] = useState<Escolaridade[]>();
  const [coberturaMoradia, setCoberturaMoradia] =
    useState<CoberturaMoradia[]>();
  const [aceitarTermos, setAceitarTermos] = useState(false);

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
        NomeCompleto: fakeData.IdentificacaoCandidato.NomeCompleto ?? '',
        Cpf: fakeData.IdentificacaoCandidato.Cpf ?? '',
        DocIdentidade: fakeData.IdentificacaoCandidato.DocIdentidade ?? '',
        DataNascimento: null,
        Naturalidade: fakeData.IdentificacaoCandidato.Naturalidade ?? '',
        IdRacaEtnia: fakeData.IdentificacaoCandidato.IdRacaEtnia ?? undefined,
        IdSitTrabalhista:
          fakeData.IdentificacaoCandidato.IdSitTrabalhista ?? undefined,
        OutraSitTrabalhista:
          fakeData.IdentificacaoCandidato.OutraSitTrabalhista ?? '',
        IdEstadoCivil:
          fakeData.IdentificacaoCandidato.IdEstadoCivil ?? undefined,
        Email: fakeData.IdentificacaoCandidato.Email ?? '',
        NecessidadeEspecial:
          fakeData.IdentificacaoCandidato.NecessidadeEspecial ?? 0,
        EnderecoResidencial:
          fakeData.IdentificacaoCandidato.EnderecoResidencial ?? '',
        Numero: fakeData.IdentificacaoCandidato.Numero ?? '',
        Complemento: fakeData.IdentificacaoCandidato.Complemento ?? '',
        Bairro: fakeData.IdentificacaoCandidato.Bairro ?? '',
        Cep: fakeData.IdentificacaoCandidato.Cep ?? '',
        TelefoneResidencial:
          fakeData.IdentificacaoCandidato.TelefoneResidencial ?? '',
        TelefoneRecado: fakeData.IdentificacaoCandidato.TelefoneRecado ?? '',
        TelefoneCelular: fakeData.IdentificacaoCandidato.TelefoneCelular ?? '',
        NomePai: fakeData.IdentificacaoCandidato.NomePai ?? '',
        CpfPai: fakeData.IdentificacaoCandidato.CpfPai ?? '',
        NomeMae: fakeData.IdentificacaoCandidato.NomeMae ?? '',
        CpfMae: fakeData.IdentificacaoCandidato.CpfMae ?? '',
        NomeResponsavel: fakeData.IdentificacaoCandidato.NomeResponsavel ?? '',
        IdParentescoResponsavel:
          fakeData.IdentificacaoCandidato.IdParentescoResponsavel ?? undefined,
        IdEstadoCivilPai:
          fakeData.IdentificacaoCandidato.IdEstadoCivilPai ?? undefined,
        IdEstadoCivilMae:
          fakeData.IdentificacaoCandidato.IdEstadoCivilMae ?? undefined,
      },
      OutrasFichasGrupoFamiliar: [
        {
          IdFicha: fakeData.OutrasFichasGrupoFamiliar[0].IdFicha ?? undefined,
          NomeCompleto:
            fakeData.OutrasFichasGrupoFamiliar[0].NomeCompleto ?? '',
          IdParentesco:
            fakeData.OutrasFichasGrupoFamiliar[0].IdParentesco ?? undefined,
        },
      ],
      DadosEducacionaisCandidato: {
        Estuda: fakeData.DadosEducacionaisCandidato.Estuda ?? '',
        InstituicaoEnsino:
          fakeData.DadosEducacionaisCandidato.InstituicaoEnsino ?? '',
        NomeInstituicaoEnsino:
          fakeData.DadosEducacionaisCandidato.NomeInstituicaoEnsino ?? '',
        EnderecoInstituicao:
          fakeData.DadosEducacionaisCandidato.EnderecoInstituicao ?? '',
        BairroInstituicao:
          fakeData.DadosEducacionaisCandidato.BairroInstituicao ?? '',
        SerieAtual: fakeData.DadosEducacionaisCandidato.SerieAtual ?? undefined,
        Turma: fakeData.DadosEducacionaisCandidato.Turma ?? '',
        Turno: fakeData.DadosEducacionaisCandidato.Turno ?? '',
        IdEscolaridade:
          fakeData.DadosEducacionaisCandidato.IdEscolaridade ?? undefined,
        OutrosCursosRealizados:
          fakeData.DadosEducacionaisCandidato.OutrosCursosRealizados ?? '',
      },
      BeneficiosPleiteados: [
        {
          NomeCursoPretendido:
            fakeData.BeneficiosPleiteados[0].NomeCursoPretendido ?? '',
          Turno: fakeData.BeneficiosPleiteados[0].Turno ?? '',
          Horario: fakeData.BeneficiosPleiteados[0].Horario ?? '',
        },
      ],
      CondicoesSaudeCandidato: {
        NomeContatoEmergencia:
          fakeData.CondicoesSaudeCandidato.NomeContatoEmergencia ?? '',
        TelefoneEmergencia1:
          fakeData.CondicoesSaudeCandidato.TelefoneEmergencia1 ?? '',
        TelefoneEmergencia2:
          fakeData.CondicoesSaudeCandidato.TelefoneEmergencia2 ?? '',
        Alergia: fakeData.CondicoesSaudeCandidato.Alergia ?? '',
        SitMedicaEspecial:
          fakeData.CondicoesSaudeCandidato.SitMedicaEspecial ?? '',
        FraturasCirurgicas:
          fakeData.CondicoesSaudeCandidato.FraturasCirurgicas ?? '',
        MedicacaoControlada:
          fakeData.CondicoesSaudeCandidato.MedicacaoControlada ?? '',
        ProvidenciaRecomendada:
          fakeData.CondicoesSaudeCandidato.ProvidenciaRecomendada ?? '',
      },
      CondicoesSociaisESaudeFamilia: {
        FamiliarTratamentoMedico:
          fakeData.CondicoesSociaisESaudeFamilia.FamiliarTratamentoMedico ?? '',
        FamiliarUsoMedico:
          fakeData.CondicoesSociaisESaudeFamilia.FamiliarUsoMedico ?? '',
        FamiliarDeficiencia:
          fakeData.CondicoesSociaisESaudeFamilia.FamiliarDeficiencia ?? '',
        FamiliarDependenciaQuimica:
          fakeData.CondicoesSociaisESaudeFamilia.FamiliarDependenciaQuimica ??
          '',
        AcompanhamentoTerapeutico:
          fakeData.CondicoesSociaisESaudeFamilia.AcompanhamentoTerapeutico ??
          '',
        ProgramaSocial:
          fakeData.CondicoesSociaisESaudeFamilia.ProgramaSocial ?? '',
      },
      CondicoesMoradia: {
        AguaPotavel: fakeData.CondicoesMoradia.AguaPotavel ?? '',
        RedeEsgoto: fakeData.CondicoesMoradia.RedeEsgoto ?? '',
        IdCoberturaMoradia:
          fakeData.CondicoesMoradia.IdCoberturaMoradia ?? undefined,
        RuaPavimentada: fakeData.CondicoesMoradia.RuaPavimentada ?? '',
        PossuiEletricidade: fakeData.CondicoesMoradia.PossuiEletricidade ?? '',
        ComodosMoradia: fakeData.CondicoesMoradia.ComodosMoradia ?? undefined,
        TipoImovelResidencia:
          fakeData.CondicoesMoradia.TipoImovelResidencia ?? '',
        ValorAluguel: fakeData.CondicoesMoradia.ValorAluguel ?? undefined,
        IdParentescoProprietario:
          fakeData.CondicoesMoradia.IdParentescoProprietario ?? undefined,
        PrestacaoFinanciamento:
          fakeData.CondicoesMoradia.PrestacaoFinanciamento ?? undefined,
      },
      ComposicaoFamiliar: [
        {
          IdCompFamiliar:
            fakeData.ComposicaoFamiliar[0].IdCompFamiliar ?? undefined,
          IdFicha: fakeData.ComposicaoFamiliar[0].IdFicha ?? undefined,
          Nome: fakeData.ComposicaoFamiliar[0].Nome ?? '',
          IdParentesco:
            fakeData.ComposicaoFamiliar[0].IdParentesco ?? undefined,
          Idade: fakeData.ComposicaoFamiliar[0].Idade ?? undefined,
          IdEstadoCivil:
            fakeData.ComposicaoFamiliar[0].IdEstadoCivil ?? undefined,
          Profissao: fakeData.ComposicaoFamiliar[0].Profissao ?? '',
          IdSitTrabalhista:
            fakeData.ComposicaoFamiliar[0].IdSitTrabalhista ?? undefined,
          IdEscolaridade:
            fakeData.ComposicaoFamiliar[0].IdEscolaridade ?? undefined,
          Renda: fakeData.ComposicaoFamiliar[0].Renda ?? undefined,
        },
      ],
      Despesas: {
        DespesasDescontos: fakeData.Despesas.DespesasDescontos ?? undefined,
        DespesasRendaBruta: fakeData.Despesas.DespesasRendaBruta ?? undefined,
        DespesasMoradia: fakeData.Despesas.DespesasMoradia ?? undefined,
        DespesasRendaLiquida:
          fakeData.Despesas.DespesasRendaLiquida ?? undefined,
        DespesasEducacao: fakeData.Despesas.DespesasEducacao ?? undefined,
        DespesasPessoasResidencia:
          fakeData.Despesas.DespesasPessoasResidencia ?? undefined,
        DespesasSaude: fakeData.Despesas.DespesasSaude ?? undefined,
        DespesasRpc: fakeData.Despesas.DespesasRpc ?? undefined,
        DespesasTotal: fakeData.Despesas.DespesasTotal ?? undefined,
        DespesasObs: fakeData.Despesas.DespesasObs ?? undefined,
      },
      OutrosGastos: fakeData.OutrosGastos ?? undefined,
      SituacaoSocioEconomicaFamiliar:
        fakeData.SituacaoSocioEconomicaFamiliar ?? undefined,
      ObservacoesNecessarias: fakeData.ObservacoesNecessarias ?? undefined,
      ParecerAssistSocial: {
        ParecerAssistSocial:
          fakeData.ParecerAssistSocial.ParecerAssistSocial ?? undefined,
        StatusProcesso: fakeData.ParecerAssistSocial.StatusProcesso ?? '',
      },
      DataCad: fakeData.DataCad ?? new Date(),
      IdUsuario: fakeData.IdUsuario ?? 1,
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
    <DeclaracaoResponsabilidadeInfoDoc
      aceitarTermos={aceitarTermos}
      setAceitarTermos={setAceitarTermos}
    />,
    //<TermoAutorizacaoUsoDeImagemEVoz />,
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
          <button
            type="submit"
            className="btn-avancar"
            disabled={aceitarTermos === false}
          >
            Adicionar
          </button>
        )}
      </div>
    </form>
  );
}
