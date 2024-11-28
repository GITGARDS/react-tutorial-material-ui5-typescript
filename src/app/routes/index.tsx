import { Button } from "@mui/material";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { toggleDrawerOpen, setdrawerOptions } = useDrawerContext();

  useEffect(() => {
    setdrawerOptions([
      {
        label: "Pagina Inicial",
        icon: "home",
        path: "/pagina-inicial",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route
        path="/pagina-initial"
        element={
          <Button
            onClick={toggleDrawerOpen}
            variant="contained"
            color="primary"
          >
            Toggle theme
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/pagina-initial" />} />
    </Routes>
  );
};
