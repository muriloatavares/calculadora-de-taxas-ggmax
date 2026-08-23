"use client";

import { useState, useEffect, useCallback } from "react";
import { HistoryItem, CalculationResult } from "@/types/calculator";
import { formatDateTime } from "@/lib/formatters";

const STORAGE_KEY = "ggmax_calc_history_v3";
const MAX_ITEMS = 20;

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // Fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveToHistory = useCallback((result: CalculationResult) => {
    if (result.grossTotal <= 0 && result.netProfit <= 0) return;

    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      formattedDate: formatDateTime(Date.now()),
      planId: result.planId,
      grossTotal: result.grossTotal,
      netProfit: result.netProfit,
      platformFee: result.platformFee,
      totalCost: result.totalCost,
      quantity: result.quantity,
      unitPrice: result.unitPrice,
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev.filter((i) => i.id !== newItem.id)].slice(0, MAX_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignorar
      }
      return updated;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignorar
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignorar
    }
  }, []);

  return { history, isLoaded, saveToHistory, removeItem, clearHistory };
}
