import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const DashboardHome = () => {
  const { data, error, isLoading, isError, isLoadingError } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.get(`/users/self`),
    select: (data) => data.data.data,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isLoadingError) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Information about your account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
        <Label className="space-y-1">
          <span>USER ID</span>
          <Input value={data?.id} disabled />
        </Label>
        <Label className="space-y-1">
          <span>Name</span>
          <Input value={data?.name} disabled />
        </Label>
        <Label className="space-y-1">
          <span>Father Name</span>
          <Input value={data?.profile?.fatherName} disabled />
        </Label>
        <Label className="space-y-1">
          <span>Email</span>
          <Input value={data?.email} disabled />
        </Label>
        <Label className="space-y-1">
          <span>Phone</span>
          <Input value={data?.profile?.phone} disabled />
        </Label>
        <Label className="space-y-1">
          <span>Emergency Phone</span>
          <Input value={data?.profile?.emergencyContact} disabled />
        </Label>
        <Label className="space-y-1">
          <span>Blood Group</span>
          <Input value={data?.profile?.bloodGroup} disabled />
        </Label>
        <Label className="space-y-1">
          <span>Address</span>
          <Input value={data?.profile?.address} disabled />
        </Label>
        <Label className="space-y-1">
          <span>CNIC Number</span>
          <Input value={data?.profile?.cnic} disabled />
        </Label>
        <Label className="space-y-1">
          <span>Image</span>
          <img src={data?.profile?.image} className="w-44 rounded-full" />
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Label className="space-y-1">
            <span>CNIC Front</span>
            <img
              src={data?.profile?.cnicFront}
              className="w-54 rounded-md object-cover"
            />
          </Label>
          <Label className="space-y-1">
            <span>CNIC Back</span>
            <img
              src={data?.profile?.cnicBack}
              className="w-54 rounded-md object-cover"
            />
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHome;
