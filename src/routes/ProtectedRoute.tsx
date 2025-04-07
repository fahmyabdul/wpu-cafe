import { ReactNode } from "react";
import useAuthStore from "../stores/AuthStore";
import { Navigate, useLocation } from "react-router-dom";
import { isTokenExpired } from "../utils/jwt";

const ProtectedRoute = ({ children }: { children: ReactNode}) => {
    const currentRoute = useLocation().pathname;

    const { accessToken, deleteAccessToken  } = useAuthStore();

    if (isTokenExpired(accessToken)) {
        deleteAccessToken();
        return <Navigate to="/login" replace />;
    }

    if (accessToken === "" && currentRoute !== "/login") {
        return <Navigate to="/login" replace />;
    }

    if (accessToken !== "" && currentRoute === "/login") {
        return <Navigate to="/orders" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;