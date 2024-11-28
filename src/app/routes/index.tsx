import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppThemeContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  return (
    <Routes>
      <Route
        path="/pagina-initial"
        element={
          <Button
            onClick={toggleTheme}
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
