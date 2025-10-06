import React from "react";

interface IDocBtn {
  fileName: string; // e.g. "document.pdf"
}

const DocBtn: React.FC<IDocBtn> = ({ fileName }) => {
  const format = fileName.split(".").pop()?.toUpperCase() || "FILE";

  return (
    <div className="relative h-10 w-8 flex-shrink-0 group cursor-pointer">
      {/* Main doc body */}
      <div className="h-full w-full bg-blue-500 rounded-sm relative flex justify-center items-center text-white text-[10px] font-bold overflow-hidden">
        {format}

        {/* Folded corner */}
        <div
          className="absolute top-0 right-0 w-3 h-3 bg-blue-200"
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
          }}
        ></div>
      </div>

      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 pointer-events-none">
        {fileName}
      </span>
    </div>
  );
};

export default DocBtn;
