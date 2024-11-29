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
              src="https://s2-oglobo.glbimg.com/1uC1YFUzLFkEtReFAZW-WTsPT78=/0x0:1280x720/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/X/1/usgxkdQQKUBGIoyzYuQw/batman.jpg"
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
