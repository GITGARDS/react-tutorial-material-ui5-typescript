import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const DashBoard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Pagina inicial"
      barraDeFerramentas={
        <FerramentasDeDetalhe
        mostrarBotaoSalvarEFechar
        />
      }
    >
      Testando
    </LayoutBaseDePagina>
  );
};
