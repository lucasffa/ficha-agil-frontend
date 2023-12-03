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
import { toast } from 'react-toastify';
import axiosInstance from '../../../../components/utils/axios';

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

  async function deleteGrupoFamiliar(
    idFicha: number,
    index: number,
    idGrupoFamiliar?: number | undefined
  ) {
    try {
      await axiosInstance
        .delete('deleteGrupoFamiliar', {
          params: {
            idFicha: idFicha,
            idGrupoFamiliar: idGrupoFamiliar,
          },
        })
        .then(res => {
          toast.success(res.data.message);
          remove(index);
        });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }

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
          parentesco={props.parentesco}
          deleteGrupoFamiliar={deleteGrupoFamiliar}
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
                NomeCompletoFamiliar: '',
                IdParentesco: undefined,
                IdGrupoFamiliar: undefined,
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
    deleteGrupoFamiliar: (
      idFicha: number,
      index: number,
      idGrupoFamiliar: number
    ) => void;
  }
) {
  const { index, control } = props;

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
                label="Número da Ficha"
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
            name={`OutrasFichasGrupoFamiliar.${index}.NomeCompletoFamiliar`}
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
            onClick={() => {
              const idGrupoFamiliar = props.getValues(
                `OutrasFichasGrupoFamiliar.${index}.IdGrupoFamiliar`
              );
              props.deleteGrupoFamiliar(
                props.getValues('IdFicha'),
                index,
                idGrupoFamiliar ?? 0
              );
            }}
          >
            <DeleteIcon color="inherit" />
          </IconButton>
        </Grid>
      </Grid>
      <br />
    </React.Fragment>
  );
}
