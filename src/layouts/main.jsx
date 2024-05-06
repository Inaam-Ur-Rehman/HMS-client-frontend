import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store";

import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default MainLayout;
