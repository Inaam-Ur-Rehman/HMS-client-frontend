import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/http/api";
import { toast } from "react-toastify";
import { queryClient } from "@/main";
import { PencilIcon } from "lucide-react";
import userRequestValidationSchema, {
  updateUserRequestValidationSchema,
} from "@/validations/userRequest.validation.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store";

const CreateRequest = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const ref = React.useRef();
  const mutation = useMutation({
    mutationFn: (data) => api.post(`/user-requests`, data),
    onSuccess: () => {
      toast.success("Request created successfully");
      form.reset();
      ref.current?.click();
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      navigate("/dashboard/requests", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  const form = useForm({
    resolver: zodResolver(updateUserRequestValidationSchema),
    defaultValues: {
      type: "",
      message: "",
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Request</CardTitle>
        <CardDescription>Create a new request</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "ROOM_CLEANING",
                        "ROOM_MAINTENANCE",
                        "ROOM_CHANGE",
                        "OTHER",
                      ].map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Select the status of the user request.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <Input {...field} placeholder="Message" />
                  <FormDescription>
                    Enter the message of the user request.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2">
              <PencilIcon className="w-4 h-4 mr-2" />
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateRequest;
