// src/types/productTemplates.ts
import { ReactNode } from "react";
import { TokenMetadata } from "./tokenTypes";

export interface ProductCategory {
  name: string;
  products: string[];
}

export interface ProductTemplate {
  name: string;
  description: string;
  category: string;
  standard: string;
  defaultBlocks: {
    compliance: string[];
    features: string[];
    governance: string[];
  };
  icon?: ReactNode;
  symbol?: string;
  defaultMetadata?: Partial<TokenMetadata>;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    name: "Traditional Assets",
    products: ["Structured Products", "Equity", "Commodities", "Funds, ETFs, ETPs", "Bonds", "Quantitative Investment Strategies"],
  },
  {
    name: "Alternative Assets",
    products: ["Private Equity", "Private Debt", "Real Estate", "Energy", "Infrastructure", "Collectibles & all other assets"],
  },
  {
    name: "Digital Assets",
    products: ["Digital Tokenised Fund"],
  },
];

export const TOKEN_TEMPLATES: ProductTemplate[] = [
  {
    name: "Structured Product Token",
    description: "Complex financial product with conditional returns and multiple tranches",
    category: "Structured Products",
    standard: "ERC-3525",
    defaultBlocks: { compliance: ["KYC", "AML", "Jurisdiction Restrictions"], features: ["Tranches", "Transfer Restrictions"], governance: ["Issuer Control"] },
    icon: <span className="text-red-500">📊</span>,
    defaultMetadata: {
      issuanceDate: new Date().toISOString().split("T")[0],
      maturityDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split("T")[0],
      tranches: [{ id: 1, name: "Senior", value: 700000, interestRate: 3 }, { id: 2, name: "Mezzanine", value: 200000, interestRate: 5 }],
      whitelistEnabled: true,
    },
  },
  {
    name: "Equity Token",
    description: "Standard equity token with voting rights and dividends",
    category: "Equity",
    standard: "ERC-1400",
    defaultBlocks: { compliance: ["KYC", "AML", "Accredited Investors Only"], features: ["Voting", "Dividends"], governance: ["Board Approval"] },
    icon: <span className="text-blue-500">🏢</span>,
    defaultMetadata: { whitelistEnabled: true },
  },
  {
    name: "Commodity Token",
    description: "Token representing a commodity with physical backing",
    category: "Commodities",
    standard: "ERC-20",
    defaultBlocks: { compliance: ["KYC"], features: ["Transfer Restrictions"], governance: ["Issuer Control"] },
    icon: <span className="text-yellow-500">🌾</span>,
    defaultMetadata: { totalSupply: 1000, decimals: 18 },
  },
  {
    name: "Quantitative Investment Strategy Token",
    description: "Token for a yield-bearing quantitative investment strategy",
    category: "Quantitative Investment Strategies",
    standard: "ERC-4626",
    defaultBlocks: { compliance: ["Whitelist", "Investment Restrictions"], features: ["Yield Strategy", "Deposit Limits"], governance: ["Issuer Control"] },
    icon: <span className="text-cyan-500">📈</span>,
    defaultMetadata: { totalSupply: 1000000, underlyingAsset: "BTC", yieldStrategy: "Algorithmic Trading", managementFee: "2", performanceFee: "20", minimumInvestment: 10000 },
  },
  {
    name: "Fund Token",
    description: "Token representing shares in an investment fund",
    category: "Funds, ETFs, ETPs",
    standard: "ERC-4626",
    defaultBlocks: { compliance: ["KYC", "Whitelist"], features: ["Deposit Limits", "Yield Strategy"], governance: ["Issuer Control"] },
    icon: <span className="text-amber-500">💼</span>,
    defaultMetadata: { underlyingAsset: "ETH", yieldStrategy: "Staking" },
  },
  {
    name: "Bond Token",
    description: "Fixed income security with regular coupon payments",
    category: "Bonds",
    standard: "ERC-3525",
    defaultBlocks: { compliance: ["KYC", "AML"], features: ["Fixed Interest", "Redemption Rights"], governance: ["Issuer Control"] },
    icon: <span className="text-purple-500">💵</span>,
    defaultMetadata: {
      issuanceDate: new Date().toISOString().split("T")[0],
      maturityDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split("T")[0],
      tranches: [{ id: 1, name: "Principal", value: 1000000, interestRate: 5 }],
    },
  },
  {
    name: "Private Equity Token",
    description: "Token representing stakes in private companies with multiple share classes and governance",
    category: "Private Equity",
    standard: "ERC-3643",
    defaultBlocks: { compliance: ["KYC", "AML", "Whitelist", "Lockup Period"], features: ["Voting", "Dividends", "Tranches"], governance: ["Multi-Signature"] },
    symbol: "PET",
    icon: <span className="text-green-500">🏦</span>,
    defaultMetadata: {
      totalSupply: 10000,
      ownerWallet: "issuer_address",
      whitelistEnabled: true,
      kycRequired: true,
      lockupPeriod: 365,
      tranches: [{ id: 1, name: "Common", value: 7000, interestRate: 0 }, { id: 2, name: "Preferred", value: 3000, interestRate: 0 }],
      valuationSchedule: { frequency: "quarterly", method: "dcf", nextValuationDate: "2024-01-01" },
      votingThreshold: 5,
      dividendFrequency: "quarterly",
      reinvestmentAllowed: true,
      erc20ConversionRatio: 15,
    },
  },
  {
    name: "Private Debt Token",
    description: "Tokenized loan with interest-bearing tranches",
    category: "Private Debt",
    standard: "ERC-3525",
    defaultBlocks: { compliance: ["Whitelist", "Jurisdiction Restrictions"], features: ["Tranches", "Interest Rate"], governance: ["Issuer Control"] },
    icon: <span className="text-orange-500">📜</span>,
    defaultMetadata: {
      totalSupply: 1000000,
      tranches: [{ id: 1, name: "Loan", value: 1000000, interestRate: 5 }],
      maturityDate: new Date(new Date().setFullYear(new Date().getFullYear() + 3)).toISOString().split("T")[0],
      whitelistEnabled: true,
      jurisdictionRestrictions: ["US"],
      erc20ConversionRatio: 8,
    },
  },
  {
    name: "Real Estate Token",
    description: "Token representing fractional ownership of real estate",
    category: "Real Estate",
    standard: "ERC-1155",
    defaultBlocks: { compliance: ["KYC", "AML"], features: ["Fractional Shares", "Transfer Restrictions"], governance: ["Issuer Control"] },
    icon: <span className="text-teal-500">🏠</span>,
    defaultMetadata: { numberOfFractions: 100 },
  },
  {
    name: "Energy Token",
    description: "Token representing energy units or credits",
    category: "Energy",
    standard: "ERC-1155",
    defaultBlocks: { compliance: ["Whitelist", "Regulatory Compliance"], features: ["Transfer Restrictions"], governance: ["Issuer Control"] },
    icon: <span className="text-lime-500">⚡</span>,
    defaultMetadata: { totalSupply: 10000, energyType: "Solar", whitelistEnabled: true, erc20ConversionRatio: 2 },
  },
  {
    name: "Infrastructure Token",
    description: "Token representing investment in infrastructure projects",
    category: "Infrastructure",
    standard: "ERC-3525",
    defaultBlocks: { compliance: ["Whitelist", "Jurisdiction Restrictions"], features: ["Tranches", "Revenue Sharing"], governance: ["Issuer Control"] },
    icon: <span className="text-gray-500">🏗️</span>,
    defaultMetadata: {
      totalSupply: 5000,
      tranches: [{ id: 1, name: "Construction", value: 3000, interestRate: 0 }, { id: 2, name: "Operation", value: 2000, interestRate: 0 }],
      whitelistEnabled: true,
      erc20ConversionRatio: 12,
    },
  },
  {
    name: "Collectible Token",
    description: "Token representing unique or fractional collectibles",
    category: "Collectibles & all other assets",
    standard: "ERC-721",
    defaultBlocks: { compliance: ["Whitelist", "Transfer Restrictions"], features: ["Fractional Shares"], governance: ["Issuer Control"] },
    icon: <span className="text-pink-500">🎨</span>,
    defaultMetadata: { description: "A unique collectible item", numberOfFractions: 100, whitelistEnabled: true, erc20ConversionRatio: 50 },
  },
  {
    name: "Digital Tokenised Fund",
    description: "Yield-bearing tokenized fund with structured shares",
    category: "Digital Tokenised Fund",
    standard: "ERC-4626",
    defaultBlocks: { compliance: ["KYC", "Whitelist"], features: ["Yield Strategy", "NAV Calculation"], governance: ["Issuer Control"] },
    icon: <span className="text-indigo-500">🌐</span>,
    defaultMetadata: { underlyingAsset: "ETH", yieldStrategy: "DeFi Pools" },
  },
];