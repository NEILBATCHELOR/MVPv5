// src/components/tokens/ERC3643Config.tsx
import React from "react";
import { useTokenStore } from "@/store/tokenStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Trash2 } from "lucide-react";
import { TokenMetadata } from "@/types/tokenTypes";

const ERC3643Config: React.FC = () => {
  const { tokenForm, setTokenForm } = useTokenStore();

  // Handle tranche management
  const addTranche = () => {
    const newId = tokenForm.metadata.tranches?.length > 0
      ? Math.max(...tokenForm.metadata.tranches.map((t) => t.id)) + 1
      : 1;
    setTokenForm({
      metadata: {
        ...tokenForm.metadata,
        tranches: [
          ...(tokenForm.metadata.tranches || []),
          { id: newId, name: `Tranche ${newId}`, value: 0, interestRate: 0 },
        ],
      },
    });
  };

  const updateTranche = (index: number, field: keyof typeof tokenForm.metadata.tranches[0], value: string | number) => {
    const updatedTranches = [...(tokenForm.metadata.tranches || [])];
    updatedTranches[index] = {
      ...updatedTranches[index],
      [field]: field === "value" || field === "interestRate" ? parseFloat(value as string) : value,
    };
    setTokenForm({ metadata: { ...tokenForm.metadata, tranches: updatedTranches } });
  };

  const removeTranche = (index: number) => {
    const updatedTranches = [...(tokenForm.metadata.tranches || [])].filter((_, i) => i !== index);
    setTokenForm({ metadata: { ...tokenForm.metadata, tranches: updatedTranches } });
  };

  return (
    <div className="space-y-6 border-t pt-6">
      <h3 className="text-lg font-medium text-gray-900">ERC-3643 Compliance Token Configuration</h3>
      <CardContent>
        {/* Basic Token Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Token Name</Label>
            <Input
              id="name"
              value={tokenForm.name}
              onChange={(e) => setTokenForm({ name: e.target.value })}
              placeholder="e.g., PrivateEquityToken"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="symbol">Token Symbol</Label>
            <Input
              id="symbol"
              value={tokenForm.symbol}
              onChange={(e) => setTokenForm({ symbol: e.target.value })}
              placeholder="e.g., PET"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalSupply">Total Supply</Label>
            <Input
              id="totalSupply"
              type="number"
              value={tokenForm.totalSupply}
              onChange={(e) => setTokenForm({ totalSupply: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 10000"
            />
          </div>
        </div>

        {/* Compliance Settings */}
        <div className="space-y-4 mt-6">
          <h4 className="font-medium text-gray-900">Compliance Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="kycRequired"
                checked={tokenForm.metadata.kycRequired || false}
                onCheckedChange={(checked) => setTokenForm({ metadata: { ...tokenForm.metadata, kycRequired: !!checked } })}
              />
              <div>
                <Label htmlFor="kycRequired">KYC Required</Label>
                <p className="text-xs text-gray-500">Require KYC verification for investors.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="whitelistEnabled"
                checked={tokenForm.metadata.whitelistEnabled || false}
                onCheckedChange={(checked) => setTokenForm({ metadata: { ...tokenForm.metadata, whitelistEnabled: !!checked } })}
              />
              <div>
                <Label htmlFor="whitelistEnabled">Whitelist Enabled</Label>
                <p className="text-xs text-gray-500">Restrict to pre-approved investors.</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Jurisdiction Restrictions</Label>
              <div className="grid grid-cols-2 gap-2">
                {["US", "EU", "UK", "APAC", "LATAM", "MENA", "AFRICA"].map((region) => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox
                      id={`region-${region}`}
                      checked={tokenForm.metadata.jurisdictionRestrictions?.includes(region) || false}
                      onCheckedChange={(checked) => {
                        const restrictions = tokenForm.metadata.jurisdictionRestrictions || [];
                        setTokenForm({
                          metadata: {
                            ...tokenForm.metadata,
                            jurisdictionRestrictions: checked
                              ? [...restrictions, region]
                              : restrictions.filter((r) => r !== region),
                          },
                        });
                      }}
                    />
                    <Label htmlFor={`region-${region}`}>{region}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lockupPeriodEnabled"
                checked={tokenForm.metadata.lockupPeriod !== undefined}
                onCheckedChange={(checked) => {
                  setTokenForm({
                    metadata: {
                      ...tokenForm.metadata,
                      lockupPeriod: checked ? 365 : undefined,
                    },
                  });
                }}
              />
              <div>
                <Label htmlFor="lockupPeriodEnabled">Lockup Period</Label>
                <p className="text-xs text-gray-500">Enforce a lockup period (days).</p>
              </div>
            </div>
            {tokenForm.metadata.lockupPeriod !== undefined && (
              <div className="space-y-2">
                <Label htmlFor="lockupPeriod">Lockup Period (Days)</Label>
                <Input
                  id="lockupPeriod"
                  type="number"
                  value={tokenForm.metadata.lockupPeriod || 365}
                  onChange={(e) => setTokenForm({ metadata: { ...tokenForm.metadata, lockupPeriod: parseInt(e.target.value) || 0 } })}
                  placeholder="e.g., 365"
                />
              </div>
            )}
          </div>
        </div>

        {/* Valuation Mechanism */}
        <div className="space-y-4 mt-6">
          <h4 className="font-medium text-gray-900">Valuation Mechanism</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valuationFrequency">Valuation Frequency</Label>
              <Select
                value={tokenForm.metadata.valuationSchedule?.frequency || "quarterly"}
                onValueChange={(value) => {
                  setTokenForm({
                    metadata: {
                      ...tokenForm.metadata,
                      valuationSchedule: {
                        ...(tokenForm.metadata.valuationSchedule || {}),
                        frequency: value as "monthly" | "quarterly" | "biannually" | "annually" | "custom",
                      },
                    },
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="biannually">Biannually</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="valuationMethod">Valuation Method</Label>
              <Select
                value={tokenForm.metadata.valuationSchedule?.method || "dcf"}
                onValueChange={(value) => {
                  setTokenForm({
                    metadata: {
                      ...tokenForm.metadata,
                      valuationSchedule: {
                        ...(tokenForm.metadata.valuationSchedule || {}),
                        method: value as "dcf" | "marketComparables" | "assetBased" | "custom",
                      },
                    },
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dcf">Discounted Cash Flow</SelectItem>
                  <SelectItem value="marketComparables">Market Comparables</SelectItem>
                  <SelectItem value="assetBased">Asset-Based</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextValuationDate">Next Valuation Date</Label>
              <Input
                id="nextValuationDate"
                type="date"
                value={tokenForm.metadata.valuationSchedule?.nextValuationDate || ""}
                onChange={(e) => {
                  setTokenForm({
                    metadata: {
                      ...tokenForm.metadata,
                      valuationSchedule: {
                        ...(tokenForm.metadata.valuationSchedule || {}),
                        nextValuationDate: e.target.value,
                      },
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>

        {/* Governance Structure */}
        <div className="space-y-4 mt-6">
          <h4 className="font-medium text-gray-900">Governance Structure</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="votingThreshold">Voting Threshold (%)</Label>
              <Input
                id="votingThreshold"
                type="number"
                min="0"
                max="100"
                value={tokenForm.metadata.votingThreshold || 5}
                onChange={(e) => setTokenForm({ metadata: { ...tokenForm.metadata, votingThreshold: parseInt(e.target.value) || 0 } })}
                placeholder="e.g., 5"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger><span className="text-xs text-gray-500">?</span></TooltipTrigger>
                  <TooltipContent>Minimum percentage of tokens to propose or vote.</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="multiSignature"
                checked={tokenForm.blocks.governance.includes("multi_sig")}
                onCheckedChange={(checked) => {
                  const updatedGovernance = checked
                    ? [...tokenForm.blocks.governance, "multi_sig"]
                    : tokenForm.blocks.governance.filter((b) => b !== "multi_sig");
                  setTokenForm({ blocks: { ...tokenForm.blocks, governance: updatedGovernance } });
                }}
              />
              <div>
                <Label htmlFor="multiSignature">Multi-Signature</Label>
                <p className="text-xs text-gray-500">Require multiple approvals for actions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profit Distribution */}
        <div className="space-y-4 mt-6">
          <h4 className="font-medium text-gray-900">Profit Distribution</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dividendFrequency">Dividend Frequency</Label>
              <Select
                value={tokenForm.metadata.dividendFrequency || "quarterly"}
                onValueChange={(value) => setTokenForm({ metadata: { ...tokenForm.metadata, dividendFrequency: value as any } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="biannually">Biannually</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="onExit">On Exit</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="reinvestmentAllowed"
                checked={tokenForm.metadata.reinvestmentAllowed || false}
                onCheckedChange={(checked) => setTokenForm({ metadata: { ...tokenForm.metadata, reinvestmentAllowed: !!checked } })}
              />
              <div>
                <Label htmlFor="reinvestmentAllowed">Reinvestment Allowed</Label>
                <p className="text-xs text-gray-500">Allow investors to reinvest dividends.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Share Classes (Tranches) */}
        <div className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-900">Share Classes (Tranches)</h4>
            <Button variant="outline" size="sm" onClick={addTranche}>
              <Plus className="h-4 w-4 mr-2" /> Add Tranche
            </Button>
          </div>
          {(!tokenForm.metadata.tranches || tokenForm.metadata.tranches.length === 0) ? (
            <p className="text-gray-500 text-center py-4">No tranches defined. Add one to proceed.</p>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Value</th>
                    <th className="p-2 text-left">Interest Rate (%)</th>
                    <th className="p-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tokenForm.metadata.tranches.map((tranche, index) => (
                    <tr key={tranche.id} className="border-t">
                      <td className="p-2">
                        <Input
                          value={tranche.name}
                          onChange={(e) => updateTranche(index, "name", e.target.value)}
                          className="w-full"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          value={tranche.value}
                          onChange={(e) => updateTranche(index, "value", e.target.value)}
                          className="w-full"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          value={tranche.interestRate}
                          onChange={(e) => updateTranche(index, "interestRate", e.target.value)}
                          className="w-full"
                        />
                      </td>
                      <td className="p-2 text-right">
                        <Button variant="ghost" size="icon" onClick={() => removeTranche(index)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-2 bg-gray-50 flex justify-between">
                <span>Total Value: {tokenForm.metadata.tranches.reduce((sum, t) => sum + (t.value || 0), 0).toLocaleString()}</span>
                <span className={tokenForm.metadata.tranches.reduce((sum, t) => sum + (t.value || 0), 0) === tokenForm.totalSupply ? "text-green-500" : "text-red-500"}>
                  {tokenForm.metadata.tranches.reduce((sum, t) => sum + (t.value || 0), 0) === tokenForm.totalSupply ? "✓ Matches" : `⚠️ Mismatch (${tokenForm.totalSupply})`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Conversion to ERC-20 */}
        <div className="space-y-4 mt-6">
          <h4 className="font-medium text-gray-900">Liquidity Conversion</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="erc20ConversionRatio">ERC-20 Conversion Ratio</Label>
              <Input
                id="erc20ConversionRatio"
                type="number"
                min="1"
                value={tokenForm.metadata.erc20ConversionRatio || 15}
                onChange={(e) => setTokenForm({ metadata: { ...tokenForm.metadata, erc20ConversionRatio: parseInt(e.target.value) || 0 } })}
                placeholder="e.g., 15"
              />
              <p className="text-xs text-gray-500">1 token = [ratio] ERC-20 tokens</p>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default ERC3643Config;