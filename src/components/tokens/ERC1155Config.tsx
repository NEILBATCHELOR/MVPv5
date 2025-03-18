// src/components/ERC1155Config.tsx
import React from "react";
import { Input } from "@radix-ui/react-input";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@radix-ui/react-checkbox";
import { TokenForm } from "../types/tokenTypes";

interface ERC1155ConfigProps {
  formData: TokenForm;
  setFormData: React.Dispatch<React.SetStateAction<TokenForm>>;
}

const ERC1155Config: React.FC<ERC1155ConfigProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, [name]: value },
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      blocks: {
        ...prev.blocks,
        features: checked
          ? [...prev.blocks.features, field]
          : prev.blocks.features.filter((f) => f !== field),
      },
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">ERC-1155 Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Token Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} className="w-full p-2 border rounded-md" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="symbol" className="text-sm font-medium">Token Symbol</Label>
          <Input id="symbol" name="symbol" value={formData.symbol} onChange={(e) => setFormData((prev) => ({ ...prev, symbol: e.target.value }))} className="w-full p-2 border rounded-md" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="uri" className="text-sm font-medium">URI</Label>
          <Input id="uri" name="uri" value={formData.metadata.uri || ""} onChange={handleInputChange} className="w-full p-2 border rounded-md" placeholder="e.g., https://example.com/" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="numberOfFractions" className="text-sm font-medium">Number of Fractions</Label>
          <Input
            id="numberOfFractions"
            name="numberOfFractions"
            type="number"
            value={formData.metadata.numberOfFractions || ""}
            onChange={(e) => setFormData((prev) => ({ ...prev, metadata: { ...prev.metadata, numberOfFractions: parseInt(e.target.value) || 0 } }))}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-md font-medium">Features</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="mintable"
              checked={formData.blocks.features.includes("mintable")}
              onCheckedChange={(checked) => handleCheckboxChange("mintable", checked as boolean)}
            />
            <Label htmlFor="mintable">Mintable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="batch_operations"
              checked={formData.blocks.features.includes("batch_operations")}
              onCheckedChange={(checked) => handleCheckboxChange("batch_operations", checked as boolean)}
            />
            <Label htmlFor="batch_operations">Batch Operations</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERC1155Config;