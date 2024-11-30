import { LinearProgress } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { Environment } from "../../shared/environment";
import { VTextField } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

interface IDetalheDePessoasProps {}

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC<IDetalheDePessoasProps> = () => {
  const { id = "nova" } = useParams<"id">();
  const [isLoading, setIsLoading] = useState(false);

  const [nome, setNome] = useState("");

  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          formRef.current?.setData(result)          
        }
      });
    } else {
      setIsLoading(true);
    }
  }, [id, isLoading]);

  const handleSave = (dados: IFormData) => {
    if (id === "nova") {
      setIsLoading(true);
      PessoasService.create(dados).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/pessoas/detalhe/${result}`);          
          alert(Environment.ADCIONADO_COM_SUCESSO);
        }
      });
    } else {
      setIsLoading(true);
      PessoasService.updateById(Number(id), { id: Number(id), ...dados }).then(
        (result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert(Environment.ALTERADO_COM_SUCESSO);
          }
        }
      );
    }
  };

  const handleDelete = useCallback(
    (id: number) => {
      if (window.confirm("Deseja realmente excluir?")) {
        PessoasService.deleteById(id).then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            // alert(Environment.EXCLUIDO_COM_SUCESSO);
            navigate("/pessoas");
          }
          alert("Registro apagado com sucesso!");
        });
      }
    },
    [navigate]
  );

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova Pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}

      <Form
        ref={formRef}
        onSubmit={handleSave}
        // placeholder={undefined} children={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
      >
        <VTextField
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
        />

        <VTextField
          name="nomeCompleto"
          label="Nome Completo"
          placeholder="Nome Completo"
          type="text"
        />
        <VTextField
          name="cidadeId"
          label="Id Cidade"
          placeholder="Cidade id"
          type="number"
        />

        <button type="submit">Submit</button>
      </Form>
    </LayoutBaseDePagina>
  );
};
