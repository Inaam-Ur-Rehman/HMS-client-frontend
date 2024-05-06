import api from "@/http/api";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import {
  Banknote,
  Bed,
  Bell,
  CircleUser,
  Home,
  LineChart,
  MailQuestion,
  Menu,
  MessageCircleQuestion,
  Package,
  Package2,
  Search,
  ShoppingCart,
  SquarePlus,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/assets/logo.svg";
import { useAuthStore } from "@/store";
const AdminLayout = () => {
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setLoading(true);
    (async () => {
      await api.get("/users/me").catch((err) => {
        setUser({
          data: null,
          token: null,
        });
        navigate("/login");
      });

      setLoading(false);
    })();
  }, []);

  const menu = [
    {
      name: "Dashboard",
      icon: <Home className="h-6 w-6" />,
      path: "/dashboard",
    },
    {
      name: "Menu",
      icon: <UtensilsCrossed className="h-6 w-6" />,
      path: "/dashboard/menu",
    },
    {
      name: " Requests",
      icon: <MessageCircleQuestion className="h-6 w-6" />,
      path: "/dashboard/requests",
    },
    {
      name: "Complaints",
      icon: <MailQuestion className="h-6 w-6" />,
      path: "/dashboard/complaints",
    },
    {
      name: "Fees",
      icon: <Banknote className="h-6 w-6" />,
      path: "/dashboard/fee",
    },
  ];
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <img src={Logo} alt="Logo" className="h-16 w-36" />
            </Link>
          </div>
          <div className="flex-1">
            {menu?.map(({ name, icon, path }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary
                    ${path === pathname ? "text-primary" : ""}
                  `}
              >
                {icon}
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <img src={Logo} alt="Logo" className="h-16 w-36" />
                  <span className="sr-only">Ali Hostels</span>
                </Link>
                {menu?.map(({ name, icon, path }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    ${path === pathname ? "text-primary" : ""}`}
                  >
                    {icon}
                    {name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  useAuthStore.getState().logout();
                  window.location.replace("/login");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
