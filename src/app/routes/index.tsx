import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, DetalheDeCidades, DetalheDePessoas, ListagemDeCidades, ListagemDePessoas } from "../pages";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setdrawerOptions } = useDrawerContext();

  useEffect(() => {
    setdrawerOptions([
      {
        label: "Pagina Inicial",
        icon: "home",
        path: "/pagina-inicial",
      },
      {
        label: "Pessoas",
        icon: "people",
        path: "/pessoas",
      },
      {
        label: "Cidades",
        icon: "location_city",
        path: "/cidades",
      },
    ]);
  }, [setdrawerOptions]);

  return (
    <Routes>
      <Route path="/pagina-initial" element={<Dashboard />} />
      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas/>} />

      <Route path="/cidades" element={<ListagemDeCidades />} />
      <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades/>} />

      <Route path="*" element={<Navigate to="/pagina-initial" />} />
    </Routes>
  );
};
