// src/components/tokens/TokenBuilderNavItem.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";

interface TokenBuilderNavItemProps {
  projectId?: string;
  active?: boolean;
}

const TokenBuilderNavItem: React.FC<TokenBuilderNavItemProps> = ({
  projectId: propProjectId,
  active,
}) => {
  const { projectId: paramProjectId } = useParams<{ projectId: string }>();
  const currentProjectId = propProjectId || paramProjectId;

  return (
    <Link
      to={`/projects/${currentProjectId}/tokens`}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-primary/10",
        active ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-600",
      )}
    >
      <Coins className="h-4 w-4" />
      <span>Token Builder</span>
    </Link>
  );
};

export default TokenBuilderNavItem;