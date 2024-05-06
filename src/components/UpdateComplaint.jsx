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

import { Button } from "./ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/http/api";
import { toast } from "react-toastify";
import { queryClient } from "@/main";
import { PencilIcon } from "lucide-react";
import complaintValidationSchema from "@/validations/complaint.validation.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useNavigate } from "react-router-dom";

const UpdateComplaint = ({ complaint }) => {
  const navigate = useNavigate();
  const ref = React.useRef();
  if (!complaint) return null;
  const mutation = useMutation({
    mutationKey: [`complaint-${complaint?.id}`],
    mutationFn: (data) => api.put(`/complaints/${complaint?.id}`, data),
    onSuccess: () => {
      toast.success("Complaint updated successfully");
      form.reset();
      ref.current?.click();
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      navigate("/dashboard/complaints", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  const form = useForm({
    resolver: zodResolver(complaintValidationSchema),
    defaultValues: {
      status: "",
      message: "",
    },
    values: {
      status: complaint?.status,
      message: complaint?.message,
    },
  });

  return (
    <Dialog>
      <DialogTrigger ref={ref}>
        <Button variant="outline">
          <PencilIcon className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Complaint</DialogTitle>
          <DialogDescription>
            This action will update the complaint
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["PENDING", "RESOLVED"].map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Select the status of the complaint.
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
                  <Input
                    {...field}
                    placeholder="Message"
                    defaultValue={complaint?.message}
                  />
                  <FormDescription>
                    Enter the message of the complaint.
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
      </DialogContent>
    </Dialog>
  );
};

export default UpdateComplaint;
