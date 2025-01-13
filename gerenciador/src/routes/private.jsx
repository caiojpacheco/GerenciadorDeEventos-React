import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../hooks/authLogin/auth";

export const PrivateRoute = () => {
    const { token } = useContext(AuthContext); 

    if (!token) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}