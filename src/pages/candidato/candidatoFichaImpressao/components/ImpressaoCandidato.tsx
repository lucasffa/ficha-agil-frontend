import { FormControl, Grid, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Controller,
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  InputComMascara,
  MascaraInput,
} from '../../../../Shared/InputPadraoForm';
import {
  EstadoCivil,
  Ficha,
  Parentesco,
  RacaEtnia,
  SituacaoTrabalhista,
  Escolaridade,
  CoberturaMoradia,
} from '../CandidatoFichaImpressao';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';
import CurrencyFieldInput from '../../../../Shared/InputMaskCurrency';
import '../candidatoFichaImpressao.scss';
import logoItaka from '../../../../assets/images/logo-itaka.svg';

interface FichaImpressao {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
  situacaoTrabalhista: SituacaoTrabalhista[] | undefined;
  racaEtnia: RacaEtnia[] | undefined;
  estadoCivil: EstadoCivil[] | undefined;
  parentesco: Parentesco[] | undefined;
  escolaridade: Escolaridade[] | undefined;
  coberturaMoradia: CoberturaMoradia[] | undefined;
}

const theme = createTheme({
  components: {
    // Sobrescrevendo MuiGrid para estilizar o Grid
    MuiGrid: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    // Sobrescrevendo MuiTextField para estilizar o TextField
    MuiTextField: {
      styleOverrides: {
        root: {
          // Sobrescreve o borderRadius 0 a todos os TextField
          borderRadius: 0,
          // Sobrescreve a borda preta ao contorno do TextField
          borderColor: '#000',

          // Sobrescreve o tamanho da fonte do TextField
          input: {
            fontSize: '0.8rem',
          },
        },
      },
    },
    // Sobrescrevendo MuiOutlinedInput para estilizar o Input do TextField
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // Sobrescreve o borderRadius 0 a todos os Inputs de TextField
          borderRadius: 0,

          // Sobrescreve a borda preta ao contorno do Input de TextField
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000',
          },

          // Sobrescreve a borda preta ao contorno do Input de TextField quando o mesmo estiver em hover
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000', // Cor da borda no hover
          },

          // Sobrescreve a borda preta ao contorno do Input de TextField quando o mesmo estiver selecionado
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            // Está aparecendo "focused", mas é a seleção do input, que é diferente quando passamos o mouse por cima quando clicado e quando não clicado
            borderColor: '#000', // Cor da borda quando selecionado
            // Borda com espessura
            borderWidth: 1,
          },
        },
        // Sobrescreve o estilo de foco
        focused: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000',
          },
        },
      },
    },
    // Sobrescrevendo MuiInputLabel para estilizar o Label do TextField
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // Sobrescreve o float do Label do TextField, deixando-o ativado por padrão
          transform: 'translate(14px, -6px) scale(0.75)',

          // Sobrescreve a cor de fundo do Label do TextField
          backgroundColor: '#fff',

          // Padding do Label do TextField
          paddingRight: '5%',
          paddingLeft: '2%',

          // Sobrescreve o tamanho da fonte do Label do TextField
          fontSize: '0.80rem',

          // Sobrescreve a cor da fonte do Label do TextField
          color: '#000',

          // Sobrescreve a cor do Label do TextField quando o mesmo estiver selecionado
          '&.Mui-focused': {
            color: '#000',
          },

          // Sobrescreve a cor do Label do TextField quando o mesmo estiver preenchido
          '&.MuiInputLabel-shrink': {
            color: '#000',
            fontWeight: '700',
          },

          // Sobrescreve a cor do Label do TextField quando o mesmo estiver focado
          '&.Mui-focused.MuiInputLabel-shrink': {
            color: '#000',
            fontWeight: '700',
          },

          // Sobrescreve a cor do Label do TextField quando o mesmo estiver em hover
          '&:hover': {
            color: '#000',
            fontWeight: '700',
          },
        },
      },
    },
  },
});

