import { createBrowserRouter } from "react-router-dom";
import AuthLayout, { UnAuthLayout } from "./Layout";
import { Suspense, lazy } from "react";
import Spinner from "./components/Spinner";

const NotFoundPage = lazy(() => import("./pages/404NotFoundPage"));
const UserAuthPage = lazy(() => import("./pages/UserAuthPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProfileUpdatePage = lazy(() => import("./pages/UpdateProfilePage"));
const WhyDribble = lazy(() => import("./pages/WhyDribble"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: (
      <Suspense fallback={<Spinner />}>
        <NotFoundPage />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Spinner />}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <UnAuthLayout />,
    children: [
      {
        path: "/auth/",
        element: (
          <Suspense fallback={<Spinner />}>
            <UserAuthPage />
          </Suspense>
        ),
      },
      {
        path: "/auth/profile",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProfileUpdatePage />
          </Suspense>
        ),
      },
      {
        path: "/auth/whydribbble",
        element: (
          <Suspense fallback={<Spinner />}>
            <WhyDribble />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
