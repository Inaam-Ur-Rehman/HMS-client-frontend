import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import MainLayout from "./layouts/main";
import Home from "./pages/home";
import { useEffect } from "react";
import api from "./http/api";
import AdminLayout from "./layouts/admin";
import Login from "./pages/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Fee from "./pages/fee";
import Menu from "./pages/menu";
import Requests from "./pages/requests";
import ViewUserRequest from "./pages/requests/ViewUserRequest";
import Complaints from "./pages/complaints";
import ViewComplaint from "./pages/complaints/view";
import ViewFee from "./pages/fee/view";
import Receipt from "./pages/fee/receipt";
import DashboardHome from "./pages/DashboardHome";
import CreateComplaint from "./pages/complaints/create";
import CreateRequest from "./pages/requests/create";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset/:token",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "fee",
        element: <Fee />,
      },
      {
        path: "fee/view/:id",
        element: <ViewFee />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "requests",
        element: <Requests />,
      },
      {
        path: "requests/view/:id",
        element: <ViewUserRequest />,
      },
      {
        path: "requests/create",
        element: <CreateRequest />,
      },
      {
        path: "complaints",
        element: <Complaints />,
      },
      {
        path: "complaints/view/:id",
        element: <ViewComplaint />,
      },
      {
        path: "complaints/create",
        element: <CreateComplaint />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
