import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  studentSidebarItems,
  teacherSidebarItems,
  type IMenuItem,
} from "../../../constants/SidebarItems";
import { useAppSelector } from "../../../hooks/redux.hook";
import { UserRoles } from "../../../constants";

const MobileMenuNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [sidebarItems, setSidebarItems] = useState<IMenuItem[]>([]);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === UserRoles.Teacher) {
      setSidebarItems(() => teacherSidebarItems);
    } else {
      setSidebarItems(() => studentSidebarItems);
    }
  }, [user?.role]);

  const handleMainClick = (item: IMenuItem, index: number) => {
    if (item.links && item.links.length > 0) {
      setActiveIndex((prev) => (prev === index ? null : index));
    } else {
      navigate(item.path);
      setActiveIndex(null);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-md sm:hidden">
      <div className="relative">
        <ul className="flex justify-between items-center px-4 py-2">
          {sidebarItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon: any = item.icon;
            const hasChildren = item.links && item.links.length > 0;

            return (
              <li key={index} className="relative flex-1 text-center">
                {/* Main Nav Item */}
                <div
                  onClick={() => handleMainClick(item, index)}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Icon
                    size={22}
                    className={clsx("mb-1", {
                      "text-blue-600": isActive || activeIndex === index,
                      "text-gray-500": !isActive && activeIndex !== index,
                    })}
                  />
                  <span
                    className={clsx("text-[11px]", {
                      "text-blue-600": isActive || activeIndex === index,
                      "text-gray-500": !isActive && activeIndex !== index,
                    })}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Radial Burst Menu */}
                {activeIndex === index && hasChildren && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50">
                    <div className="relative w-40 h-40">
                      {item.links!.map((link, subIndex) => {
                        const total = item.links!.length;
                        const angle = (360 / total) * subIndex;
                        const radians = (angle * Math.PI) / 180;
                        const radius = 30;

                        const x = radius * Math.cos(radians);
                        const y = radius * Math.sin(radians);
                        const SubIcon: any = link.icon;

                        return (
                          <button
                            key={subIndex}
                            onClick={() => {
                              navigate(link.link);
                              setActiveIndex(null);
                            }}
                            className="absolute w-10 h-10 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center shadow-md transform transition-all duration-300 ease-out opacity-90 hover:opacity-100"
                            style={{
                              left: `calc(50% + ${x}px - 20px)`,
                              top: `calc(50% - ${y}px - 20px)`,
                            }}
                            title={link.label}
                          >
                            <SubIcon size={18} className="text-white" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenuNavbar;
