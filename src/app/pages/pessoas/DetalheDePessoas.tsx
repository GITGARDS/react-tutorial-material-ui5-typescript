import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

interface IDetalheDePessoasProps {}

export const DetalheDePessoas: React.FC<IDetalheDePessoasProps> = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log("save");
  };
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Novo Registro" : "Editar de Pessoas"}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoApagar={id !== "nova"}
          aoClicarEmSalvar={handleSave}
          aoClicarEmSalvarEFechar={handleSave}
          aoClicarEmApagar={handleDelete}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        />
      }
    >
      Detalhe de Pessoa {id}
    </LayoutBaseDePagina>
  );
};
