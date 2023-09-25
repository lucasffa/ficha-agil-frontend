import React, { useCallback, useEffect, useState } from 'react';
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
import { Ficha } from '../CadastrarCandidato';
import { useFieldArray } from 'react-hook-form';
import axiosInstance from '../../../../components/utils/axios';
import { toast } from 'react-toastify';

interface OutrasFichasGrupoFamiliarProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}
type Parentesco = {
  IDPARENTESCO: number;
  DESCRICAO: string;
};

export default function OutrasFichasGrupoFamiliar(
  props: OutrasFichasGrupoFamiliarProps
) {
  const { control } = props;
  const { fields, append } = useFieldArray({
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
  props: OutrasFichasGrupoFamiliarProps & { index: number; field: any }
) {
  const [parentesco, setParentesco] = useState<Parentesco[]>();
  const { index, control } = props;

  const { remove } = useFieldArray({
    control,
    name: `OutrasFichasGrupoFamiliar`,
  });

  const handleRemoveClick = () => {
    remove(index);
  };

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

  useEffect(() => {
    getParentesco();
  }, [getParentesco]);

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
                    value={
                      props.control._fields[
                        'DadosEducacionaisCandidato.IdEscolaridade'
                      ]
                    }
                  >
                    {parentesco?.map((item, index) => {
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
            onClick={() => handleRemoveClick}
          >
            <DeleteIcon color="inherit" />
          </IconButton>
        </Grid>
      </Grid>
      <br />
    </React.Fragment>
  );
}
