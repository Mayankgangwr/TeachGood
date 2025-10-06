import React from "react";

interface IToolTipProps {
  children: React.ReactNode;
}

const Tooltip: React.FC<IToolTipProps> = ({ children }) => {
  return (
    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 pointer-events-none">
      {children}
    </span>
  );
};

export default Tooltip;
