import Styles from "./Sidebar.module.scss";
import GroupLinks from "../../GroupLinks";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/Icons/Logo";
import { useAppSelector } from "../../../hooks/redux.hook";
import { LogOut } from 'lucide-react';
import { UserRoles } from "../../../constants";
import { studentSidebarItems, teacherSidebarItems, type IMenuItem } from "../../../constants/SidebarItems";
import Logout from "../../Logout/Logout";

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
    const [sidebarItems, setSidebarItems] = useState<IMenuItem[]>([]);

    useEffect(() => {
        if (user?.role === UserRoles.Teacher) {
            setSidebarItems(() => teacherSidebarItems);
        } else {
            setSidebarItems(() => studentSidebarItems)
        }
    }, [user?.role])


    return (
        <>
            <nav className={Styles.navbar}>
                <div className={Styles.header}>
                    <div className=" flex justify-between items-center">
                        <Logo />
                    </div>
                </div>

                <div className={Styles.links}>
                    {sidebarItems.map((el: IMenuItem, index) => (
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