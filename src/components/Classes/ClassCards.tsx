import { type Variant } from "../Button";
import React from "react";
import type { IClassSessionResponse } from "../../types/response.types";
import clsx from "clsx";
import Styles from "./Classes.module.scss";
import SingleClassCard from "./SingleClassCard";

interface IClassCardsProps {
  classSession: IClassSessionResponse[];
  title: React.ReactNode;
  category: "IsLive" | "Upcoming" | "Completed";
  handleEditClass: (classId: string) => void;
}

// ✅ Map category → button variant
const getVariant = (category: "IsLive" | "Upcoming" | "Completed"): Variant => {
  switch (category) {
    case "Completed":
      return "ghost";
    default:
      return "primary";
  }
};

const ClassCards: React.FC<IClassCardsProps> = ({
  classSession,
  title,
  category,
  handleEditClass,
}) => {
  const variant = getVariant(category);

  return (
    <div className="mt-3">
      <h2 className="text-lg font-semibold mb-3 text-blue-600">{title}</h2>

      <div
        className={clsx(
          Styles.classesBlock,
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        )}
      >
        {classSession.map((cls) => (
          <SingleClassCard
            key={cls._id}
            cls={cls}
            variant={variant}
            category={category}
            handleEditClass={handleEditClass}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassCards;
