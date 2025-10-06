import clsx from "clsx";
import type React from "react";
import Styles from "./Card.module.scss";
import MenuButton from "../Button/MenuButton";
import { Ellipsis } from "lucide-react";

type ActionMenuItem = {
    title: string;
    onClick: () => void;
};

interface ICardHeaderProps {
    heading?: React.ReactNode;
    description?: React.ReactNode;
    actions: ActionMenuItem[];
    className?: string;
}

const CardHeader: React.FC<ICardHeaderProps> = ({
    heading,
    description,
    actions,
    className = "",
}) => {
    return (
        <div
            className={clsx(
                Styles.Header,
                "flex items-center px-2 py-1.5 justify-between bg-indigo-50 border-b border-indigo-100",
                className
            )}
        >
            {/* Left content flex-grow */}
            <div className="flex flex-col flex-1 min-w-0">
                {heading}
                {description}
            </div>

            {/* Right action block fixed width */}
            <div className="flex justify-end items-center w-[40px] shrink-0">
                <MenuButton
                    TriggerButton={<Ellipsis />}
                    menuItems={actions}
                />
            </div>
        </div>
    );
};

export default CardHeader;
