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
import { useDrawerContext } from "../../contexts";

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
        </Box>
      </Drawer>
      <Box height={"100vh"} marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
