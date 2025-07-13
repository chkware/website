import React from "react";
import { cn } from "@/lib/utils";
import { Info, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "error" | "success";
  title?: string;
  className?: string;
}

const iconMap = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle,
};

const bgColorMap = {
  info: "bg-blue-50 dark:bg-blue-950/30",
  warning: "bg-amber-50 dark:bg-amber-950/30",
  error: "bg-red-50 dark:bg-red-950/30",
  success: "bg-green-50 dark:bg-green-950/30",
};

const borderColorMap = {
  info: "border-blue-200 dark:border-blue-800",
  warning: "border-amber-200 dark:border-amber-800",
  error: "border-red-200 dark:border-red-800",
  success: "border-green-200 dark:border-green-800",
};

const textColorMap = {
  info: "text-blue-800 dark:text-blue-200",
  warning: "text-amber-800 dark:text-amber-200",
  error: "text-red-800 dark:text-red-200",
  success: "text-green-800 dark:text-green-200",
};

const iconColorMap = {
  info: "text-blue-500 dark:text-blue-400",
  warning: "text-amber-500 dark:text-amber-400",
  error: "text-red-500 dark:text-red-400",
  success: "text-green-500 dark:text-green-400",
};

export function Callout({
  children,
  type = "info",
  title,
  className,
}: CalloutProps) {
  const IconComponent = iconMap[type];

  return (
    <div
      className={cn(
        "my-6 rounded-lg border p-4",
        bgColorMap[type],
        borderColorMap[type],
        className
      )}
    >
      <div className="flex items-start">
        <div className={cn("mr-3 mt-1", iconColorMap[type])}>
          <IconComponent className="h-5 w-5" />
        </div>
        <div className="flex-1">
          {title && (
            <h5 className={cn("mb-1 font-medium", textColorMap[type])}>
              {title}
            </h5>
          )}
          <div className={cn("text-sm", textColorMap[type])}>{children}</div>
        </div>
      </div>
    </div>
  );
}
