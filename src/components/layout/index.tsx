import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../authProvider";
import MobileHeader from "./MobileLayout/MobileHeader";
import DesktopHeader from "./DesktopLayout/DesktopHeader";
import Sidebar from "./Sidebar";
import MobileMenuNavbar from "./MobileLayout/MobileMenuNavbar";

const Layout: React.FC = () => {
    return (
        <AuthProvider>
            {/* Mobile Layout */}
            <div className="lg:hidden">
                <MobileHeader />
                <Outlet />
                <MobileMenuNavbar/>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex w-full h-full">
                {/* Sidebar */}
                <div className="md:w-[25%] lg:w-[18%] xl:w-[13%] shadow-sm fixed h-screen">
                    <Sidebar />
                </div>

                {/* Main content */}
                <div className="md:ml-[25%] lg:ml-[18%] xl:ml-[13%] md:w-[75%] lg:w-[82%] xl:w-[87%] h-full">
                    <DesktopHeader />
                    <div className="mt-[60px]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
};

export default Layout;
