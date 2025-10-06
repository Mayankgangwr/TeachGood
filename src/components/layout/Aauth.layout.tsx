import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux.hook";
import Loader from "../Loader";
import type { Role } from "../../constants";

interface IAuthLayoutProps {
    children: React.ReactNode;
    authentication: boolean;
    allowedRoles?: Role[];
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children, authentication, allowedRoles }) => {
    const { auth: { isAuthenticated, initialized, user } } = useAppSelector((state) => ({
        auth: state.auth,
    }));
    const navigate = useNavigate();
    const [loader, setLoader] = useState<boolean>(true);

    useEffect(() => {
        if (!initialized) {
            setLoader(false);
            return
        };
        if (isAuthenticated !== authentication) {
            navigate(authentication ? "/login" : "/");
        }

        if (user?.role && allowedRoles && !allowedRoles.includes(user.role as Role)) {
            navigate("/unauthorized", { replace: true });
            return;
        }
        setLoader(false);
    }, [navigate, authentication, isAuthenticated]);

    return loader ? <Loader /> : <>{children}</>;
}

export default AuthLayout;