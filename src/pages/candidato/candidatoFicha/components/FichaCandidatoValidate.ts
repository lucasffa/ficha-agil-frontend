import { array, number, object, string } from 'yup';

const validationSchemaFicha = object().shape({
  IdentificacaoCandidato: object({
    NomeCompleto: string().required('Campo obrigatório'),
    Cpf: string().required('Campo obrigatório'),
    DocIdentidade: string().required('Campo obrigatório'),
    DataNascimento: string().required('Campo obrigatório'),
    Naturalidade: string().required('Campo obrigatório'),
    IdRacaEtnia: string().required('Campo obrigatório'),
    IdSitTrabalhista: number().required('Campo obrigatório'),
    OutraSitTrabalhista: string().when(['IdSitTrabalhista'], {
      is: (value: number) => value === 1,
      then: schema => schema.required('Campo obrigatório'),
    }),
    IdEstadoCivil: string().required('Campo obrigatório'),
    Email: string().required('Campo obrigatório'),
    NecessidadeEspecial: string().required('Campo obrigatório'),
    EnderecoResidencial: string().required('Campo obrigatório'),
    Numero: string().required('Campo obrigatório'),
    Complemento: string().required('Campo obrigatório'),
    Bairro: string().required('Campo obrigatório'),
    Cep: string().required('Campo obrigatório'),
  }),
  OutrasFichasGrupoFamiliar: array().of(
    object({
      IdFicha: number().required('Campo obrigatório'),
      NomeCompletoFamiliar: string().required('Campo obrigatório'),
      IdParentesco: number().required('Campo obrigatório'),
    })
  ),
  DadosEducacionaisCandidato: object({
    Estuda: string().required('Campo obrigatório'),
    InstituicaoEnsino: string().required('Campo obrigatório'),
    NomeInstituicao: string().required('Campo obrigatório'),
    EnderecoInstituicao: string().required('Campo obrigatório'),
    BairroInstituicao: string().required('Campo obrigatório'),
    SerieAtual: number().required('Campo obrigatório'),
    Turma: string().required('Campo obrigatório'),
    Turno: string().required('Campo obrigatório'),
    IdEscolaridade: number().required('Campo obrigatório'),
    OutrosCursosRealizados: string().required('Campo obrigatório'),
  }),
  BeneficiosPleiteados: array().of(
    object({
      NomeCursoPretendido: string().required('Campo obrigatório'),
      Turno: string().required('Campo obrigatório'),
      Horario: string().required('Campo obrigatório'),
      IdBeneficio: number().required('Campo obrigatório'),
    })
  ),
  CondicoesSaudeCandidato: object({
    NomeContatoEmergencia: string().required('Campo obrigatório'),
    TelefoneEmergencia1: string().required('Campo obrigatório'),
    TelefoneEmergencia2: string().required('Campo obrigatório'),
    Alergia: string().required('Campo obrigatório'),
    SitMedicaEspecial: string().required('Campo obrigatório'),
    FraturasCirurgias: string().required('Campo obrigatório'),
    MedicacaoControlada: string().required('Campo obrigatório'),
    ProvidenciaRecomendada: string().required('Campo obrigatório'),
  }),
  CondicoesSociaisESaudeFamilia: object({
    FamiliarTratamentoMedico: string().required('Campo obrigatório'),
    FamiliarUsoMedicamento: string().required('Campo obrigatório'),
    FamiliarDeficiencia: string().required('Campo obrigatório'),
    FamiliarDependenciaQuimica: string().required('Campo obrigatório'),
    AcompTerapeutico: string().required('Campo obrigatório'),
    ProgramaSocial: string().required('Campo obrigatório'),
  }),
  CondicoesMoradia: object({
    AguaPotavel: string().required('Campo obrigatório'),
    RedeEsgoto: string().required('Campo obrigatório'),
    IdCoberturaMoradia: number().required('Campo obrigatório'),
    RuaPavimentada: string().required('Campo obrigatório'),
    PossuiEletricidade: string().required('Campo obrigatório'),
    ComodosMoradia: number().required('Campo obrigatório'),
    TipoImovelResidencia: string().required('Campo obrigatório'),
    ValorAluguel: number().required('Campo obrigatório'),
    IdParentescoProprietario: number().required('Campo obrigatório'),
    PrestacaoFinanciamento: number().required('Campo obrigatório'),
  }),
  ComposicaoFamiliar: array().of(
    object({
      IdCompFamiliar: number().required('Campo obrigatório'),
      IdFicha: number().required('Campo obrigatório'),
      Nome: string().required('Campo obrigatório'),
      IdParentesco: number().required('Campo obrigatório'),
      Idade: number().required('Campo obrigatório'),
      IdEstadoCivil: number().required('Campo obrigatório'),
      Profissao: string().required('Campo obrigatório'),
      IdSitTrabalhista: number().required('Campo obrigatório'),
      IdEscolaridade: number().required('Campo obrigatório'),
      Renda: number().required('Campo obrigatório'),
    })
  ),
  Despesas: object({
    DespesasDescontos: number().required('Campo obrigatório'),
    DespesasRendaBruta: number().required('Campo obrigatório'),
    DespesasMoradia: number().required('Campo obrigatório'),
    DespesasRendaLiquida: number().required('Campo obrigatório'),
    DespesasEducacao: number().required('Campo obrigatório'),
    DespesasPessoasResidencia: number().required('Campo obrigatório'),
    DespesasSaude: number().required('Campo obrigatório'),
    DespesasRpc: number().required('Campo obrigatório'),
    DespesasTotal: number().required('Campo obrigatório'),
    DespesasObs: string().required('Campo obrigatório'),
  }),
  OutrosGastos: string().required('Campo obrigatório'),
  SitSocioEconomicoFamiliar: string().required('Campo obrigatório'),
  ObservacoesNecessarias: string().required('Campo obrigatório'),
  ParecerAssistSocial: object({
    ParecerAssistSocial: string().required('Campo obrigatório'),
    StatusProcesso: string().required('Campo obrigatório'),
  }),
});

export default validationSchemaFicha;
