"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Pattern } from "@/types/pattern";

interface PatternsContextValue {
  patterns: Pattern[];
  addPattern: (pattern: Omit<Pattern, "id" | "createdAt" | "updatedAt">) => Pattern;
  updatePattern: (id: string, updates: Partial<Pattern>) => void;
  deletePattern: (id: string) => void;
  getPatternById: (id: string) => Pattern | undefined;
}

const PatternsContext = createContext<PatternsContextValue | null>(null);

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function PatternsProvider({ children }: { children: React.ReactNode }) {
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  const addPattern = useCallback(
    (input: Omit<Pattern, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const newPattern: Pattern = {
        ...input,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      setPatterns((prev) => [newPattern, ...prev]);
      return newPattern;
    },
    []
  );

  const updatePattern = useCallback((id: string, updates: Partial<Pattern>) => {
    setPatterns((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, ...updates, updatedAt: new Date().toISOString() }
          : p
      )
    );
  }, []);

  const deletePattern = useCallback((id: string) => {
    setPatterns((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getPatternById = useCallback(
    (id: string) => patterns.find((p) => p.id === id),
    [patterns]
  );

  const value = useMemo<PatternsContextValue>(
    () => ({
      patterns,
      addPattern,
      updatePattern,
      deletePattern,
      getPatternById,
    }),
    [patterns, addPattern, updatePattern, deletePattern, getPatternById]
  );

  return (
    <PatternsContext.Provider value={value}>{children}</PatternsContext.Provider>
  );
}

export function usePatterns() {
  const ctx = useContext(PatternsContext);
  if (!ctx) throw new Error("usePatterns must be used within PatternsProvider");
  return ctx;
}