export function ImpressaoCandidato(props: FichaImpressao) {
  const [totalRendaFamiliar, setTotalRendaFamiliar] = useState<Number>(0);

  useEffect(() => {
    const rendas = props.getValues('ComposicaoFamiliar').map(f => f.Renda);
    const totalRenda = rendas.reduce(
      (total: number, rendaAtual: number | undefined) => {
        const renda = parseFloat(String(rendaAtual ?? '')) || 0;
        return total + renda;
      },
      0
    );

    setTotalRendaFamiliar(totalRenda);
  }, [props.getValues, props.watch]);

  useEffect(() => {
    registerLocale('pt-BR', ptBR);
  }, []);

  function calcularIdade(dataNascimento: Date | null) {
    if (dataNascimento === null) {
      return '';
    }
    const hoje = new Date();
    const dataNasc = new Date(dataNascimento);
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    // Verificar se o aniversário já ocorreu neste ano
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    const mesNasc = dataNasc.getMonth();
    const diaNasc = dataNasc.getDate();

    if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
      idade--;
    }

    return idade + ' anos';
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container className='print-section' spacing={0}>
        
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '50%',
              alignItems: 'center',
            }}
          >
            <img
              style={{ width: '100px', height: '100px' }}
              src={logoItaka}
              alt="Logo Itaka Ficha"
              title="Logo Itaka Ficha"
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <b>
                <h6>Obra Social Itaka Escolápios</h6>
                <h6>Governador Valadares</h6>
              </b>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <b>
              <h5 style={{ textAlign: 'right' }}>
                Ficha cadastral e Formulário socioeconômico
                <br />
                para atendimento socioassistencial
              </h5>
            </b>
          </div>
        </div>

        {/* Identificação do candidato */}
        <div className="cabecalho-form-impressao">
          1. IDENTIFICAÇÃO DO CANDIDATO
        </div>
        <Grid container className='print-section' spacing={1}>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.NomeCompleto"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 2"
                    label="Nome Completo"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                    //error={!!errors?.name}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.Cpf"
              render={({ field }) => {
                return (
                  <InputComMascara
                    name="Cpf"
                    mask={MascaraInput.cpf}
                    value={field.value}
                    readOnly={true}
                    onChange={field.onChange}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.DocIdentidade"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 2"
                    label="Doc. Identidade"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.DataNascimento"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 3123"
                    label="Data de Nasc."
                    color="primary"
                    variant="outlined"
                    value={
                      field.value
                        ? new Date(field.value).toLocaleDateString('pt-BR')
                        : ''
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.Naturalidade"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 3"
                    label="Naturalidade"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              id="outlined-basic 3"
              label="Idade"
              color="primary"
              variant="outlined"
              value={`${calcularIdade(
                props.watch('IdentificacaoCandidato.DataNascimento')
              )}`}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.IdRacaEtnia"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Raça/Etnia"
                      value={
                        props.racaEtnia?.find(
                          item =>
                            item.IDRACAETNIA ===
                            props.getValues(
                              'IdentificacaoCandidato.IdRacaEtnia'
                            )
                        )?.DESCRICAO || ''
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.IdSitTrabalhista"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Situação Trabalhista"
                      value={
                        props.situacaoTrabalhista?.find(
                          item =>
                            item.IDSITTRABALHISTA ===
                            props.getValues(
                              'IdentificacaoCandidato.IdSitTrabalhista'
                            )
                        )?.DESCRICAO || ''
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          {props.getValues('IdentificacaoCandidato.IdSitTrabalhista') === 1 ? (
            <Grid item xs={4}>
              <Controller
                control={props.control}
                name="IdentificacaoCandidato.OutraSitTrabalhista"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basic 3"
                        label="Outro"
                        color="primary"
                        variant="outlined"
                        {...field}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
          ) : null}
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.IdEstadoCivil"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Estado Civil"
                      value={
                        props.estadoCivil?.find(
                          item =>
                            item.IDESTADOCIVIL ===
                            props.getValues(
                              'IdentificacaoCandidato.IdEstadoCivil'
                            )
                        )?.DESCRICAO || ''
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.Email"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 3"
                    label="Email"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.NecessidadeEspecial"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 4"
                    label="Alguma Necessidade Especial"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.EnderecoResidencial"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 5"
                    label="Endereço Residencial"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.Numero"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 6"
                    label="Número"
                    color="primary"
                    variant="outlined"
                    type="number"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.Bairro"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 8"
                    label="Bairro"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.Complemento"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 7"
                    label="Complemento"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.Cep"
              render={({ field }) => {
                return (
                  <InputComMascara
                    name="Cep"
                    mask={MascaraInput.cep}
                    value={field.value}
                    readOnly={true}
                    onChange={field.onChange}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.TelefoneResidencial"
              render={({ field }) => {
                return (
                  <InputComMascara
                    name="Telefone Residencial"
                    mask={MascaraInput.telefoneResidencial}
                    value={field.value}
                    readOnly={true}
                    onChange={field.onChange}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.TelefoneRecado"
              render={({ field }) => {
                return (
                  <InputComMascara
                    name="Telefone Recado"
                    mask={MascaraInput.telefoneRecado}
                    value={field.value}
                    readOnly={true}
                    onChange={field.onChange}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.TelefoneCelular"
              render={({ field }) => {
                return (
                  <InputComMascara
                    name="Telefone Celular"
                    mask={MascaraInput.telefone}
                    value={field.value}
                    readOnly={true}
                    onChange={field.onChange}
                  />
                );
              }}
            />
          </Grid>

          <Grid item xs={9}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.NomePai"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 9"
                    label="Nome do Pai"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.CpfPai"
              render={({ field }) => {
                return (
                  <InputComMascara
                    name="Cpf Pai"
                    mask={MascaraInput.cpf}
                    value={field.value}
                    readOnly={true}
                    onChange={field.onChange}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={9}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.NomeMae"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 11"
                    label="Nome da Mãe"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.CpfMae"
              render={({ field }) => {
                return (
                  <InputComMascara
                    name="Cpf Mãe"
                    mask={MascaraInput.cpf}
                    value={field.value}
                    readOnly={true}
                    onChange={field.onChange}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.NomeResponsavel"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 13"
                    label="Responsável pelo candidato"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.IdParentescoResponsavel"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Parentesco do Responsável"
                      value={
                        props.parentesco?.find(
                          item =>
                            item.IDPARENTESCO ===
                            props.getValues('IdentificacaoCandidato')
                              ?.IdParentescoResponsavel
                        )?.DESCRICAO || ''
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.IdEstadoCivilPai"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Estado Civil Pai"
                      value={
                        props.estadoCivil?.find(
                          item =>
                            item.IDESTADOCIVIL ===
                            props.getValues(
                              'IdentificacaoCandidato.IdEstadoCivilPai'
                            )
                        )?.DESCRICAO || ''
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.IdEstadoCivilMae"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Estado Civil Mãe"
                      value={
                        props.estadoCivil?.find(
                          item =>
                            item.IDESTADOCIVIL ===
                            props.getValues(
                              'IdentificacaoCandidato.IdEstadoCivilMae'
                            )
                        )?.DESCRICAO || ''
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
        </Grid>

        {/* Dados de outras fichas do grupo familiar */}
        <div className="cabecalho-form-impressao">
          2. OUTRAS FICHAS DO GRUPO FAMILIAR
        </div>
        <Grid container className='print-section' spacing={0}>
          {props.getValues('OutrasFichasGrupoFamiliar').map((item, index) => {
            return (
              <Grid
                container className='print-section'
                key={index}
                spacing={1}
                style={{ marginBottom: '16px' }}
              >
                <Grid item xs={2}>
                  <Controller
                    control={props.control}
                    name={`OutrasFichasGrupoFamiliar.${index}.IdFicha`}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        id={`outlined-basic-${index}-1`}
                        label="Nº Ficha"
                        color="primary"
                        variant="outlined"
                        type="number"
                        {...field}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Controller
                    control={props.control}
                    name={`OutrasFichasGrupoFamiliar.${index}.NomeCompletoFamiliar`}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        id={`outlined-basic-${index}-2`}
                        label="Nome Completo"
                        color="primary"
                        variant="outlined"
                        {...field}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    control={props.control}
                    name={`OutrasFichasGrupoFamiliar.${index}.IdParentesco`}
                    render={({ field }) => {
                      const parentescoValue =
                        props.parentesco?.find(
                          item => item.IDPARENTESCO === field.value
                        )?.DESCRICAO || '';

                      return (
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            id="outlined-read-only-input"
                            label="Parentesco"
                            value={parentescoValue}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Grid>

        {/* Dados educacionais da ficha */}
        <div className="cabecalho-form-impressao">
          3. DADOS EDUCACIONAIS DO CANDIDATO
        </div>
        <Grid container className='print-section' spacing={1}>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="DadosEducacionaisCandidato.Estuda"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Estuda"
                      value={field.value === 'S' ? 'Sim' : 'Não'}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="DadosEducacionaisCandidato.InstituicaoEnsino"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Instituição de Ensino"
                      value={field.value === 'U' ? 'Pública' : 'Privada'}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name="DadosEducacionaisCandidato.NomeInstituicaoEnsino"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 9"
                    label="Nome da Escola/Instituição de Ensino"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name="DadosEducacionaisCandidato.EnderecoInstituicao"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 9"
                    label="Endereço da instituição de ensino"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="DadosEducacionaisCandidato.BairroInstituicao"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 9"
                    label="Bairro"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              control={props.control}
              name="DadosEducacionaisCandidato.SerieAtual"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 9"
                    label="Série atual"
                    color="primary"
                    variant="outlined"
                    type="number"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              control={props.control}
              name="DadosEducacionaisCandidato.Turma"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 9"
                    label="Turma"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              control={props.control}
              name="DadosEducacionaisCandidato.Turno"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Turno"
                      value={
                        field.value === 'M'
                          ? 'Manhã'
                          : field.value === 'T'
                          ? 'Tarde'
                          : 'Noite'
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="DadosEducacionaisCandidato.IdEscolaridade"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Escolaridade"
                      value={
                        props.escolaridade?.find(
                          item => item.IDESCOLARIDADE === field.value
                        )?.DESCRICAO || ''
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name="DadosEducacionaisCandidato.OutrosCursosRealizados"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 9"
                    label="Outros cursos já realizados (em qualquer instituição)"
                    color="primary"
                    variant="outlined"
                    {...field}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
            />
          </Grid>
        </Grid>

        {/* Benefícios pleiteados da ficha */}
        <div className="cabecalho-form-impressao">4. BENEFÍCIOS PLEITEADOS</div>
        <Grid container className='print-section' spacing={0}>
          {props.getValues('BeneficiosPleiteados').map((item, index) => {
            return (
              <Grid
                container className='print-section'
                key={index}
                spacing={1}
                style={{ marginBottom: '16px' }}
              >
                <Grid item xs={8}>
                  <Controller
                    control={props.control}
                    name={`BeneficiosPleiteados.${index}.NomeCursoPretendido`}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        id={`outlined-basic-${index}-1`}
                        label="Cursos ou Atividades pretendidos (Na ordem de prioridade)
                          "
                        color="primary"
                        variant="outlined"
                        {...field}
                        inputProps={{ readOnly: true }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    control={props.control}
                    name={`BeneficiosPleiteados.${index}.Turno`}
                    render={({ field }) => {
                      return (
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            id="outlined-read-only-input"
                            label="Turno"
                            value={
                              field.value === 'M'
                                ? 'Manhã'
                                : field.value === 'T'
                                ? 'Tarde'
                                : 'Noite'
                            }
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    control={props.control}
                    name={`BeneficiosPleiteados.${index}.Horario`}
                    render={({ field }) => (
                      <InputComMascara
                        name="Horário"
                        mask={MascaraInput.horario}
                        value={field.value}
                        readOnly={true}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Grid>

        {/* Condições de saúde do candidato */}
        <div className="cabecalho-form-impressao">
          5. CONDIÇÕES DE SAÚDE DO CANDIDATO
        </div>
        <Grid container className='print-section' spacing={1}>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name={`CondicoesSaudeCandidato.NomeContatoEmergencia`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`outlined-basic-1`}
                  label="Nome do contato em caso de emergência médica"
                  color="primary"
                  variant="outlined"
                  {...field}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="CondicoesSaudeCandidato.TelefoneEmergencia1"
              render={({ field }) => {
                return (
                  <InputComMascara
                    name="Telefone de Emergência 1"
                    mask={MascaraInput.telefone}
                    value={field.value}
                    readOnly={true}
                    onChange={field.onChange}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="CondicoesSaudeCandidato.TelefoneEmergencia2"
              render={({ field }) => {
                return (
                  <InputComMascara
                    name="Telefone de Emergência 2"
                    mask={MascaraInput.telefone}
                    readOnly={true}
                    value={field.value}
                    onChange={field.onChange}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name={`CondicoesSaudeCandidato.Alergia`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`outlined-basic-1`}
                  label="É alérgico a alguma substância ou medicamento?"
                  color="primary"
                  variant="outlined"
                  {...field}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name={`CondicoesSaudeCandidato.SitMedicaEspecial`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`outlined-basic-12321`}
                  label="Possui alguma situação médica especial?"
                  color="primary"
                  variant="outlined"
                  {...field}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name={`CondicoesSaudeCandidato.FraturasCirurgicas`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`outlined-basic-334`}
                  label="Possui fraturas ou cirurgias recentes?"
                  color="primary"
                  variant="outlined"
                  {...field}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name={`CondicoesSaudeCandidato.MedicacaoControlada`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`outlined-basic-2`}
                  label="Faz uso de medicação controlada?"
                  color="primary"
                  variant="outlined"
                  {...field}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name={`CondicoesSaudeCandidato.ProvidenciaRecomendada`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`outlined-basic-2132`}
                  label="Alguma providência recomendada em caso de emergência médica?"
                  color="primary"
                  variant="outlined"
                  {...field}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Condições sociais e de saúde da família */}
        <div className="cabecalho-form-impressao">
          6. CONDIÇÕES SOCIAIS E DE SAÚDE DA FAMÍLIA
        </div>
        <Grid container className='print-section' spacing={1}>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name={`CondicoesSociaisESaudeFamilia.FamiliarTratamentoMedico`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`outlined-basic-11232`}
                  label="Alguém da composição familiar está em tratamento médico?"
                  color="primary"
                  variant="outlined"
                  {...field}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name={`CondicoesSociaisESaudeFamilia.FamiliarUsoMedico`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`outlined-basic-654232`}
                  label="Alguém da composição familiar faz uso contínuo de medicamentos?"
                  color="primary"
                  variant="outlined"
                  {...field}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name={`CondicoesSociaisESaudeFamilia.FamiliarDeficiencia`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`outlined-basic-11232`}
                  label="Alguém da composição familiar com deficiência (sensorial, auditiva, visual, múltipla, etc.)? (Conforme decreto 3.298/99)"
                  color="primary"
                  variant="outlined"
                  {...field}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name={`CondicoesSociaisESaudeFamilia.FamiliarDependenciaQuimica`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`outlined-basic-1564126`}
                  label="Alguém na família sofre de dependência química?"
                  color="primary"
                  variant="outlined"
                  {...field}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name={`CondicoesSociaisESaudeFamilia.AcompanhamentoTerapeutico`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`outlined-basic-1123121`}
                  label="Faz algum tipo de tratamento ou acompanhamento terapêutico/social?"
                  color="primary"
                  variant="outlined"
                  {...field}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name={`CondicoesSociaisESaudeFamilia.ProgramaSocial`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`outlined-basic-11232`}
                  label="Alguém de sua família recebe benefício de programa social?"
                  color="primary"
                  variant="outlined"
                  {...field}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* Condições de moradia */}
        <div className="cabecalho-form-impressao">7. CONDIÇÕES DE MORADIA</div>
        <Grid container className='print-section' spacing={1}>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="CondicoesMoradia.AguaPotavel"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Possui agua potável"
                      value={field.value === 'S' ? 'Sim' : 'Não'}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="CondicoesMoradia.RedeEsgoto"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Possui rede de esgoto"
                      value={field.value === 'S' ? 'Sim' : 'Não'}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name="CondicoesMoradia.IdCoberturaMoradia"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Tipo da cobertura da moradia"
                      value={
                        props.coberturaMoradia?.find(
                          item => item.IDCOBERTURAMORADIA === field.value
                        )?.DESCRICAO || ''
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="CondicoesMoradia.RuaPavimentada"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="A rua é pavimentada"
                      value={field.value === 'S' ? 'Sim' : 'Não'}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={props.control}
              name="CondicoesMoradia.PossuiEletricidade"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Possui eletricidade"
                      value={
                        field.value === 'S'
                          ? 'Sim'
                          : field.value === 'N'
                          ? 'Não'
                          : 'Coletiva'
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name={`CondicoesMoradia.ComodosMoradia`}
              render={({ field }) => (
                <TextField
                  fullWidth
                  id={`outlined-basic-11232`}
                  label="Número de cômodos da moradia"
                  color="primary"
                  variant="outlined"
                  type="number"
                  {...field}
                  inputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={
              props.watch('CondicoesMoradia.TipoImovelResidencia') !== '' &&
              props.watch('CondicoesMoradia.TipoImovelResidencia') !== 'P'
                ? 6
                : 12
            }
          >
            <Controller
              control={props.control}
              name="CondicoesMoradia.TipoImovelResidencia"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-read-only-input"
                      label="Tipo de imóvel da residência"
                      value={
                        field.value === 'P'
                          ? 'Próprio'
                          : field.value === 'A'
                          ? 'Alugado'
                          : field.value === 'C'
                          ? 'Cedido'
                          : 'Financiado'
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          {props.getValues('CondicoesMoradia.TipoImovelResidencia') === 'A' ? (
            <Grid item xs={6}>
              <Controller
                control={props.control}
                name="CondicoesMoradia.ValorAluguel"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <CurrencyFieldInput
                        label="Valor do Aluguel"
                        {...field}
                        readOnly={true}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
          ) : null}
          {props.getValues('CondicoesMoradia.TipoImovelResidencia') === 'C' ? (
            <Grid item xs={6}>
              <Controller
                control={props.control}
                name="CondicoesMoradia.IdParentescoProprietario"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-read-only-input"
                        label="Parentesco com o proprietário"
                        value={
                          props.parentesco?.find(
                            item =>
                              item.IDPARENTESCO ===
                              props.getValues(
                                'CondicoesMoradia.IdParentescoProprietario'
                              )
                          )?.DESCRICAO || ''
                        }
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
          ) : null}
          {props.getValues('CondicoesMoradia.TipoImovelResidencia') === 'F' ? (
            <Grid item xs={6}>
              <Controller
                control={props.control}
                name="CondicoesMoradia.PrestacaoFinanciamento"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basic 3"
                        label="Valor da prestação"
                        color="primary"
                        variant="outlined"
                        {...field}
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
          ) : null}
        </Grid>

        {/* Composição familiar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: '16px',
          }}
        >
          <div className="cabecalho-form-impressao">8. COMPOSIÇÃO FAMILIAR</div>
          <div>
            TOTAL DA RENDA FAMILIAR:{' '}
            {totalRendaFamiliar.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
        </div>
        <Grid container className='print-section' spacing={0}>
          {props.getValues('ComposicaoFamiliar').map((item, index) => {
            return (
              <Grid
                container className='print-section'
                key={index}
                spacing={1}
                style={{ marginBottom: '16px' }}
              >
                <Grid item xs={3}>
                  <Controller
                    control={props.control}
                    name={`ComposicaoFamiliar.${index}.Nome`}
                    render={({ field }) => {
                      return (
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            id="outlined-basic 3"
                            label="Nome"
                            color="primary"
                            variant="outlined"
                            {...field}
                            inputProps={{ readOnly: true }}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    control={props.control}
                    name={`ComposicaoFamiliar.${index}.IdParentesco`}
                    render={({ field }) => {
                      const parentescoDescricao =
                        props.parentesco?.find(
                          item => item.IDPARENTESCO === field.value
                        )?.DESCRICAO || '';

                      return (
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            id={`outlined-read-only-input-parentesco-${index}`}
                            label="Parentesco"
                            value={parentescoDescricao}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    control={props.control}
                    name={`ComposicaoFamiliar.${index}.Idade`}
                    render={({ field }) => {
                      return (
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            id="outlined-basic 3"
                            label="Idade"
                            color="primary"
                            variant="outlined"
                            type="number"
                            {...field}
                            inputProps={{ readOnly: true }}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    control={props.control}
                    name={`ComposicaoFamiliar.${index}.IdEstadoCivil`}
                    render={({ field }) => {
                      const estadoCivilDescricao =
                        props.estadoCivil?.find(
                          item => item.IDESTADOCIVIL === field.value
                        )?.DESCRICAO || '';

                      return (
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            id={`outlined-read-only-input-estado-civil-${index}`}
                            label="Estado Civil"
                            value={estadoCivilDescricao}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Controller
                    control={props.control}
                    name={`ComposicaoFamiliar.${index}.IdSitTrabalhista`}
                    render={({ field }) => {
                      const situacaoTrabalhistaDescricao =
                        props.situacaoTrabalhista?.find(
                          item => item.IDSITTRABALHISTA === field.value
                        )?.DESCRICAO || '';

                      return (
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            id={`outlined-read-only-input-situacao-trabalhista-${index}`}
                            label="Situação Trabalhista"
                            value={situacaoTrabalhistaDescricao}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    control={props.control}
                    name={`ComposicaoFamiliar.${index}.Profissao`}
                    render={({ field }) => {
                      return (
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            id="outlined-basic 3"
                            label="Profissão"
                            color="primary"
                            variant="outlined"
                            {...field}
                            inputProps={{ readOnly: true }}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    control={props.control}
                    name={`ComposicaoFamiliar.${index}.IdEscolaridade`}
                    render={({ field }) => {
                      const escolaridadeDescricao =
                        props.escolaridade?.find(
                          item => item.IDESCOLARIDADE === field.value
                        )?.DESCRICAO || '';

                      return (
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            id={`outlined-read-only-input-${index}`}
                            label="Escolaridade"
                            value={escolaridadeDescricao}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    control={props.control}
                    name={`ComposicaoFamiliar.${index}.Renda`}
                    render={({ field }) => {
                      return (
                        <FormControl fullWidth>
                          <CurrencyFieldInput
                            label="Renda"
                            {...field}
                            readOnly={true}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Grid>

        {/* Despesas */}
        <div className="cabecalho-form-impressao">9. DESPESAS</div>
        <Grid container className='print-section' spacing={0}>
          <Grid container className='print-section' spacing={1}>
            <Grid item xs={6}>
              <Controller
                control={props.control}
                name="Despesas.DespesasDescontos"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <CurrencyFieldInput
                        label="Descontos obrigatórios"
                        {...field}
                        readOnly={true}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={props.control}
                name="Despesas.DespesasRendaBruta"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <CurrencyFieldInput
                        label="Renda bruta"
                        {...field}
                        readOnly={true}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={props.control}
                name="Despesas.DespesasMoradia"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <CurrencyFieldInput
                        label="Moradia"
                        {...field}
                        readOnly={true}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={props.control}
                name="Despesas.DespesasRendaLiquida"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <CurrencyFieldInput
                        label="Renda líquida"
                        {...field}
                        readOnly={true}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={props.control}
                name="Despesas.DespesasEducacao"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <CurrencyFieldInput
                        label="Educação"
                        {...field}
                        readOnly={true}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={props.control}
                name="Despesas.DespesasPessoasResidencia"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basic 3"
                        label="Número de pessoas na residência"
                        color="primary"
                        variant="outlined"
                        type="number"
                        {...field}
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={props.control}
                name="Despesas.DespesasSaude"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <CurrencyFieldInput
                        label="Saúde"
                        {...field}
                        readOnly={true}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={props.control}
                name="Despesas.DespesasRpc"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <CurrencyFieldInput
                        label="RPC"
                        {...field}
                        readOnly={true}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={props.control}
                name="Despesas.DespesasTotal"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <CurrencyFieldInput
                        label="Total"
                        {...field}
                        readOnly={true}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={props.control}
                name="Despesas.DespesasObs"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="outlined-basic 3"
                        label="Observações"
                        color="primary"
                        variant="outlined"
                        {...field}
                        inputProps={{ readOnly: true }}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Outros gastos */}
        <div className="cabecalho-form-impressao">10. OUTROS GASTOS</div>
        <Grid container className='print-section' spacing={0}>
          <Grid container className='print-section' spacing={1}>
            <Grid item xs={12}>
              <Controller
                control={props.control}
                name="OutrosGastos"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <TextField
                        multiline
                        minRows={2}
                        {...field}
                        InputProps={{
                          readOnly: true,
                          style: {
                            textAlign: 'justify',
                            whiteSpace: 'pre-wrap', // Garante que as quebras de linha e espaços sejam preservados
                          },
                        }}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Observações que o candidato ou o entrevistador julguem necessárias */}
        <div className="cabecalho-form-impressao">
          11. OBSERVAÇÕES QUE O CANDIDATO OU O ENTREVISTADOR JULGUEM NECESSÁRIAS{' '}
        </div>
        <Grid container className='print-section' spacing={0}>
          <Grid container className='print-section' spacing={1}>
            <Grid item xs={12}>
              <Controller
                control={props.control}
                name="ObservacoesNecessarias"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <TextField
                        multiline
                        minRows={2}
                        {...field}
                        InputProps={{
                          readOnly: true,
                          style: {
                            textAlign: 'justify',
                            whiteSpace: 'pre-wrap', // Garante que as quebras de linha e espaços sejam preservados
                          },
                        }}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Declaração de responsabilidade pelas informações e documentos */}
        <div className="cabecalho-form-impressao">
          {' '}
          12. DECLARAÇÃO DE RESPONSABILIDADE PELAS INFORMAÇÕES E DOCUMENTOS{' '}
        </div>
        <Grid container className='print-section' spacing={0}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <span
              style={{
                width: '100%',
                textAlign: 'justify',
                textJustify: 'inter-word',
              }}
            >
              Declaro, para efeito de estudo socioeconômico, que as informações
              prestadas nesse documento de 4 (quatro) páginas numeradas estão
              completas e são verdadeiras e assumo, por elas e pelas cópias dos
              documentos apresentados, inteira responsabilidade, ciente das
              penalidades previstas no Código Penal Brasileiro, Artigos 171 e
              299. Autorizo a apresentação desses documentos aos órgãos públicos
              competentes, se necessário. Declaro ainda estar ciente de que os
              dados apresentados serão submetidos a uma análise técnica e, se
              convocado (a), deverei comparecer à Instituição, para entrevista
              com o (a) Assistente Social, em data e horário previamente
              agendados pela Instituição, apresentando os originais de todos os
              documentos anexados ao formulário e quaisquer outros que forem
              solicitados.
            </span>

            <div
              className="assinatura-container className='print-section'"
              style={{
                fontFamily: 'Arial, sans-serif',
                paddingBottom: '0px',
                paddingTop: '25px',
              }}
            >
              <div
                className="campos-superiores"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'space-between',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <div
                  className="campo-cidade"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingRight: '30px',
                  }}
                >
                  <div
                    className="eixo-horizontal"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <div
                      className="linha"
                      style={{
                        width: '300px',
                        marginTop: '8px',
                        borderBottom: '2px solid black',
                      }}
                    ></div>
                    <p> , </p>
                  </div>
                  <i>(Cidade)</i>
                </div>
                <div
                  className="campo-data"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingRight: '30px',
                  }}
                >
                  <div
                    className="eixo-horizontal"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <div
                      className="linha"
                      style={{
                        width: '40px',
                        marginTop: '8px',
                        borderBottom: '2px solid black',
                        marginRight: '8px',
                        marginLeft: '8px',
                      }}
                    ></div>
                    <b> de </b>
                    <div
                      className="linha"
                      style={{
                        width: '180px',
                        marginTop: '8px',
                        borderBottom: '2px solid black',
                        marginRight: '8px',
                        marginLeft: '8px',
                      }}
                    ></div>
                    <b> de </b>
                    <div
                      className="linha"
                      style={{
                        width: '80px',
                        marginTop: '8px',
                        borderBottom: '2px solid black',
                        marginRight: '8px',
                        marginLeft: '8px',
                      }}
                    ></div>
                  </div>
                  <i>(Data)</i>
                </div>
              </div>
              <div
                className="campo-assinatura"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '30px',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="linha"
                  style={{
                    width: '400px',
                    marginTop: '8px',
                    borderBottom: '1px solid black',
                  }}
                ></div>
                <span>Assinatura do(a) responsável pelas informações</span>
              </div>
            </div>
          </div>
        </Grid>

        {/* Assinatura do Entrevistador */}
        <Grid
          container className='print-section'
          spacing={0}
          style={{ paddingBottom: '10px', paddingTop: '50px' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <div
              className="assinatura-container className='print-section'"
              style={{ fontFamily: 'Arial, sans-serif', marginTop: '16px' }}
            >
              <div
                className="campo-assinatura"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '20px',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="linha"
                  style={{
                    width: '400px',
                    marginTop: '8px',
                    borderBottom: '1px solid black',
                  }}
                ></div>
                <span>Assinatura do(a) Entrevistador(a)</span>
              </div>
            </div>
          </div>
        </Grid>

        {/* Situação socioeconômica familiar */}
        <div className="cabecalho-form-impressao">
          13. SITUAÇÃO SOCIOECONÔMICA FAMILIAR
        </div>
        <Grid container className='print-section' spacing={0}>
          <Grid container className='print-section' spacing={1}>
            <Grid item xs={12}>
              <Controller
                control={props.control}
                name="SituacaoSocioEconomicaFamiliar"
                render={({ field }) => {
                  return (
                    <FormControl fullWidth>
                      <TextField
                        multiline
                        minRows={5}
                        {...field}
                        InputProps={{
                          readOnly: true,
                          style: {
                            textAlign: 'justify',
                            whiteSpace: 'pre-wrap', // Garante que as quebras de linha e espaços sejam preservados
                          },
                        }}
                      />
                    </FormControl>
                  );
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Parecer do Assistente Social */}
        <div className="cabecalho-form-impressao">
          14. PARECER DO (A) ASSISTENTE SOCIAL
        </div>
        <Grid container className='print-section' spacing={1}>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name="ParecerAssistSocial.ParecerAssistSocial"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      minRows={5}
                      {...field}
                      InputProps={{
                        readOnly: true,
                        style: {
                          textAlign: 'justify',
                          whiteSpace: 'pre-wrap', // Garante que as quebras de linha e espaços sejam preservados
                        },
                      }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={props.control}
              name="ParecerAssistSocial.StatusProcesso"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-basic 3"
                      label="O Processo foi"
                      color="primary"
                      variant="outlined"
                      value={
                        field.value === 'D'
                          ? 'Deferido'
                          : field.value === 'A'
                          ? 'Em Análise'
                          : 'Indeferido'
                      }
                      inputProps={{ readOnly: true }}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
        </Grid>

        {/* Assinatura da Assistente Social */}
        <Grid
          container className='print-section'
          spacing={0}
          style={{ height: '300px', paddingTop: '20px', paddingBottom: '20px' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <div
              className="assinatura-container className='print-section'"
              style={{
                fontFamily: 'Arial, sans-serif',
                paddingBottom:
                  '30px' /* Este paddingBottom garante que a assinatura fique na mesma página */,
              }}
            >
              <div
                className="campos-superiores"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'space-between',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <div
                  className="campo-cidade"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingRight: '30px',
                  }}
                >
                  <div
                    className="eixo-horizontal"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <div
                      className="linha"
                      style={{
                        width: '300px',
                        marginTop: '8px',
                        borderBottom: '2px solid black',
                      }}
                    ></div>
                    <p> , </p>
                  </div>
                  <i>(Cidade)</i>
                </div>
                <div
                  className="campo-data"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingRight: '30px',
                  }}
                >
                  <div
                    className="eixo-horizontal"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <div
                      className="linha"
                      style={{
                        width: '40px',
                        marginTop: '8px',
                        borderBottom: '2px solid black',
                        marginRight: '8px',
                        marginLeft: '8px',
                      }}
                    ></div>
                    <b> de </b>
                    <div
                      className="linha"
                      style={{
                        width: '180px',
                        marginTop: '8px',
                        borderBottom: '2px solid black',
                        marginRight: '8px',
                        marginLeft: '8px',
                      }}
                    ></div>
                    <b> de </b>
                    <div
                      className="linha"
                      style={{
                        width: '80px',
                        marginTop: '8px',
                        borderBottom: '2px solid black',
                        marginRight: '8px',
                        marginLeft: '8px',
                      }}
                    ></div>
                  </div>
                  <i>(Data)</i>
                </div>
              </div>
              <div
                className="campo-assinatura"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '20px',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="linha"
                  style={{
                    width: '400px',
                    marginTop: '8px',
                    borderBottom: '1px solid black',
                  }}
                ></div>
                <span>Assinatura do(a) Assistente Social</span>
                <span>CRESS Nº {'     '}</span>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
