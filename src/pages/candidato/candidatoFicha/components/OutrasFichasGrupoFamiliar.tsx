import React from 'react';
import {
  Controller,
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {
  Grid,
  TextField,
  IconButton,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Ficha, Parentesco } from '../CandidatoFicha';
import { useFieldArray } from 'react-hook-form';

interface OutrasFichasGrupoFamiliarProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
  parentesco: Parentesco[] | undefined;
}

export default function OutrasFichasGrupoFamiliar(
  props: OutrasFichasGrupoFamiliarProps
) {
  const { control } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'OutrasFichasGrupoFamiliar',
  });

  return (
    <React.Fragment>
      <div className="cabecalho-form">2. OUTRAS FICHAS DO GRUPO FAMILIAR</div>
      {fields.map((field, index) => (
        <OutrasFichasGrupoFamiliarComponent
          key={field.id}
          index={index}
          control={control}
          field={field}
          getValues={props.getValues}
          setValue={props.setValue}
          watch={props.watch}
          remove={remove}
          parentesco={props.parentesco}
        />
      ))}
      <Grid container spacing={1}>
        <Grid item xs={11}></Grid>
        <Grid item xs={1}>
          <IconButton
            type="button"
            onClick={() =>
              append({
                IdFicha: undefined,
                NomeCompleto: '',
                IdParentesco: undefined,
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

function OutrasFichasGrupoFamiliarComponent(
  props: OutrasFichasGrupoFamiliarProps & {
    index: number;
    field: any;
    remove: any;
  }
) {
  const { index, control, remove } = props;

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Controller
            control={control}
            name={`OutrasFichasGrupoFamiliar.${index}.IdFicha`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-${index}-1`}
                label="Número"
                color="primary"
                variant="outlined"
                type="number"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={7}>
          <Controller
            control={control}
            name={`OutrasFichasGrupoFamiliar.${index}.NomeCompleto`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-${index}-2`}
                label="Nome Completo"
                color="primary"
                variant="outlined"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name={`OutrasFichasGrupoFamiliar.${index}.IdParentesco`}
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
