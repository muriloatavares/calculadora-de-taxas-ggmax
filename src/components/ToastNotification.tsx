"use client";

import React from "react";
import { Check, AlertTriangle, X, Info } from "lucide-react";
import { ToastMessage } from "@/hooks/useToast";

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastNotification: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className={`toast show ${
              toast.type === "success"
                ? "toast-success"
                : toast.type === "warning"
                ? "toast-warning"
                : toast.type === "error"
                ? "toast-error"
                : "toast-success"
            }`}
          >
            <div className="toast-icon">
              {toast.type === "success" && <Check className="w-3.5 h-3.5" />}
              {toast.type === "warning" && <AlertTriangle className="w-3.5 h-3.5" />}
              {toast.type === "error" && <X className="w-3.5 h-3.5" />}
              {toast.type === "info" && <Info className="w-3.5 h-3.5" />}
            </div>

            <span className="flex-1">{toast.message}</span>

            <button
              type="button"
              onClick={() => onRemove(toast.id)}
              className="text-(--text-muted) hover:text-(--text-main) cursor-pointer p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
