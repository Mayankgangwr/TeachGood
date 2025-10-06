import React from "react";

interface NoItemsProps {
  title: string;
}

const NoItems: React.FC<NoItemsProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
      <p className="text-sm sm:text-base">
        No {title.toLowerCase()} available.
      </p>
    </div>
  );
};

export default NoItems;
