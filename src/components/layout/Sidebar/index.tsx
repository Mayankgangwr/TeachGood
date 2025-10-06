import Styles from "./Sidebar.module.scss";
import GroupLinks from "../../GroupLinks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/Icons/Logo";
import { useAppSelector } from "../../../hooks/redux.hook";
import { LogOut } from 'lucide-react';
import { sidebarMenuItems, type IMenuItem } from "../../../constants/SidebarItems";
import Logout from "../../Logout/Logout";
import type { Role } from "../../../constants";

const Sidebar = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleAuthModel = () => {
        if (isAuthenticated) {
            setIsOpen((prevState) => !prevState);
        } else {
            navigate("/login");
        }
    }

    return (
        <>
            <nav className={Styles.navbar}>
                <div className={Styles.header}>
                    <div className=" flex justify-between items-center">
                        <Logo />
                    </div>
                </div>

                <div className={Styles.links}>
                    {sidebarMenuItems
                        .filter(
                            (item) => !item.access || item.access.includes(user?.role as Role) // ✅
                        )
                        .map((el: IMenuItem, index) => (
                            <GroupLinks key={index} linkItem={el} />
                        ))}

                </div>

                <div className={Styles.footer}>
                    <GroupLinks
                        onClick={handleAuthModel}
                        linkItem={{
                            label: 'Logout',
                            icon: LogOut,
                        }}
                    />
                </div>
            </nav>
            <Logout isOpen={isOpen} handleClose={() => setIsOpen(() => false)} />

        </>
    );

};
export default Sidebar;