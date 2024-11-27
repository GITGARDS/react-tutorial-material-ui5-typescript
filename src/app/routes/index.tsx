import { Navigate, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/pagina-initial" element={<p>Pagina inicial</p>} />
      <Route path="*" element={<Navigate to="/pagina-initial" />} />
    </Routes>
  );
};
