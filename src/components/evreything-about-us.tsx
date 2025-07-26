import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiMessageSquare } from "react-icons/fi";
import { CiClock2 } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { IoBarChart } from "react-icons/io5";
import { LuShield } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { IoMdTrendingUp } from "react-icons/io";

export default function EverythingAboutUs() {
  return (
    <section className="flex flex-col bg-slate-100 py-16 px-4 md:px-8 space-y-8">
      <div className="max-w-4xl mx-auto text-balance md:text-center">
        <h1 className="text-4xl font-bold font-serif mb-4">
          Everything you need to know About CampusResolve
        </h1>
        <p className="text-md md:text-lg text-gray-700">
          This section will contain all the information about our platform, its
          features, and how it can help you resolve campus issues efficiently.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="md:col-span-2 lg:col-span-2 shadow-sm hover:shadow-xl border-0 hover:bg-gradient-to-b from-cyan-50 to-blue-100 transition-all duration-300 group">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-400/40 rounded-lg flex items-center justify-center group-hover:bg-cyan-400 transition-colors">
                <FiMessageSquare className="w-6 h-6 text-accent" />
              </div>
              <Badge className="bg-green-600/20 text-success border-green-500/60">
                Active
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Quick Complaint Submission
            </h3>
            <p className="text-muted-foreground mb-4">
              Submit complaints in under 2 minutes with our streamlined form and
              automatic categorization.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <CiClock2 className="w-4 h-4" />
                <span>2 min avg</span>
              </span>
              <span className="flex items-center space-x-1">
                <FiCheckCircle className="w-4 h-4" />
                <span>99.9% uptime</span>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-xl border-0 hover:bg-gradient-to-b from-slate-50 to-gray-100 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <IoSearchOutline className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Real-time Tracking
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Track your complaint status with live updates and notifications.
            </p>
            <div className="text-xs text-cyan-500/60 font-medium">
              Live Status Updates
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-xl border-0 hover:bg-gradient-to-b from-yellow-50 to-green-100 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="w-10 h-10 bg-yellow-300/25 rounded-lg flex items-center justify-center mb-4 group-hover:bg-warning/20 transition-colors">
              <IoBarChart className="w-5 h-5 text-yellow-500/80" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Smart Analytics
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive reporting and insights for administrators.
            </p>
            <div className="text-xs text-green-500/60 font-medium">
              Data-Driven Insights
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-xl border-0 hover:bg-gradient-to-b from-red-50 to-pink-100 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
              <LuShield className="w-5 h-5 text-destructive" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Secure & Private
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              End-to-end encryption with role-based access control.
            </p>
            <div className="text-xs text-destructive font-medium">
              Enterprise Security
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-xl border-0 hover:bg-gradient-to-b from-blue-50 to-cyan-100 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="w-10 h-10 bg-cyan-400/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
              <FiUsers className="w-5 h-5 text-cyan-400/80" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Team Collaboration
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Seamless coordination between departments and administrators.
            </p>
            <div className="text-xs text-cyan-500/60 font-medium">
              Multi-Department
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm hover:shadow-xl border-0 hover:bg-gradient-to-b from-green-50 to-orange-100 transition-all duration-300 group">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                Platform Statistics
              </h3>
              <div className="w-12 h-12 bg-green-400/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <IoMdTrendingUp className="w-6 h-6 text-green-500/60" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">
                  15K+
                </div>
                <div className="text-sm text-muted-foreground">
                  Complaints Resolved
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">
                  48hr
                </div>
                <div className="text-sm text-muted-foreground">
                  Avg Resolution Time
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">
                  96%
                </div>
                <div className="text-sm text-muted-foreground">
                  User Satisfaction
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
