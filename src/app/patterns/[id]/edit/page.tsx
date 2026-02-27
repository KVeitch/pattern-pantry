"use client";

import { useParams, useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { usePatterns } from "@/context/PatternsContext";
import PatternForm from "@/components/PatternForm";
import type { PatternCoverImage } from "@/types/pattern";
import type { CaptureResult } from "@/components/PhotoCapture";

export default function EditPatternPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { getPatternById, updatePattern } = usePatterns();
  const pattern = getPatternById(id);

  const handleSubmit = (data: {
    brand?: string;
    patternNumber?: string;
    size?: string;
    era?: string;
    items: string[];
    notes?: string;
    fabrics: { id: string; name: string; amount: string; notes?: string }[];
    notions: { id: string; type: string; size?: string; quantity: string }[];
    coverFront: CaptureResult | null;
    coverBack: CaptureResult | null;
  }) => {
    const coverToImage = (c: CaptureResult | null): PatternCoverImage | undefined =>
      c ? { id: c.id, type: c.type, dataUrl: c.dataUrl, fileName: c.fileName } : undefined;

    updatePattern(id, {
      brand: data.brand,
      patternNumber: data.patternNumber,
      size: data.size,
      era: data.era,
      items: data.items ?? [],
      notes: data.notes,
      fabrics: data.fabrics,
      notions: data.notions ?? [],
      coverFront: coverToImage(data.coverFront),
      coverBack: coverToImage(data.coverBack),
    });
    router.push(`/patterns/${id}`);
  };

  if (!pattern) {
    return (
      <Typography color="text.secondary">Pattern not found.</Typography>
    );
  }

  return (
    <>
      <Typography variant="h4" component="h1" fontWeight={600} sx={{ mb: 3 }}>
        Edit pattern
      </Typography>
      <PatternForm
        initial={pattern}
        onSubmit={handleSubmit}
        onCancel={() => router.push(`/patterns/${id}`)}
      />
    </>
  );
}
