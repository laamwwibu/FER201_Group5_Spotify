import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomeAdmin from "../components/Home/HomeAdmin";
import App from "../App";
import Header from "../components/Header";
import AlbumDetail from "../components/Albums/AlbumDetail";
import HomePage from "../components/Home/HomePage";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/album/:albumId",
        element: <AlbumDetail/>,

    },
    {
        path: "/homeadmin",
        element: <HomeAdmin/>,

    }
]);
export default routes;    