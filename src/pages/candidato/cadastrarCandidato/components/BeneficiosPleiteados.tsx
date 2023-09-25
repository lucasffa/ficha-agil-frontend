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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Ficha } from '../CadastrarCandidato';
import { useFieldArray } from 'react-hook-form';

interface BeneficiosPleiteadosProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}

//4. BENEFÍCIOS PLEITEADOS
export default function BeneficiosPleiteados(props: BeneficiosPleiteadosProps) {
  const { control } = props;
  const { fields, append } = useFieldArray({
    control,
    name: 'BeneficiosPleiteados',
  });
  return (
    <React.Fragment>
      <div className="cabecalho-form">4. BENEFÍCIOS PLEITEADOS</div>
      {fields.map((field, index) => (
        <BeneficiosPleiteadosComponent
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
                NomeCursoPretendido: '',
                Horario: '',
                Turno: '',
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

function BeneficiosPleiteadosComponent(
  props: BeneficiosPleiteadosProps & { index: number; field: any }
) {
  const { index, control } = props;

  const { remove } = useFieldArray({
    control,
    name: `BeneficiosPleiteados`,
  });

  const handleRemoveClick = () => {
    remove(index);
  };

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Controller
            control={control}
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
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={control}
            name={`BeneficiosPleiteados.${index}.Turno`}
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Turno</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Turno"
                    {...field}
                  >
                    return (<MenuItem value="M">Manhã</MenuItem>
                    <MenuItem value="T">Tarde</MenuItem>{' '}
                    <MenuItem value="N">Noite</MenuItem>
                    );
                  </Select>
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={control}
            name={`BeneficiosPleiteados.${index}.Horario`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-${index}-3`}
                label="Horário"
                color="primary"
                variant="outlined"
                type="text"
                {...field}
              />
            )}
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
