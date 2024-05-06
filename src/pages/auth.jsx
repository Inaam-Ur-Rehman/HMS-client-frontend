import api from "@/http/api";
import { useAuthStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [loading, setLoading] = React.useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  useEffect(() => {
    setLoading(true);
    (async () => {
      await api
        .get("/users/me")
        .then(() => {
          window.location.href = "/dashboard";
        })
        .catch(() => {
          setUser({
            data: null,
            token: null,
          });
        });
    })();

    setLoading(false);
  }, []);

  const mutation = useMutation({
    mutationFn: (data) => api.post("/auth/login", data),
    onSuccess: (data) => {
      if (data.data.data.user.role !== "USER") {
        toast.error("Only User can login");
        return;
      }
      setUser(data.data.data);
      toast.success("Login Successful");
      window.location.href = "/dashboard";
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    mutation.mutate({ email, password });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required name="password" />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
