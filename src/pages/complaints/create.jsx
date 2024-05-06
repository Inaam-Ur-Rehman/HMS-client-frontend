import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { queryClient } from "@/main";
import complaintValidationSchema, {
  complaintValidationSchemaCreate,
} from "@/validations/complaint.validation.js";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "@/http/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, SendHorizonalIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const CreateComplaint = () => {
  const navigate = useNavigate();
  const ref = React.useRef();
  const mutation = useMutation({
    mutationFn: (data) => api.post(`/complaints`, data),
    onSuccess: () => {
      toast.success("Complaint created successfully");
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
    resolver: zodResolver(complaintValidationSchemaCreate),
    defaultValues: {
      message: "",
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Complaint</CardTitle>
        <CardDescription>
          Fill the form to create a new complaint.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <Input {...field} placeholder="Message" />
                  <FormDescription>
                    Enter the message of the complaint.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2" variant="default">
              Submit
              <SendHorizonalIcon className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateComplaint;
