import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../../contexts";

interface IMenuLateral {
  children: React.ReactNode;
}

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const resolverPath = useResolvedPath(to);
  const match = useMatch({ path: resolverPath.pathname, end: false });

  const handleClick = () => {
    onClick?.();

    navigate(to);
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
  const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box
            width={"100%"}
            height={theme.spacing(20)}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Avatar
              alt="Remy Sharp"
              src="data:image/jpeg;base64,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"
              sx={{ width: theme.spacing(15), height: theme.spacing(15) }}
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                  <Icon>light_mode</Icon>
                </ListItemIcon>
                <ListItemText primary={"Alteranar tema"} />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height={"100vh"} marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
