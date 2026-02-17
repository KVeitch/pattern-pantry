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

export interface PatternCoverImage {
  id: string;
  type: "front" | "back";
  dataUrl: string; // base64 or blob URL for now; will be file path/URL when DB exists
  fileName?: string;
}

export interface Pattern {
  id: string;
  name: string;
  brand?: string;
  patternNumber?: string;
  /** Era of the pattern (e.g. "1940s", "Victorian", "Modern") – searchable */
  era?: string;
  /** Garment/item types this pattern makes (e.g. dress, blouse, jacket) – searchable */
  items?: string[];
  notes?: string;
  fabrics: FabricRequirement[];
  coverFront?: PatternCoverImage;
  coverBack?: PatternCoverImage;
  createdAt: string; // ISO date
  updatedAt: string;
}
