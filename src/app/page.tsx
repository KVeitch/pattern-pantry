"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import { usePatterns } from "@/context/PatternsContext";
import { patternDisplayTitle } from "@/types/pattern";

export default function HomePage() {
  const { patterns } = usePatterns();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight={600}>
          Your Patterns
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/patterns/new"
        >
          Add Pattern
        </Button>
      </Box>

      {patterns.length === 0 ? (
        <Card
          variant="outlined"
          sx={{
            textAlign: "center",
            py: 6,
            px: 3,
            borderStyle: "dashed",
            borderWidth: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No patterns yet
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Add your first sewing or cosplay pattern to start tracking fabrics and
            cover photos.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/patterns/new"
          >
            Add your first pattern
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {patterns.map((pattern) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pattern.id}>
              <Card
                component={Link}
                href={`/patterns/${pattern.id}`}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "box-shadow 0.2s, transform 0.2s",
                  "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    bgcolor: "grey.200",
                    backgroundImage: pattern.coverFront
                      ? `url(${pattern.coverFront.dataUrl})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {patternDisplayTitle(pattern)}
                  </Typography>
                  {(pattern.era || (pattern.items?.length ?? 0) > 0) && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                      {pattern.era && (
                        <Chip label={pattern.era} size="small" variant="outlined" sx={{ fontSize: "0.75rem" }} />
                      )}
                      {(pattern.items ?? []).slice(0, 3).map((item) => (
                        <Chip key={item} label={item} size="small" variant="outlined" color="primary" sx={{ fontSize: "0.75rem" }} />
                      ))}
                      {(pattern.items?.length ?? 0) > 3 && (
                        <Chip label={`+${(pattern.items?.length ?? 0) - 3}`} size="small" sx={{ fontSize: "0.75rem" }} />
                      )}
                    </Box>
                  )}
                  {pattern.fabrics.length > 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {pattern.fabrics.length} fabric
                      {pattern.fabrics.length !== 1 ? "s" : ""} needed
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} href={`/patterns/${pattern.id}`}>
                    View details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
