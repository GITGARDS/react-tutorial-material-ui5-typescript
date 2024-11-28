import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { toggleDrawerOpen } = useDrawerContext();


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
