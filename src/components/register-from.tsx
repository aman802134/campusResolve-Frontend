"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Mail, Lock, User, Phone } from "lucide-react";
import { registerSchema } from "@/validations/auth-schema.validation";
import React from "react";
import { useCreateUser } from "@/lib/hooks/tanstack-querry-hooks";
import { useCampuses, useDepartments } from "@/lib/hooks/tanstack-querry-hooks";
import toast from "react-hot-toast";
import { ValidationErrorResponse } from "@/types/error.types";

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      externalId: "",
      password: "",
      campus: "",
      department: "",
      phone: "",
      gender: undefined,
    },
  });

  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const { mutate, isError, error, isSuccess, data, isPending } =
    useCreateUser();
  const { data: campuses, isLoading: campusesLoading } = useCampuses();
  const { data: departments, isLoading: departmentsLoading } = useDepartments();
  const router = useRouter();

  // Cleanup object URL when component unmounts or preview changes
  React.useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const onSubmit = async (values: RegisterFormData) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("externalId", values.externalId);
    formData.append("password", values.password);
    formData.append("campus", values.campus ?? "");
    formData.append("department", values.department ?? "");
    formData.append("phone", values.phone ?? "");
    formData.append("gender", values.gender ?? "");

    // Append the file if it exists
    if (values.avatarUrl) {
      formData.append("avatarUrl", values.avatarUrl);
    }
    // Show loading toast
    const loadingToast = toast.loading("Creating your account...");
    mutate(formData, {
      onSuccess: () => {
        toast.dismiss(loadingToast);
        router.push("/login");
      },
      onError: () => {
        toast.dismiss(loadingToast);
      },
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("File size must be less than 5MB");
        return;
      }
      // Clean up previous object URL
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
      form.setValue("avatarUrl", file);
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };
  // Handle success and error cases with toast
  React.useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message || "Registration successful!");
      // Clear the form after successful registration
      form.reset({
        name: "",
        email: "",
        externalId: "",
        password: "",
        campus: "",
        department: "",
        phone: "",
        gender: undefined,
      });

      // Clear the avatar preview
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
        setAvatarPreview(null);
      }
      // Optionally redirect to login page
    }
  }, [isSuccess, data, form, avatarPreview]);

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
        toast.error("Registration failed. Please try again.");
      }
    }
  }, [isError, error]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10  flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 gradient rounded-full mb-4 shadow-glow">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">CampusResolve</h1>
          <p className="text-muted-foreground mt-2">
            Create your account to get started
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-sm border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Join CampusResolve
            </CardTitle>
            <CardDescription className="text-center">
              Fill in your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      {...form.register("name")}
                      id="name"
                      placeholder="John Doe"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      {...form.register("email")}
                      id="email"
                      placeholder="your.email@university.edu"
                      className="pl-10"
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="externalId">External-Id</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      {...form.register("externalId")}
                      id="externalId"
                      placeholder="QVC-STU009 or QVC-FAC001"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Campus */}
                <div className="space-y-2">
                  <Label htmlFor="campus">Campus</Label>
                  <Select
                    value={form.watch("campus")}
                    onValueChange={(value) => form.setValue("campus", value)}
                    disabled={campusesLoading}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          campusesLoading
                            ? "Loading campuses..."
                            : "Select campus"
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

                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department">Department (Optional)</Label>
                  <Select
                    value={form.watch("department")}
                    onValueChange={(value) =>
                      form.setValue("department", value)
                    }
                    disabled={departmentsLoading}
                  >
                    <SelectTrigger>
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
                        (departments?.data as any)?.data.map(
                          (department: any) => (
                            <SelectItem
                              key={department._id || department.id}
                              value={department._id || department.id}
                            >
                              {department.name}
                            </SelectItem>
                          )
                        )
                      ) : (
                        <SelectItem value="no-departments" disabled>
                          No departments available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      {...form.register("phone")}
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender (Optional)</Label>
                  <Select
                    value={form.watch("gender")}
                    onValueChange={(value) =>
                      form.setValue(
                        "gender",
                        value as RegisterFormData["gender"]
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Avatar URL */}
              <div className="space-y-2">
                <Label htmlFor="avatarUrl">Profile Picture (Optional)</Label>
                <div className="relative">
                  {avatarPreview && (
                    <Image
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
                      alt="profile image"
                      src={avatarPreview}
                      width={32}
                      height={32}
                    />
                  )}
                  <Input
                    type="file"
                    id="avatarUrl"
                    onChange={handleAvatarChange}
                    accept="image/*"
                    placeholder="Upload your profile picture"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    {...form.register("password")}
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-primary rounded border-border focus:ring-2 focus:ring-ring"
                  required
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-cyan-600/80 hover:text-cyan-600"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-cyan-600/80 hover:text-cyan-600"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                variant="secondary"
                className="w-full gradient text-white hover:opacity-90 transition-colors cursor-pointer"
                disabled={isPending}
              >
                {isPending ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-cyan-600/80 hover:text-cyan-600 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
