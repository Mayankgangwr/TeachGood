import React from "react";
import { User } from "lucide-react";
import clsx from "clsx";

interface PersonaProps {
  name?: string;
  role?: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "busy" | "away";
  className?: string;
  toolTipText?: React.ReactNode;
}

const sizeMap = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
};

const Persona: React.FC<PersonaProps> = ({
  name,
  role,
  avatarUrl,
  size = "md",
  status,
  className,
  toolTipText,
}) => {
  return (
    <div className={clsx("flex items-center gap-0", className)}>
      <div className="relative group">
        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className={clsx("rounded-full object-cover border-1 border-gray-50", sizeMap[size])}
          />
        ) : (
          <div
            className={clsx(
              "rounded-full bg-gray-200 flex items-center justify-center text-gray-600 border-2 border-gray-50",
              sizeMap[size]
            )}
          >
            <User className="w-4 h-4" />
          </div>
        )}

        {/* Status dot */}
        {status && (
          <span
            className={clsx(
              "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
              {
                "w-2.5 h-2.5 bg-green-500": status === "online",
                "w-2.5 h-2.5 bg-gray-400": status === "offline",
                "w-2.5 h-2.5 bg-red-500": status === "busy",
                "w-2.5 h-2.5 bg-yellow-500": status === "away",
              }
            )}
          />
        )}

        {/* Tooltip */}
        {toolTipText && (
          <div className="absolute right-auto left-[55px] -translate-x-1/2 -top-8 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
            {toolTipText}
          </div>
        )}
      </div>

      <div>
        {name && <p className="font-medium leading-tight">{name}</p>}
        {role && <p className="text-sm text-gray-500">{role}</p>}
      </div>
    </div>
  );
};

export default Persona;
