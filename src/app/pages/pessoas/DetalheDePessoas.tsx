import { Form } from "@unform/web";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

interface IDetalheDePessoasProps {}

export const DetalheDePessoas: React.FC<IDetalheDePessoasProps> = () => {
  const { id = "nova" } = useParams<"id">();
  const [isLoading, setIsLoading] = useState(false);

  const [nome, setNome] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          console.log(result);
          setNome(result.nomeCompleto);
        }
      });
    } else {
      setIsLoading(true);
    }
  }, [id, isLoading]);

  const handleSave = () => {
    console.log("save");
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
          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEFechar={handleSave}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      {/* {isLoading && <LinearProgress variant="indeterminate" />} */}
      {/* <p>Detalhe de Pessoa {id}</p> */}

      <Form  onSubmit={(dados) => console.log(dados)}
        // placeholder={undefined} children={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}             
        >      
        <VTextField name="nomeCompleto" />
        
        <button type="submit">Submit</button> 

      </Form>

    </LayoutBaseDePagina>
  );
};
