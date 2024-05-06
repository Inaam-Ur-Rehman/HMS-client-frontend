import { queryClient } from "@/main";
import UpdateUserRequest from "@/components/UpdateRequest";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/http/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewUserRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error, isLoadingError, isError } = useQuery({
    queryKey: [`user-request-${id}`],
    queryFn: () => api.get(`/user-requests/${id}`),
    select: (data) => data.data.data,
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/user-requests/${id}`),
    onSuccess: () => {
      toast.success("Request deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      navigate("/dashboard/requests", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoadingError || isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data) return navigate("/dashboard/requests", { replace: true });

  return (
    <Card>
      <CardHeader>
        <CardTitle>View Request</CardTitle>
        <CardDescription>
          You can see the content of the request.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <h2 className="text-lg border  p-2 rounded-md">{data?.user?.name}</h2>
        <p className="text-lg border  p-2 rounded-md">{data?.user?.email}</p>
        <p className="text-lg border  p-2 rounded-md py-4">{data?.message}</p>
        <p className="text-lg border  p-2 rounded-md">{data?.status}</p>
        <p className="text-lg border  p-2 rounded-md">
          {new Date(data?.createdAt)
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/, "")}
        </p>
        <p className="text-lg border  p-2 rounded-md">{data?.type}</p>
        <p className="text-lg border  p-2 rounded-md">
          Room No. {data?.user?.room?.roomNumber}
        </p>
        <p className="text-lg border  p-2 rounded-md">
          Floor No. {data?.user?.room?.floor}
        </p>
      </CardContent>
      <CardFooter className="space-x-2">
        <UpdateUserRequest userRequest={data} />
        <Button
          onClick={() => {
            const confirmation = window.confirm(
              "Are you sure you want to delete this request?"
            );
            if (confirmation) deleteMutation.mutate();
          }}
        >
          <TrashIcon className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ViewUserRequest;
