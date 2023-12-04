import React from "react";
import {
  Controller,
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
  UseFieldArrayRemove,
} from "react-hook-form";
import {
  Grid,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Ficha } from "../CandidatoFicha";
import { useFieldArray } from "react-hook-form";
import {
  InputComMascara,
  MascaraInput,
} from "../../../../Shared/InputPadraoForm";
import axiosInstance from "../../../../components/utils/axios";
import { toast } from "react-toastify";

interface BeneficiosPleiteadosProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}

//4. BENEFÍCIOS PLEITEADOS
export default function BeneficiosPleiteados(props: BeneficiosPleiteadosProps) {
  const { control } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "BeneficiosPleiteados",
  });
  async function deleteBeneficio(
    idFicha: number,
    index: number,
    idBeneficio?: number | undefined
  ) {
    try {
      await axiosInstance
        .delete("deleteBeneficio", {
          params: {
            idFicha: idFicha,
            idBeneficio: idBeneficio,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          remove(index);
        });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map((key) => {
        return toast.error(error[key]);
      });
    }
  }
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
          deleteBeneficio={deleteBeneficio}
          remove={remove}
        />
      ))}
      <Grid container spacing={1}>
        <Grid item xs={11}></Grid>
        <Grid item xs={1}>
          <IconButton
            type="button"
            onClick={() =>
              append({
                NomeCursoPretendido: "",
                Horario: "",
                Turno: "",
              })
            }
            style={{ background: "none" }}
          >
            <AddIcon color="inherit" />
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function BeneficiosPleiteadosComponent(
  props: BeneficiosPleiteadosProps & {
    index: number;
    field: any;
    remove: UseFieldArrayRemove;
    deleteBeneficio: (
      idFicha: number,
      index: number,
      idBeneficio: number
    ) => void;
  }
) {
  const { index, control, remove } = props;

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
                    <MenuItem value="T">Tarde</MenuItem>{" "}
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
              <InputComMascara
                name="Horário"
                mask={MascaraInput.horario}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            type="button"
            style={{ background: "none", marginTop: "5px" }}
            onClick={() => {
              const idBeneficio = props.getValues(
                `BeneficiosPleiteados.${index}.IdBeneficio`
              );

              idBeneficio === undefined
                ? props.remove(index)
                : props.deleteBeneficio(
                    props.getValues("IdFicha"),
                    index,
                    idBeneficio ?? 0
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
