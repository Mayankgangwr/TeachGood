import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Toast, { type ToastType } from "./Toast";

interface ToastData {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}

let toastQueue: ToastData[] = [];
let listeners: React.Dispatch<React.SetStateAction<ToastData[]>>[] = [];

const notify = () => {
  listeners.forEach((setToasts) => setToasts([...toastQueue]));
};

export const showToast = (message: string, type: ToastType = "info", duration = 3000) => {
  const id = Date.now() + Math.random();
  toastQueue.push({ id, message, type, duration });
  notify();
  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    notify();
  }, duration);
};

const ToastManager: React.FC = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed top-2 right-1 z-[9999] flex flex-col items-end space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => {
            toastQueue = toastQueue.filter((t) => t.id !== toast.id);
            notify();
          }}
        />
      ))}
    </div>,
    document.getElementById("root")!
  );
};

export default ToastManager;
