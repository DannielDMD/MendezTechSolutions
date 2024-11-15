import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "./components/layout";
import LandingPage from "./components/pages/landing";
import ErrorPage from "./components/pages/error";
import About from "./components/pages/about";
import Pricing from "./components/pages/pricing";
import Services from "./components/pages/services";
import CaseStudies from "./components/pages/case-studies";
import Contact from "./components/pages/contact";
import MigracionServidores from "./components/pages/services/migracionServidores";
import OptimizacionInfraestructura from "./components/pages/services/optimizacionInfraestructura";
import AutomatizacionTareas from "./components/pages/services/automatizacionTareas";
import CapacitacionLinux from "./components/pages/services/capacitacionLinux";
import Login from "./components/pages/auth/login";
import Signup from "./components/pages/auth/signup";
import Dashboard from "./components/pages/customer/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import CaseStudyPage from "./components/caseStudy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Outlet />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "login",
            element: (
              <PublicRoute>
                <Login />
              </PublicRoute>
            ),
          },
          {
            path: "signup",
            element: (
              <PublicRoute>
                <Signup />
              </PublicRoute>
            ),
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Outlet />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <Services />,
          },
          {
            path: "migracion-servidores",
            element: <MigracionServidores />,
          },
          {
            path: "optimizacion-infraestructura",
            element: <OptimizacionInfraestructura />,
          },
          {
            path: "automatizacion-tareas",
            element: <AutomatizacionTareas />,
          },
          {
            path: "capacitacion-linux",
            element: <CapacitacionLinux />,
          },
        ],
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/case-studies",
        element: <Outlet />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <CaseStudies />,
          },
          {
            path: ":id",
            element: <CaseStudyPage />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
