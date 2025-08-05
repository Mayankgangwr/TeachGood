import React, { useEffect, useRef } from "react";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import clsx from "clsx";

export type ToastType = "success" | "error" | "info" | "warning";

const iconMap = {
  success: <CheckCircle className="text-green-600 w-5 h-5" />,
  error: <AlertCircle className="text-red-600 w-5 h-5" />,
  info: <Info className="text-blue-600 w-5 h-5" />,
  warning: <AlertTriangle className="text-yellow-600 w-5 h-5" />,
};

const bgMap = {
  success: "bg-green-50 border-green-500",
  error: "bg-red-50 border-red-500",
  info: "bg-blue-50 border-blue-500",
  warning: "bg-yellow-50 border-yellow-500",
};

const progressBarColorMap = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  warning: "bg-yellow-500",
};

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose, duration = 3000 }) => {
  const progressRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (progressRef.current) {
  //     progressRef.current.style.transition = `width ${duration}ms linear`;
  //     progressRef.current.style.width = "0%";
  //   }
  // }, [duration]);

  useEffect(() => {
    const progress = progressRef.current;
    if (progress) {
      progress.style.transition = `width ${duration}ms linear`;
      progress.style.width = "100%"; // Start full

      // Force reflow
      void progress.offsetWidth;

      // Then trigger shrink
      setTimeout(() => {
        progress.style.width = "0%";
      }, 10);
    }
  }, [duration]);


  return (
    <div
      className={clsx(
        "w-full max-w-sm p-4 mb-3 rounded-lg shadow-lg border-l-4 flex flex-col gap-2 bg-white relative overflow-hidden",
        bgMap[type]
      )}
    >
      <div className="flex items-start gap-3">
        {iconMap[type]}
        <div className="flex-1 text-sm text-gray-800">{message}</div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="h-1 w-full bg-gray-200 rounded overflow-hidden mt-2">
        <div
          ref={progressRef}
          className={clsx("h-full", progressBarColorMap[type])}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Toast;
