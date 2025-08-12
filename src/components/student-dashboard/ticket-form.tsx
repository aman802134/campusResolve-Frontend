"use client";
import { useState } from "react";
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

export const TicketForm = () => {
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isSensitive, setIsSensitive] = useState(false);

  const addAttachment = () => {
    setAttachments([...attachments, `attachment-${Date.now()}.pdf`]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-slate-700">
          Title
        </Label>
        <Input
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
          id="description"
          placeholder="Provide detailed information about your complaint..."
          className="border-slate-200 focus:border-blue-400 min-h-[120px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700">Campus</Label>
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

        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700">
            Department
          </Label>
          <Select>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700">Domain</Label>
          <Input
            placeholder="e.g., academic, facilities, hostel"
            className="border-slate-200 focus:border-blue-400"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-slate-700">Priority</Label>
          <Select>
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
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                    High
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
          <div className="text-center">
            <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <Button
              variant="outline"
              size="sm"
              onClick={addAttachment}
              className="text-slate-600 hover:text-slate-800"
            >
              Add Attachment
            </Button>
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
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
        Submit Complaint
      </Button>
    </div>
  );
};
