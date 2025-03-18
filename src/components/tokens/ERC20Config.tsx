// src/components/ERC20Config.tsx
import React from "react";
import { Input } from "@radix-ui/react-input";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@radix-ui/react-checkbox";
import { TokenForm } from "../types/tokenTypes";

interface ERC20ConfigProps {
  formData: TokenForm;
  setFormData: React.Dispatch<React.SetStateAction<TokenForm>>;
}

const ERC20Config: React.FC<ERC20ConfigProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      <h3 className="text-lg font-medium">ERC-20 Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Token Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="symbol" className="text-sm font-medium">Token Symbol</Label>
          <Input id="symbol" name="symbol" value={formData.symbol} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="decimals" className="text-sm font-medium">Decimals</Label>
          <Input
            id="decimals"
            name="decimals"
            type="number"
            min="0"
            max="18"
            value={formData.decimals}
            onChange={(e) => setFormData((prev) => ({ ...prev, decimals: parseInt(e.target.value) || 0 }))}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalSupply" className="text-sm font-medium">Total Supply</Label>
          <Input
            id="totalSupply"
            name="totalSupply"
            type="number"
            value={formData.totalSupply}
            onChange={(e) => setFormData((prev) => ({ ...prev, totalSupply: parseInt(e.target.value) || 0 }))}
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
              id="burnable"
              checked={formData.blocks.features.includes("burnable")}
              onCheckedChange={(checked) => handleCheckboxChange("burnable", checked as boolean)}
            />
            <Label htmlFor="burnable">Burnable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pausable"
              checked={formData.blocks.features.includes("pausable")}
              onCheckedChange={(checked) => handleCheckboxChange("pausable", checked as boolean)}
            />
            <Label htmlFor="pausable">Pausable</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERC20Config;