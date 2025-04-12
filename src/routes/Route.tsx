import { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Auth/Login";
import Orders from "../pages/Orders";
import Page404 from "../pages/Errors/404";
import OrderInvoice from "../pages/Orders/OrderInvoice";

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
        path:"/orders/:id/invoice",
        element: (
            <ProtectedRoute>
                <OrderInvoice/>
            </ProtectedRoute>
        ),
    },
    {
        path: "*",
        element: <Page404/>
    },
];

export default routes;