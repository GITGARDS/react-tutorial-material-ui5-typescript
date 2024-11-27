import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/pagina-initial" element={<Button variant="contained">Teste</Button>} />
      <Route path="*" element={<Navigate to="/pagina-initial" />} />
    </Routes>
  );
};
