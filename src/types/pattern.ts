/**
 * Types for sewing patterns, fabrics, and cover images.
 * Used by frontend; will align with database schema later.
 */

export interface FabricRequirement {
  id: string;
  name: string;
  amount: string; // e.g. "2 yards", "1.5 m"
  notes?: string;
}

export interface Notion {
  id: string;
  type: string; // e.g. button, zipper, snap
  size?: string;
  quantity: string; // e.g. "2", "1 set", "3"
  notes?: string;
}

export interface PatternCoverImage {
  id: string;
  type: "front" | "back";
  dataUrl: string; // base64 or blob URL for now; will be file path/URL when DB exists
  fileName?: string;
}

export interface Pattern {
  id: string;
  brand?: string;
  patternNumber?: string;
  /** Size (e.g. "8", "S", "34\" bust") */
  size?: string;
  /** Era of the pattern (e.g. "1940s", "Victorian", "Modern") – searchable */
  era?: string;
  /** Garment/item types this pattern makes (e.g. dress, blouse, jacket) – searchable */
  items?: string[];
  notes?: string;
  fabrics: FabricRequirement[];
  notions?: Notion[];
  coverFront?: PatternCoverImage;
  coverBack?: PatternCoverImage;
  createdAt: string; // ISO date
  updatedAt: string;
}

/** Short display title for lists/cards (brand, #number, size) */
export function patternDisplayTitle(p: Pattern): string {
  const parts = [
    p.brand,
    p.patternNumber ? `#${p.patternNumber}` : null,
    p.size ? `Size ${p.size}` : null,
  ].filter(Boolean);
  return parts.length ? parts.join(" ") : "Pattern";
}
