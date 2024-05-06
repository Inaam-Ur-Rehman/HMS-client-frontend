import api from "@/http/api";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BasicTable from "@/components/BasicTable";
import { userRequestColumns } from "@/utils/columns/userRequests";
import { Button } from "@chakra-ui/react";
import { PlusIcon, TrashIcon } from "lucide-react";
import { complaintsColumns } from "@/utils/columns/complaints";
import { Link } from "react-router-dom";

const Complaints = () => {
  const user = useAuthStore((state) => state.user);
  const { data, error, isLoading, isLoadingError, isError } = useQuery({
    queryKey: ["complaints"],
    queryFn: () => api.get(`/complaints/user/${user?.data?.id}`),
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
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>View Complaints</CardTitle>
            <CardDescription className="mt-2">
              List of all complaints that have been raised by you.
            </CardDescription>
          </div>
          <Link to="/dashboard/complaints/create">
            <Button variant="outline">
              <PlusIcon className="mr-2 w-5 h-5" />
              Create Complaint
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent>
        <BasicTable columns={complaintsColumns} data={data} />
      </CardContent>
    </Card>
  );
};

export default Complaints;
