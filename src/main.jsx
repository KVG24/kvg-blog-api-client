import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import BlogPost from "./components/BlogPost.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [{ path: "blog-post", element: <BlogPost /> }],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
