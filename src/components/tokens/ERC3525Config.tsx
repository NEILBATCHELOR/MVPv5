// src/components/ERC3525Config.tsx
import React from "react";
import { Input } from "@radix-ui/react-input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@radix-ui/react-button";
import { TokenForm } from "../types/tokenTypes";

interface ERC3525ConfigProps {
  formData: TokenForm;
  setFormData: React.Dispatch<React.SetStateAction<TokenForm>>;
}

const ERC3525Config: React.FC<ERC3525ConfigProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, [name]: value },
    }));
  };

  const addTranche = () => {
    const newId = formData.metadata.tranches?.length ? Math.max(...formData.metadata.tranches.map(t => t.id)) + 1 : 1;
    setFormData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        tranches: [
          ...(prev.metadata.tranches || []),
          { id: newId, name: `Tranche ${newId}`, value: 0, interestRate: 0 },
        ],
      },
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">ERC-3525 Configuration</h3>
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
          <Label htmlFor="issuanceDate" className="text-sm font-medium">Issuance Date</Label>
          <Input
            id="issuanceDate"
            name="issuanceDate"
            type="date"
            value={formData.metadata.issuanceDate || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maturityDate" className="text-sm font-medium">Maturity Date</Label>
          <Input
            id="maturityDate"
            name="maturityDate"
            type="date"
            value={formData.metadata.maturityDate || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-md font-medium">Tranches</h4>
          <Button variant="outline" size="sm" onClick={addTranche} className="flex items-center gap-2">
            <span>+</span> Add Tranche
          </Button>
        </div>
        {formData.metadata.tranches?.map((tranche, index) => (
          <div key={tranche.id} className="grid grid-cols-3 gap-4">
            <Input
              value={tranche.name}
              onChange={(e) => {
                const updatedTranches = [...(formData.metadata.tranches || [])];
                updatedTranches[index].name = e.target.value;
                setFormData((prev) => ({ ...prev, metadata: { ...prev.metadata, tranches: updatedTranches } }));
              }}
              className="p-2 border rounded-md"
            />
            <Input
              type="number"
              value={tranche.value}
              onChange={(e) => {
                const updatedTranches = [...(formData.metadata.tranches || [])];
                updatedTranches[index].value = parseInt(e.target.value) || 0;
                setFormData((prev) => ({ ...prev, metadata: { ...prev.metadata, tranches: updatedTranches } }));
              }}
              className="p-2 border rounded-md"
            />
            <Input
              type="number"
              value={tranche.interestRate}
              onChange={(e) => {
                const updatedTranches = [...(formData.metadata.tranches || [])];
                updatedTranches[index].interestRate = parseFloat(e.target.value) || 0;
                setFormData((prev) => ({ ...prev, metadata: { ...prev.metadata, tranches: updatedTranches } }));
              }}
              className="p-2 border rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ERC3525Config;