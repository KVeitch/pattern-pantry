"use client";

import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { usePatterns } from "@/context/PatternsContext";
import PatternForm from "@/components/PatternForm";
import type { PatternCoverImage } from "@/types/pattern";
import type { CaptureResult } from "@/components/PhotoCapture";

export default function NewPatternPage() {
  const router = useRouter();
  const { addPattern } = usePatterns();

  const handleSubmit = (data: {
    brand?: string;
    patternNumber?: string;
    size?: string;
    era?: string;
    items: string[];
    notes?: string;
    fabrics: { id: string; name: string; amount: string; notes?: string }[];
    coverFront: CaptureResult | null;
    coverBack: CaptureResult | null;
  }) => {
    const coverToImage = (c: CaptureResult | null): PatternCoverImage | undefined =>
      c ? { id: c.id, type: c.type, dataUrl: c.dataUrl, fileName: c.fileName } : undefined;

    addPattern({
      brand: data.brand,
      patternNumber: data.patternNumber,
      size: data.size,
      era: data.era,
      items: data.items ?? [],
      notes: data.notes,
      fabrics: data.fabrics,
      coverFront: coverToImage(data.coverFront),
      coverBack: coverToImage(data.coverBack),
    });
    router.push("/");
  };

  return (
    <>
      <Typography variant="h4" component="h1" fontWeight={600} sx={{ mb: 3 }}>
        Add new pattern
      </Typography>
      <PatternForm onSubmit={handleSubmit} onCancel={() => router.push("/")} />
    </>
  );
}
