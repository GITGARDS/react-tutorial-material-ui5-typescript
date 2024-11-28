import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashBoard } from "../pages";
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
    ]);
  }, [setdrawerOptions]);

  return (
    <Routes>
      <Route path="/pagina-initial" element={<DashBoard />} />
      <Route path="*" element={<Navigate to="/pagina-initial" />} />
    </Routes>
  );
};
