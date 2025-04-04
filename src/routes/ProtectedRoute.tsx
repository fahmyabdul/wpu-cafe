import { ReactNode } from "react";
import useAuthStore from "../stores/AuthStore";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode}) => {
    const { accessToken } = useAuthStore();

    const currentRoute = useLocation().pathname;
    if (accessToken === "" && currentRoute !== "/login") {
        return <Navigate to="/login" replace />;
    }

    if (accessToken !== "" && currentRoute === "/login") {
        return <Navigate to="/orders" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;