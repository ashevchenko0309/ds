import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants.ts";
import PrivateLayout from "../../components/Layouts/PrivateLayout";
import HomePage from "../../pages/HomePage.tsx";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { lazy, Suspense } from "react";
import ModuleLoader from "../../components/Loaders/ModuleLoader.tsx";

const DashboardPage = lazy(() => import("../../pages/DashboardPage"));
const ConnectionsPage = lazy(() => import("../../pages/ConnectionsPage"));

export const buildBrowserRoutes = () =>
  createBrowserRouter([
    {
      path: ROUTES.HOME,
      element: <PrivateLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: ROUTES.DASHBOARD,
          element: (
            <ErrorBoundary>
              <Suspense fallback={<ModuleLoader />}>
                <DashboardPage />
              </Suspense>
            </ErrorBoundary>
          ),
        },
        {
          path: ROUTES.CONNECTIONS,
          element: (
            <ErrorBoundary>
              <Suspense fallback={<ModuleLoader />}>
                <ConnectionsPage />
              </Suspense>
            </ErrorBoundary>
          ),
        },
      ],
    },
  ]);
