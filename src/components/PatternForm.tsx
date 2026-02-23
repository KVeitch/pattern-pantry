"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import SvgIcon from "@mui/material/SvgIcon";
import PhotoCapture, { type CaptureResult } from "./PhotoCapture";
import type { FabricRequirement, Pattern } from "@/types/pattern";

function AddIcon() {
  return (
    <SvgIcon fontSize="small">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </SvgIcon>
  );
}
function DeleteOutlineIcon() {
  return (
    <SvgIcon fontSize="small">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </SvgIcon>
  );
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface PatternFormProps {
  initial?: Pattern | null;
  onSubmit: (data: {
    brand?: string;
    patternNumber?: string;
    size?: string;
    era?: string;
    items: string[];
    notes?: string;
    fabrics: FabricRequirement[];
    coverFront: CaptureResult | null;
    coverBack: CaptureResult | null;
  }) => void;
  onCancel?: () => void;
}

export default function PatternForm({
  initial,
  onSubmit,
  onCancel,
}: PatternFormProps) {
  const [brand, setBrand] = useState(initial?.brand ?? "");
  const [patternNumber, setPatternNumber] = useState(
    initial?.patternNumber ?? ""
  );
  const [size, setSize] = useState(initial?.size ?? "");
  const [era, setEra] = useState(initial?.era ?? "");
  const [items, setItems] = useState<string[]>(initial?.items ?? []);
  const [itemInput, setItemInput] = useState("");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [fabrics, setFabrics] = useState<FabricRequirement[]>(
    initial?.fabrics?.length
      ? initial.fabrics.map((f) => ({ ...f }))
      : [{ id: generateId(), name: "", amount: "", notes: "" }]
  );
  const [coverFront, setCoverFront] = useState<CaptureResult | null>(
    initial?.coverFront ?? null
  );
  const [coverBack, setCoverBack] = useState<CaptureResult | null>(
    initial?.coverBack ?? null
  );

  const addFabric = () => {
    setFabrics((prev) => [
      ...prev,
      { id: generateId(), name: "", amount: "", notes: "" },
    ]);
  };

  const updateFabric = (id: string, updates: Partial<FabricRequirement>) => {
    setFabrics((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const removeFabric = (id: string) => {
    setFabrics((prev) => prev.filter((f) => f.id !== id));
  };

  const addItem = () => {
    const trimmed = itemInput.trim();
    if (trimmed && !items.includes(trimmed)) {
      setItems((prev) => [...prev, trimmed]);
      setItemInput("");
    }
  };

  const removeItem = (item: string) => {
    setItems((prev) => prev.filter((i) => i !== item));
  };

  const handleItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addItem();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedFabrics = fabrics.filter((f) => f.name.trim() || f.amount.trim());
    onSubmit({
      brand: brand.trim() || undefined,
      patternNumber: patternNumber.trim() || undefined,
      size: size.trim() || undefined,
      era: era.trim() || undefined,
      items: items.filter(Boolean),
      notes: notes.trim() || undefined,
      fabrics: cleanedFabrics.length
        ? cleanedFabrics
        : [{ id: generateId(), name: "", amount: "", notes: "" }],
      coverFront: coverFront || null,
      coverBack: coverBack || null,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Pattern details
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              sx={{ minWidth: 160 }}
            />
            <TextField
              label="Pattern number"
              value={patternNumber}
              onChange={(e) => setPatternNumber(e.target.value)}
              placeholder="e.g. 1234"
              sx={{ minWidth: 140 }}
            />
            <TextField
              label="Size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="e.g. 8, S, 34&quot;"
              sx={{ minWidth: 120 }}
            />
            <TextField
              label="Era"
              value={era}
              onChange={(e) => setEra(e.target.value)}
              placeholder="e.g. 1940s, Victorian, Modern"
              sx={{ minWidth: 160 }}
              helperText="Searchable"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Items (garment types)
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center", mb: 1 }}>
              {items.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => removeItem(item)}
                  size="small"
                  variant="outlined"
                />
              ))}
              <TextField
                size="small"
                placeholder="Add item (e.g. dress, blouse)"
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
                onKeyDown={handleItemKeyDown}
                onBlur={addItem}
                sx={{ width: 200 }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Press Enter or comma to add. Searchable.
            </Typography>
          </Box>
          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            rows={2}
            fullWidth
          />
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Cover photos
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          <PhotoCapture
            label="Front cover"
            type="front"
            value={coverFront}
            onChange={setCoverFront}
          />
          <PhotoCapture
            label="Back cover"
            type="back"
            value={coverBack}
            onChange={setCoverBack}
          />
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Fabric requirements</Typography>
          <Button
            type="button"
            size="small"
            startIcon={<AddIcon />}
            onClick={addFabric}
          >
            Add fabric
          </Button>
        </Box>
        {fabrics.map((f) => (
          <Box
            key={f.id}
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "flex-start",
              flexWrap: "wrap",
              mb: 2,
            }}
          >
            <TextField
              label="Fabric name"
              value={f.name}
              onChange={(e) => updateFabric(f.id, { name: e.target.value })}
              placeholder="e.g. Cotton broadcloth"
              size="small"
              sx={{ minWidth: 160, flex: 1 }}
            />
            <TextField
              label="Amount"
              value={f.amount}
              onChange={(e) => updateFabric(f.id, { amount: e.target.value })}
              placeholder="e.g. 2 yards"
              size="small"
              sx={{ minWidth: 120 }}
            />
            <TextField
              label="Notes"
              value={f.notes ?? ""}
              onChange={(e) => updateFabric(f.id, { notes: e.target.value })}
              placeholder="Optional"
              size="small"
              sx={{ minWidth: 120, flex: 1 }}
            />
            <IconButton
              size="small"
              onClick={() => removeFabric(f.id)}
              color="error"
              disabled={fabrics.length <= 1}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        ))}
      </Paper>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          {initial ? "Save changes" : "Add pattern"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
}
