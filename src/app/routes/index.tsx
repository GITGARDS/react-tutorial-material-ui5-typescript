import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashBoard, ListagemDePessoas } from "../pages";
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
    ]);
  }, [setdrawerOptions]);

  return (
    <Routes>
      <Route path="/pagina-initial" element={<DashBoard />} />
      <Route path="/pessoas" element={<ListagemDePessoas />} />
      {/* <Route path="/pessoas/detalhe/:id" element={<DashBoard />} /> */}
      <Route path="*" element={<Navigate to="/pagina-initial" />} />
    </Routes>
  );
};
