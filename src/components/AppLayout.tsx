"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
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
          <Button color="inherit" component={Link} href="/">
            Patterns
          </Button>
          <Button color="inherit" component={Link} href="/patterns/new">
            Add Pattern
          </Button>
        </Toolbar>
      </AppBar>
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
