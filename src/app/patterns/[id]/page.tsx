"use client";

import { useParams, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import { usePatterns } from "@/context/PatternsContext";
import { patternDisplayTitle } from "@/types/pattern";

export default function PatternDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { getPatternById, deletePattern } = usePatterns();
  const pattern = getPatternById(id);

  if (!pattern) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Pattern not found
        </Typography>
        <Button component={Link} href="/" sx={{ mt: 2 }}>
          Back to patterns
        </Button>
      </Box>
    );
  }

  const handleDelete = () => {
    if (typeof window !== "undefined" && window.confirm("Delete this pattern?")) {
      deletePattern(id);
      router.push("/");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" fontWeight={600}>
            {patternDisplayTitle(pattern)}
          </Typography>
          {(pattern.brand || pattern.patternNumber || pattern.size) && (
            <Typography variant="body1" color="text.secondary">
              {[pattern.brand, pattern.patternNumber && `#${pattern.patternNumber}`, pattern.size && `Size ${pattern.size}`].filter(Boolean).join(" • ")}
            </Typography>
          )}
          {(pattern.era || (pattern.items && pattern.items.length > 0)) && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {pattern.era && (
                <Chip label={pattern.era} size="small" variant="outlined" />
              )}
              {pattern.items?.map((item) => (
                <Chip key={item} label={item} size="small" variant="outlined" color="primary" />
              ))}
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            href={`/patterns/${id}/edit`}
          >
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Box>

      {/* Cover images */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <Card sx={{ width: 280, overflow: "hidden" }}>
          <CardMedia
            component="div"
            sx={{
              height: 360,
              bgcolor: "grey.200",
              backgroundImage: pattern.coverFront
                ? `url(${pattern.coverFront.dataUrl})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Front cover
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 280, overflow: "hidden" }}>
          <CardMedia
            component="div"
            sx={{
              height: 360,
              bgcolor: "grey.200",
              backgroundImage: pattern.coverBack
                ? `url(${pattern.coverBack.dataUrl})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Back cover
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Fabrics */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Fabric requirements
        </Typography>
        {pattern.fabrics.length === 0 ? (
          <Typography color="text.secondary">No fabrics added yet.</Typography>
        ) : (
          <List disablePadding>
            {pattern.fabrics.map((f) => (
              <ListItem key={f.id} disablePadding sx={{ py: 0.5 }}>
                <ListItemText
                  primary={f.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.secondary">
                        {f.amount}
                        {f.notes && ` • ${f.notes}`}
                      </Typography>
                    </>
                  }
                />
                <Chip label={f.amount} size="small" variant="outlined" />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Notions */}
      <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Notions
        </Typography>
        {!pattern.notions?.length ? (
          <Typography color="text.secondary">No notions added yet.</Typography>
        ) : (
          <List disablePadding>
            {pattern.notions.map((n) => (
              <ListItem key={n.id} disablePadding sx={{ py: 0.5 }}>
                <ListItemText
                  primary={n.type}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.secondary">
                        {[n.size && `Size ${n.size}`, n.quantity && `Qty ${n.quantity}`].filter(Boolean).join(" • ") || "—"}
                      </Typography>
                      {n.notes && (
                        <Typography component="span" variant="body2" color="text.secondary" display="block" sx={{ mt: 0.25 }}>
                          {n.notes}
                        </Typography>
                      )}
                    </>
                  }
                />
                {n.quantity && <Chip label={n.quantity} size="small" variant="outlined" />}
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {pattern.notes && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Notes
          </Typography>
          <Typography color="text.secondary">{pattern.notes}</Typography>
        </Paper>
      )}
    </Box>
  );
}
