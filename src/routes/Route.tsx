import { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Auth/Login";
import Orders from "../pages/Orders";
import Page404 from "../pages/Errors/404";
// import Menu from "../pages/Menu";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/about",
        element: <About/>
    },
    {
        path: "/login",
        element: (
            <ProtectedRoute>
                <Login/>
            </ProtectedRoute>
        ),
    },
    {
        path: "/orders",
        element: (
            <ProtectedRoute>
                <Orders/>
            </ProtectedRoute>
        ),
    },
    {
        path: "*",
        element: <Page404/>
    },
];

export default routes;