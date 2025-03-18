// src/types/tokenTypes.ts

export interface TokenMetadata {
  description?: string;
  category?: string;
  product?: string;
  issuanceDate?: string;
  maturityDate?: string;
  tranches?: {
    id: number;
    name: string;
    value: number;
    interestRate: number;
  }[];
  whitelistEnabled?: boolean;
  jurisdictionRestrictions?: string[];
  conversionRate?: number;
  underlyingAsset?: string;
  yieldStrategy?: string;
  minDeposit?: string;
  maxDeposit?: string;
  redemptionNoticeDays?: string;
  managementFee?: string;
  navOracleEnabled?: boolean;
  erc20ConversionRate?: string;
  ownerWallet?: string;
  kycRequired?: boolean;
  multiClassEnabled?: boolean;
  erc20Conversion?: boolean;
  valuationSchedule?: {
    frequency: "monthly" | "quarterly" | "biannually" | "annually" | "custom";
    method: "dcf" | "marketComparables" | "assetBased" | "custom";
    nextValuationDate: string;
  };
  lockupPeriod?: number;
  erc20ConversionRatio?: number;
  dividendFrequency?: "quarterly" | "biannually" | "annually" | "onExit" | "custom";
  reinvestmentAllowed?: boolean;
  minimumInvestment?: number;
  votingThreshold?: number;
  issuerWallet?: string;
  callableAfter?: number;
  puttableAfter?: number;
  totalSupply?: number;
  peggedAsset?: string;
  numberOfFractions?: number;
  // ERC-3643 specific fields (already included but verified)
  securityType?: string;
  issuerName?: string;
  slotDescription?: string;
  valueUnit?: string;
  allowsValueTransfer?: boolean;
  redeemableValue?: boolean;
  expiration?: boolean;
  deposit?: boolean;
  withdraw?: boolean;
  convertToShares?: boolean;
  convertToAssets?: boolean;
  maxWithdraw?: boolean;
  totalAssets?: string;
  performanceFee?: string;
}

export interface TokenForm {
  name: string;
  symbol: string;
  decimals: number;
  standard: string;
  totalSupply: number;
  blocks: {
    compliance: string[];
    features: string[];
    governance: string[];
  };
  metadata: TokenMetadata;
}