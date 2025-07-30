"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
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
import { GraduationCap, Mail, Lock, User, Phone, Building } from "lucide-react";
import { registerSchema } from "@/validations/auth-schema.validation";
import React from "react";

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      requestedRole: undefined,
      campus: "",
      department: "",
      phone: "",
      gender: undefined,
      avatarUrl: "",
    },
  });

  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);

  const onSubmit = (values: RegisterFormData) => {
    console.log("Register values:", values);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      form.setValue("avatarUrl", url); // or handle file upload here
    }
  };

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
              </div>
              <div className="space-y-2">
                <Label htmlFor="requestedRole">Requested Role (Optional)</Label>
                <Select
                  value={form.watch("requestedRole")}
                  onValueChange={(value) =>
                    form.setValue(
                      "requestedRole",
                      value as RegisterFormData["requestedRole"]
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Request different role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="faculty_academic">
                      Faculty Academic
                    </SelectItem>
                    <SelectItem value="faculty_non_academic">
                      Faculty Non-Academic
                    </SelectItem>
                    <SelectItem value="department_admin">
                      Department Admin
                    </SelectItem>
                    <SelectItem value="campus_admin">Campus Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Campus */}
                <div className="space-y-2">
                  <Label htmlFor="campus">Campus</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      {...form.register("campus")}
                      id="campus"
                      placeholder="Main Campus"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department">Department (Optional)</Label>
                  <Select
                    value={form.watch("department")}
                    onValueChange={(value) =>
                      form.setValue("department", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer_science">
                        Computer Science
                      </SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="arts">Arts & Sciences</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="law">Law</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="administration">
                        Administration
                      </SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="library">Library</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
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
                <Label htmlFor="avatarUrl">
                  Profile Picture URL (Optional)
                </Label>
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
                    id="avatarUrl"
                    placeholder="https://example.com/your-photo.jpg"
                    className="pl-10"
                    onChange={handleAvatarChange}
                    type="file"
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
              >
                Create Account
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
