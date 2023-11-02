import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form';
import {
  Escolaridade,
  EstadoCivil,
  Ficha,
  Parentesco,
  SituacaoTrabalhista,
} from '../CandidatoFicha';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyFieldInput from '../../../../Shared/InputMaskCurrency';

interface ComposicaoFamiliarProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
  parentesco: Parentesco[] | undefined;
  estadoCivil: EstadoCivil[] | undefined;
  situacaoTrabalhista: SituacaoTrabalhista[] | undefined;
  escolaridade: Escolaridade[] | undefined;
}

//8. COMPOSIÇÃO FAMILIAR
export default function ComposicaoFamiliar(props: ComposicaoFamiliarProps) {
  const [totalRendaFamiliar, setTotalRendaFamiliar] = useState(0);
  const { control } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ComposicaoFamiliar',
  });

  const calcularTotalRendaFamiliar = useCallback(() => {
    let total = 0;
    fields.forEach(field => {
      if (field.Renda) {
        total += parseFloat(String(field.Renda));
      }
    });
    setTotalRendaFamiliar(total);
  }, [fields]);

  useEffect(() => {
    calcularTotalRendaFamiliar();
  }, [calcularTotalRendaFamiliar]);

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div className="cabecalho-form">8. COMPOSIÇÃO FAMILIAR</div>
        <div>
          TOTAL DA RENDA FAMILIAR:
          {totalRendaFamiliar.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </div>
      </div>

      {fields.map((field, index) => (
        <ComposicaoFamiliarComponent
          key={field.id}
          index={index}
          control={control}
          field={field}
          getValues={props.getValues}
          setValue={props.setValue}
          watch={props.watch}
          remove={remove}
          parentesco={props.parentesco}
          escolaridade={props.escolaridade}
          estadoCivil={props.estadoCivil}
          situacaoTrabalhista={props.situacaoTrabalhista}
          calcularTotalRendaFamiliar={calcularTotalRendaFamiliar}
        />
      ))}
      <Grid container spacing={1}>
        <Grid item xs={11}></Grid>
        <Grid item xs={1}>
          <IconButton
            type="button"
            onClick={() =>
              append({
                Nome: '',
                IdParentesco: undefined,
                Idade: undefined,
                IdEstadoCivil: undefined,
                IdSitTrabalhista: undefined,
                Profissao: '',
                IdEscolaridade: undefined,
                Renda: undefined,
                IdCompFamiliar: undefined,
                IdFicha: undefined,
              })
            }
            style={{ background: 'none' }}
          >
            <AddIcon color="inherit" />
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function ComposicaoFamiliarComponent(
  props: ComposicaoFamiliarProps & {
    index: number;
    field: any;
    remove: any;
    calcularTotalRendaFamiliar: Function;
  }
) {
  const { index, control, remove, calcularTotalRendaFamiliar } = props;

  useEffect(() => {
    calcularTotalRendaFamiliar();
  }, [calcularTotalRendaFamiliar]);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Controller
            control={control}
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
                  />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={control}
            name={`ComposicaoFamiliar.${index}.IdParentesco`}
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Parentesco
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Parentesco"
                    {...field}
                  >
                    {props?.parentesco?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.IDPARENTESCO}>
                          {item.DESCRICAO}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={control}
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
                  />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={control}
            name={`ComposicaoFamiliar.${index}.IdEstadoCivil`}
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Estado Civil
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Estado Civil"
                    {...field}
                  >
                    {props?.estadoCivil?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.IDESTADOCIVIL}>
                          {item.DESCRICAO}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={control}
            name={`ComposicaoFamiliar.${index}.IdSitTrabalhista`}
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Situação Trabalhista
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Situação Trabalhista"
                    {...field}
                  >
                    {props?.situacaoTrabalhista?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.IDSITTRABALHISTA}>
                          {item.DESCRICAO}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
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
                  />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={control}
            name={`ComposicaoFamiliar.${index}.IdEscolaridade`}
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Escolaridade
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Escolaridade"
                    {...field}
                  >
                    {props?.escolaridade?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.IDESCOLARIDADE}>
                          {item.DESCRICAO}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={control}
            name={`ComposicaoFamiliar.${index}.Renda`}
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <CurrencyFieldInput label="Renda" {...field} />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            type="button"
            style={{ background: 'none', marginTop: '5px' }}
            onClick={() => remove(index)}
          >
            <DeleteIcon color="inherit" />
          </IconButton>
        </Grid>
      </Grid>
      <br />
    </React.Fragment>
  );
}
