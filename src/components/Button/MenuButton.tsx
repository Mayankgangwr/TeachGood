import type React from "react";
import Styles from "./Button.module.scss";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import type { ActionMenuItem } from "../../types/comman.types";

interface IMenuButtonProps {
  TriggerButton: React.ReactNode;
  menuItems: ActionMenuItem[];
}

const MenuButton: React.FC<IMenuButtonProps> = ({ TriggerButton, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-[30px]" ref={menuRef}>
      <div
        className="cursor-pointer flex justify-center items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {TriggerButton}
      </div>
      {isOpen && (
        <div
          className={clsx(
            Styles.MenuList,
            "absolute right-6 top-[-15px] mt-0 w-auto min-w-[140px] bg-white shadow-lg rounded-xl z-50"
          )}
        >
          {menuItems.map(({ title, icon, onClick }, index) => (
            <span
              key={index}
              onClick={() => {
                onClick();
                setIsOpen(false); // close after selection
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            >
              {icon && <span className="flex-shrink-0">{icon}</span>}
              {title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuButton;
