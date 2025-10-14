import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import BlogList from "./components/BlogList.jsx";
import BlogPost from "./components/BlogPost.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const router = createBrowserRouter([
    { path: "/", element: <BlogList />, errorElement: <ErrorPage /> },
    { path: "/post/:id", element: <BlogPost />, errorElement: <ErrorPage /> },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
