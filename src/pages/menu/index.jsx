import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Menu = () => {
  const { data, error, isLoading, isLoadingError, isError } = useQuery({
    queryKey: ["menu"],
    queryFn: () => api.get("/menu"),
    select: (data) => data.data.data,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isLoadingError) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu</CardTitle>
        <CardDescription>List of available menus</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data?.map((item) => {
          return (
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">
                  {item.day?.toLowerCase()}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 space-y-4 md:space-y-0 md:space-x-4">
                <div className="bg-primary/10 p-4 rounded-md">
                  <p className="capitalize font-bold text-xl">Breakfast</p>
                  <p className="capitalize mt-2">{item.breakfast}</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-md">
                  <p className="capitalize font-bold text-xl">Lunch</p>
                  <p className="capitalize mt-2">{item.lunch}</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-md">
                  <p className="capitalize font-bold text-xl">Dinner</p>
                  <p className="capitalize mt-2">{item.dinner}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Menu;
