"use client";
import { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function RoleRequestForm() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Submit New Role Request
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Requested Role
              </Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="border-slate-200 focus:border-blue-400">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="department_admin">
                    Department Admin
                  </SelectItem>
                  <SelectItem value="campus_admin">Campus Admin</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Campus
              </Label>
              <Select>
                <SelectTrigger className="border-slate-200 focus:border-blue-400">
                  <SelectValue placeholder="Select campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Campus</SelectItem>
                  <SelectItem value="north">North Campus</SelectItem>
                  <SelectItem value="south">South Campus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedRole === "department_admin" && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Department
                </Label>
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="border-slate-200 focus:border-blue-400">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="ee">Electrical Engineering</SelectItem>
                    <SelectItem value="me">Mechanical Engineering</SelectItem>
                    <SelectItem value="admin">Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Justification
              </Label>
              <Textarea
                placeholder="Explain why you need this role and your qualifications..."
                className="border-slate-200 focus:border-blue-400 min-h-[100px]"
              />
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
              Submit Role Request
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
