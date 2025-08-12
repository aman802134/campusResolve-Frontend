"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldX, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Icon and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <ShieldX className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground mt-2">
            You don't have permission to access this page
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-sm border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Unauthorized Access</CardTitle>
            <CardDescription className="text-center">
              Sorry, you don't have the required permissions to view this page. 
              Please contact your administrator if you believe this is an error.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                If you think you should have access to this page, please:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Contact your system administrator</li>
                <li>• Request the appropriate role permissions</li>
                <li>• Check if your account is properly configured</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              
              <Link href="/">
                <Button className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 