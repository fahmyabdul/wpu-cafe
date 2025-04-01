import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
// import Login from "../pages/Login";
// import Menu from "../pages/Menu";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/about",
        element: <About/>
    }
    // {
    //     path: "/login",
    //     element: <Login/>, // apa yang mau dirender
    // },
    // {
    //     path: "/menu/:id", // dynamic routes
    //     element: <Menu/>,
    // },
];

export default routes;