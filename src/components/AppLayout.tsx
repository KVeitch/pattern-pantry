"use client";

import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [snackOpen, setSnackOpen] = useState(false);

  const openMenu = (e: React.MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  const handleClearCache = async () => {
    closeMenu();
    if (typeof caches !== "undefined") {
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));
    }
    setSnackOpen(true);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open menu"
            aria-controls="app-menu"
            aria-haspopup="true"
            onClick={openMenu}
            edge="start"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              fontWeight: 700,
            }}
          >
            Pattern Pantry
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Add pattern"
            component={Link}
            href="/patterns/new"
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        id="app-menu"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem component={Link} href="/" onClick={closeMenu}>
          <ListItemIcon>
            <ListAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Patterns</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href="/patterns/new" onClick={closeMenu}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Pattern</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClearCache}>
          <ListItemIcon>
            <DeleteSweepIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Clear app cache</ListItemText>
        </MenuItem>
      </Menu>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message="App cache cleared."
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      <Box
        component="main"
        sx={{
          flex: 1,
          p: 3,
          maxWidth: 1200,
          mx: "auto",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
