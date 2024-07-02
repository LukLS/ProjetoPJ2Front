import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Outlet, useHistory } from 'react-router-dom';

export const PrivateRoute = () => {
    const history = useHistory();
    const { signed } = useContext(AuthContext);
    
    return signed ? <Outlet /> : history.push("/");
};
