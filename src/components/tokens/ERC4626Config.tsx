// src/components/ERC4626Config.tsx
import React from "react";
import { Input } from "@radix-ui/react-input";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { TokenForm } from "../types/tokenTypes";

interface ERC4626ConfigProps {
  formData: TokenForm;
  setFormData: React.Dispatch<React.SetStateAction<TokenForm>>;
}

const ERC4626Config: React.FC<ERC4626ConfigProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, [name]: value },
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">ERC-4626 Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Vault Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} className="w-full p-2 border rounded-md" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="symbol" className="text-sm font-medium">Vault Symbol</Label>
          <Input id="symbol" name="symbol" value={formData.symbol} onChange={(e) => setFormData((prev) => ({ ...prev, symbol: e.target.value }))} className="w-full p-2 border rounded-md" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="underlyingAsset" className="text-sm font-medium">Underlying Asset</Label>
          <Select
            value={formData.metadata.underlyingAsset || ""}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, metadata: { ...prev.metadata, underlyingAsset: value } }))}
          >
            <SelectTrigger className="w-full p-2 border rounded-md">
              <SelectValue placeholder="Select asset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="USDC">USDC</SelectItem>
              <SelectItem value="BTC">BTC</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="yieldStrategy" className="text-sm font-medium">Yield Strategy</Label>
          <Select
            value={formData.metadata.yieldStrategy || ""}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, metadata: { ...prev.metadata, yieldStrategy: value } }))}
          >
            <SelectTrigger className="w-full p-2 border rounded-md">
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Staking">Staking</SelectItem>
              <SelectItem value="Lending">Lending</SelectItem>
              <SelectItem value="Yield Farming">Yield Farming</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="minDeposit" className="text-sm font-medium">Minimum Deposit</Label>
          <Input
            id="minDeposit"
            name="minDeposit"
            type="number"
            value={formData.metadata.minDeposit || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxDeposit" className="text-sm font-medium">Maximum Deposit</Label>
          <Input
            id="maxDeposit"
            name="maxDeposit"
            type="number"
            value={formData.metadata.maxDeposit || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ERC4626Config;