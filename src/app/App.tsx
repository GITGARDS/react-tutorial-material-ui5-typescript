import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { Login, MenuLateral } from "./shared/components";
import { AppDrawerProvider, AuthProvider } from "./shared/contexts";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import "./shared/forms/TraducoesYup";
export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <AppDrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </AppDrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
