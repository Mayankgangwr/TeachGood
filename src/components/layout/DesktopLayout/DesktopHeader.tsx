import { useEffect, useState } from "react";
import UserLoggedStatus from "./UserLoggedStatus";
import { useLocation } from "react-router-dom";
import getHeaderTitle from "../../../utils/getHeaderTitle";

const DesktopHeader = () => {
    const location = useLocation();
    const [hasShadow, setHasShadow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasShadow(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`${hasShadow && `shadow-md shadow-gray-200`} flex items-center justify-between flex-wrap px-1 py-[10px] fixed md:w-[75%] lg:w-[82%] xl:w-[87%] z-10  pl-4 bg-[#eff3f4]`}>
            <div className=" flex items-start justify-center">
                <span className="!text-4xl !font-semibold">{getHeaderTitle(location.pathname)}</span>
            </div>
            <UserLoggedStatus />
        </div>
    );
};

export default DesktopHeader;
