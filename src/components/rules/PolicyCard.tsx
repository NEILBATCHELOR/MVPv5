import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Tag,
  Globe,
  Calendar,
  FileText,
  Download,
  Copy,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface PolicyCardProps {
  id?: string;
  name?: string;
  status?: "active" | "inactive" | "draft" | "pending";
  createdAt?: string;
  modifiedAt?: string;
  description?: string;
  type?: string;
  jurisdiction?: string;
  effectiveDate?: string;
  expirationDate?: string;
  tags?: string[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

const PolicyCard = ({
  id = "policy-1",
  name = "Transfer Limit Policy",
  status = "active",
  createdAt = "2023-06-15",
  modifiedAt = "2023-07-20",
  description = "Enforces limits on digital asset transfers based on user tier and asset type.",
  type = "transfer_limit",
  jurisdiction = "global",
  effectiveDate = "2023-06-15",
  expirationDate = "",
  tags = ["high-value", "compliance"],
  onEdit = () => {},
  onDelete = () => {},
  onView = () => {},
  onDuplicate = () => {},
}: PolicyCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "draft":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPolicyTypeName = (type: string) => {
    const typeMap: Record<string, string> = {
      transfer_limit: "Transfer Limit",
      kyc_verification: "KYC Verification",
      restricted_assets: "Restricted Assets",
      multi_signature: "Multi-Signature Approval",
      dormant_account: "Dormant Account",
      risk_assessment: "Risk Assessment",
      transaction_monitoring: "Transaction Monitoring",
      custom: "Custom Policy",
    };
    return (
      typeMap[type] ||
      (type
        ? type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "")
    );
  };

  const getJurisdictionName = (jurisdiction: string) => {
    const jurisdictionMap: Record<string, string> = {
      global: "Global",
      us: "United States",
      eu: "European Union",
      uk: "United Kingdom",
      asia_pacific: "Asia Pacific",
      custom: "Custom Jurisdiction",
    };
    return (
      jurisdictionMap[jurisdiction] ||
      (jurisdiction
        ? jurisdiction
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())
        : "")
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full bg-white hover:shadow-md transition-shadow duration-200 mb-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">{name}</CardTitle>
          <div className="flex items-center mt-1 space-x-2">
            <Badge className={getStatusColor(status)} variant="outline">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                const newStatus = status === "active" ? "inactive" : "active";
                // In a real app, this would update the status in your state management or backend
                console.log(`Toggling status from ${status} to ${newStatus}`);
              }}
              className="ml-2 text-xs"
            >
              {status === "active" ? "Deactivate" : "Activate"}
            </Button>
            <span className="text-xs text-gray-500">
              Modified: {formatDate(modifiedAt)}
            </span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(id)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(id)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Policy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate(id)}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate Policy
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // Export single policy as JSON
                const jsonData = JSON.stringify(
                  {
                    id,
                    name,
                    status,
                    description,
                    type,
                    jurisdiction,
                    effectiveDate,
                    expirationDate,
                    tags,
                  },
                  null,
                  2,
                );
                const blob = new Blob([jsonData], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `policy_${id}_${new Date().toISOString().split("T")[0]}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Policy
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(id)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Policy
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-500 mb-3">
          <div className="flex items-center">
            <FileText className="h-3 w-3 mr-1" />
            <span>Type: {getPolicyTypeName(type)}</span>
          </div>
          <div className="flex items-center">
            <Globe className="h-3 w-3 mr-1" />
            <span>Jurisdiction: {getJurisdictionName(jurisdiction)}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Effective: {formatDate(effectiveDate)}</span>
          </div>
          {expirationDate && (
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Expires: {formatDate(expirationDate)}</span>
            </div>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-1">
            <Tag className="h-3 w-3 text-gray-400 mr-1" />
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200 text-xs py-0 px-2"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end pt-2 pb-4">
        <Button
          variant="outline"
          size="sm"
          className="mr-2"
          onClick={() => onView(id)}
        >
          View Details
        </Button>
        <Button
          size="sm"
          onClick={() => onEdit(id)}
          className="bg-[#0f172b] hover:bg-[#0f172b]/90"
        >
          Edit Policy
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PolicyCard;
