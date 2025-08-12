"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Mail, Lock } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";

// 🧠 Import your zod schema and type from validation/types folder
import { loginSchema } from "@/validations/auth-schema.validation";
import { useLoginUser } from "@/lib/hooks/tanstack-querry-hooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "@/lib/context/auth-context";
import { RedirectByRole } from "@/utils/redirect-by-role";
import { ValidationErrorResponse } from "@/types/error.types";

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isError, error, isSuccess, data } = useLoginUser();
  const { login } = useAuth();
  const router = useRouter();
  console.log("after login : ", data?.data.user.role);

  React.useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message || "Login successful!");

      // Clear the form after successful registration
      form.reset({
        email: "",
        password: "",
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
        toast.error("Registration failed. Please try again.");
      }
    }
  }, [isError, error]);

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const loadingToast = toast.loading("Loging in your account...");
    mutate(values, {
      onSuccess: (response) => {
        toast.dismiss(loadingToast);
        console.log("don't worry reponse got form login form");
        login(response?.data);
        RedirectByRole(response?.data?.user?.role, router);
      },
      onError: () => {
        toast.dismiss(loadingToast);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 gradient rounded-full mb-4 shadow-glow">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">CampusResolve</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-sm border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="your.email@university.edu"
                            className="pl-10"
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="pl-10"
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Remember Me + Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 text-primary rounded border-border focus:ring-2 focus:ring-ring"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm text-muted-foreground"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-cyan-600/80 hover:text-accent-glow transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full gradient text-white hover:opacity-90 transition-colors cursor-pointer"
                >
                  Sign In
                </Button>
              </form>
            </Form>

            {/* Sign Up */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?
                <Link
                  href="/register"
                  className="text-cyan-600/80 hover:text-accent-glow font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Back to Home */}
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

export default LoginForm;
