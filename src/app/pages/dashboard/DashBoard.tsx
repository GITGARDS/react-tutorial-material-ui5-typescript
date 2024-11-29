import { BarraDeFerramentas } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const DashBoard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Pagina inicial"
      barraDeFerramentas={
        <BarraDeFerramentas
          mostrarInputBusca={true}
          textoBotaoNovo={"Novo"}
          mostrarBotaoNovo={true}
        />
      }
    >
      Testando
    </LayoutBaseDePagina>
  );
};
