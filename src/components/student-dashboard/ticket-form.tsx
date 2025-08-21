"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import {
  useCampuses,
  useCreateTicket,
  useDepartments,
} from "@/lib/hooks/tanstack-querry-hooks";
import { useForm } from "react-hook-form";
import z, { file } from "zod";
import { createTicketSchema } from "@/validations/ticket-schema.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ValidationErrorResponse } from "@/types/error.types";

type ticketFromData = z.infer<typeof createTicketSchema>;

export const TicketForm = () => {
  const form = useForm<ticketFromData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      department: "",
      campus: "",
      domain: "",
      priority: undefined,
      isSensitive: undefined,
    },
  });
  const { data: campuses, isLoading: campusesLoading } = useCampuses();
  const { data: departments, isLoading: departmentsLoading } = useDepartments();
  const { mutate, isError, error, isSuccess, data, isPending } =
    useCreateTicket();

  const [attachments, setAttachments] = useState<string[]>([]);
  const [isSensitive, setIsSensitive] = useState(false);

  const handleAttachments = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check file type
      if (!allowedTypes.includes(file.type)) {
        alert(`File "${file.name}" must be a PDF or an image (jpg/png)`);
        continue; // skip this file
      }

      // Check file size
      if (file.size > maxSize) {
        alert(`File "${file.name}" must be smaller than 5MB`);
        continue; // skip this file
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      // Add valid files to attachments state
      setAttachments((prev) => [...prev, ...validFiles.map((f) => f.name)]);

      // Update form field with actual File objects (not just names)
      const existingFiles = form.getValues("attachments") || [];
      form.setValue("attachments", [...existingFiles, ...validFiles]);
    }

    // Clear input so same file can be re-selected if needed
    e.target.value = "";
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  const onSubmit = (values: ticketFromData) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("department", values.department);
    formData.append("campus", values.campus);
    formData.append("domain", values.domain ?? "");
    formData.append("priority", values.priority ?? "");
    formData.append("isSensitive", values.isSensitive ?? "");
    if (values.attachments && values.attachments.length > 0) {
      values.attachments.forEach((file) => {
        if (file) {
          formData.append("attachments", file);
        }
      });
    }
    const loadingToast = toast.loading("Submitting your ticket...");
    mutate(formData, {
      onSuccess: () => {
        toast.dismiss(loadingToast);
      },
      onError: () => {
        toast.dismiss(loadingToast);
      },
    });
  };
  React.useEffect(() => {
    if (isSuccess && data) {
      toast.success("Ticket created successfully!");

      // Clear the form after successful registration
      form.reset({
        title: "",
        description: "",
        department: "",
        campus: "",
        domain: "",
        priority: undefined,
        isSensitive: undefined,
      });
    }
  }, [isSuccess, data, form]);

  React.useEffect(() => {
    if (isError && error) {
      // Case 1: Standard Error with message
      if (error instanceof Error && error.message) {
        toast.error(error.message);

        // Case 2: API validation errors
      } else if (
        typeof error === "object" &&
        error !== null &&
        "errors" in error &&
        Array.isArray((error as ValidationErrorResponse).errors)
      ) {
        (error as ValidationErrorResponse).errors.forEach((err) => {
          toast.error(`${err.field}: ${err.message}`);
        });

        // Case 3: Fallback
      } else {
        toast.error("ticket creation failed. Please try again.");
      }
    }
  }, [isError, error]);
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-slate-700">
          Title
        </Label>
        <Input
          {...form.register("title")}
          id="title"
          placeholder="Brief description of your complaint"
          className="border-slate-200 focus:border-blue-400"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-sm font-medium text-slate-700"
        >
          Description
        </Label>
        <Textarea
          {...form.register("description")}
          id="description"
          placeholder="Provide detailed information about your complaint..."
          className="border-slate-200 focus:border-blue-400 min-h-[120px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="campus"
            className="text-sm font-medium text-slate-700"
          >
            Campus
          </Label>
          <Select
            value={form.watch("campus")}
            onValueChange={(value) => form.setValue("campus", value)}
            disabled={campusesLoading}
          >
            <SelectTrigger className="border-slate-200 focus:border-blue-400">
              <SelectValue
                placeholder={
                  campusesLoading ? "Loading campuses..." : "Select campus"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray((campuses?.data as any)?.data) ? (
                (campuses?.data as any)?.data.map((campus: any) => (
                  <SelectItem
                    key={campus._id || campus.id}
                    value={campus._id || campus.id}
                  >
                    {campus.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-campuses" disabled>
                  No campuses available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="department"
            className="text-sm font-medium text-slate-700"
          >
            Department
          </Label>
          <Select
            value={form.watch("department")}
            onValueChange={(value) => form.setValue("department", value)}
            disabled={departmentsLoading}
          >
            <SelectTrigger className="border-slate-200 focus:border-blue-400">
              <SelectValue
                placeholder={
                  departmentsLoading
                    ? "Loading departments..."
                    : "Select department"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray((departments?.data as any)?.data) ? (
                (departments?.data as any)?.data.map((department: any) => (
                  <SelectItem
                    key={department._id || department.id}
                    value={department._id || department.id}
                  >
                    {department.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-departments" disabled>
                  No departments available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700">Domain</Label>
          <Input
            {...form.register("domain")}
            id="domain"
            placeholder="e.g., academic, facilities, hostel"
            className="border-slate-200 focus:border-blue-400"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="priority"
            className="text-sm font-medium text-slate-700"
          >
            Priority
          </Label>
          <Select
            value={form.watch("priority")}
            onValueChange={(value) =>
              form.setValue("priority", value as ticketFromData["priority"])
            }
          >
            <SelectTrigger className="border-slate-200 focus:border-blue-400">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Low
                  </Badge>
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                    Medium
                  </Badge>
                </div>
              </SelectItem>
              <SelectItem value="high">
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-red-100">
                    High
                  </Badge>
                </div>
              </SelectItem>
              <SelectItem value="critical">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-900 hover:bg-red-100">
                    Critical
                  </Badge>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
        <div className="space-y-1">
          <Label className="text-sm font-medium text-slate-700">
            Sensitive Information
          </Label>
          <p className="text-xs text-slate-500">
            Mark if this complaint contains sensitive information
          </p>
        </div>
        <Switch checked={isSensitive} onCheckedChange={setIsSensitive} />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700">
          Attachments
        </Label>
        <Card className="p-4 border-dashed border-2 border-slate-200">
          <div className="w-full flex flex-col justify-center items-center">
            <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <input
              type="file"
              id="attachments"
              onChange={handleAttachments}
              className="text-slate-600 hover:text-slate-800"
            />
            <p className="text-xs text-slate-500 mt-2">
              PDF, JPG, PNG up to 10MB
            </p>
          </div>
        </Card>

        {attachments.length > 0 && (
          <div className="space-y-2">
            {attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50"
              >
                <span className="text-sm text-slate-600">{attachment}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAttachment(index)}
                  className="h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                >
                  <X className="h-4 w-4 cursor-pointer" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
      >
        {isPending ? "submitting complaint" : "Submit your complaint"}
      </Button>
    </form>
  );
};
