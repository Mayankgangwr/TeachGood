import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux.hook";
import Loader from "../Loader";

interface IAuthLayoutProps {
    children: React.ReactNode;
    authentication: boolean;
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children, authentication }) => {
    const { auth: { isAuthenticated, initialized } } = useAppSelector((state) => ({
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
        setLoader(false);
    }, [navigate, authentication, isAuthenticated]);

    return loader ? <Loader /> : <>{children}</>;
}

export default AuthLayout;