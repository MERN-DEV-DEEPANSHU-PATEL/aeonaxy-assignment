import { createBrowserRouter } from "react-router-dom";
import Layout, { UnAuthLayout } from "./Layout";

import NotFoundPage from "./pages/404NotFoundPage";
import UserAuthPage from "./pages/UserAuthPage";
import HomePage from "./pages/HomePage";
import ProfileUpdatePage from "./pages/UpdateProfilePage";
import WhyDribble from "./pages/WhyDribble";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <UnAuthLayout />,
    children: [
      {
        path: "/auth/",
        element: <UserAuthPage />,
      },
      {
        path: "/auth/profile",
        element: <ProfileUpdatePage />,
      },
      {
        path: "/auth/x",
        element: <WhyDribble />,
      },
    ],
  },
]);

export default router;
