import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Outlet, useNavigate } from 'react-router-dom';

export const PrivateRoute = () => {
    const navigate = useNavigate();
    const { signed } = useContext(AuthContext);

    useEffect(() => {
        if (!signed) {
            navigate("/");
        }
    }, [signed, navigate]);

    return signed ? <Outlet /> : null;
};
