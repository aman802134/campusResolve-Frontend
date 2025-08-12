import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ComponentType } from "react";

interface ActionItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

interface Props {
  actions: ActionItem[];
}

export const DashboardActionButtons = ({ actions }: Props) => {
  return (
    <>
      {actions.map((action) => (
        <Link key={action.href} href={action.href}>
          <div className="flex gap-2 w-full">
            <Button
              title={action.label}
              variant="outline"
              className="shadow-sm rounded-md cursor-pointer"
            >
              <span>
                <action.icon className="w-5 h-5" />
              </span>
            </Button>
            <Button
              variant="outline"
              className="w-48 shadow-sm hidden md:block cursor-pointer text-start"
            >
              <span>{action.label}</span>
            </Button>
          </div>
        </Link>
      ))}
    </>
  );
};
