import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import api from "@/http/api";
import { CardFooter } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Receipt from "./receipt";

const ViewFee = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { data, isLoading, isLoadingError, isError, error } = useQuery({
    queryKey: ["fee"],
    queryFn: () => api.get(`/fee/${id}`),
    select: (data) => data.data.data,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isLoadingError) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return navigate("/dashboard/fee");
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>View Fee</CardTitle>
          <CardDescription>Details of the fee.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Room Number
                </label>
                <div className="mt-2">
                  <Input
                    type="text"
                    value={data?.user?.room?.roomNumber}
                    readOnly
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  User Name
                </label>
                <div className="mt-2">
                  <Input type="text" value={data?.user?.name} readOnly />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Month
                </label>
                <div className="mt-2">
                  <Input type="text" value={data?.month} readOnly />
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Amount
                </label>
                <div className="mt-2">
                  <Input type="text" value={data?.amount} readOnly />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Note
                </label>
                <div className="mt-2">
                  <Input type="text" value={data?.note} readOnly />
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Submission Date
                </label>
                <div className="mt-2">
                  <Input
                    type="text"
                    value={new Date(data?.createdAt).toLocaleString()}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Receipt data={data} />
    </>
  );
};

export default ViewFee;
