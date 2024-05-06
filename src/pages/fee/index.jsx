import BasicTable from "@/components/BasicTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/http/api";
import { useAuthStore } from "@/store";
import { feeColumns } from "@/utils/columns/fee";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Fee() {
  const user = useAuthStore((state) => state.user);
  const { data, error, isLoading, isLoadingError, isError } = useQuery({
    queryKey: ["fee"],
    queryFn: () => api.get(`/fee/user/${user?.data?.id}`),
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
        <CardTitle>Fee</CardTitle>
        <CardDescription>
          {" "}
          List of all fee that have been submitted by you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BasicTable columns={feeColumns} data={data} />
      </CardContent>
    </Card>
  );
}
