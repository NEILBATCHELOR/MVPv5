// src/store/tokenSlice.ts
import { StateCreator } from "zustand";
import { TokenForm } from "../types/tokenTypes";

const initialTokenForm: TokenForm = {
  name: "",
  symbol: "",
  decimals: 18,
  standard: "ERC-20",
  totalSupply: 1000000,
  blocks: { compliance: [], features: [], governance: [] },
  metadata: {
    description: "",
    category: "",
    product: "",
    issuanceDate: "",
    maturityDate: "",
    tranches: [],
    whitelistEnabled: true,
    jurisdictionRestrictions: [],
    conversionRate: 0,
    underlyingAsset: "ETH",
    yieldStrategy: "STAKING",
    minDeposit: "1000",
    maxDeposit: "1000000",
    redemptionNoticeDays: "30",
    managementFee: "2.0",
    navOracleEnabled: false,
    erc20ConversionRate: "1.0",
    ownerWallet: "",
    kycRequired: false,
    multiClassEnabled: false,
    erc20Conversion: false,
    valuationSchedule: {
      frequency: "quarterly",
      method: "dcf",
      nextValuationDate: new Date().toISOString().split("T")[0],
    },
    lockupPeriod: undefined,
    erc20ConversionRatio: 15,
    dividendFrequency: "quarterly",
    reinvestmentAllowed: false,
    minimumInvestment: undefined,
    votingThreshold: 5,
    issuerWallet: "",
    callableAfter: undefined,
    puttableAfter: undefined,
    totalSupply: undefined,
    peggedAsset: "",
    numberOfFractions: undefined,
    securityType: "",
    issuerName: "",
    slotDescription: "",
    valueUnit: "",
    allowsValueTransfer: true,
    redeemableValue: false,
    expiration: false,
    deposit: true,
    withdraw: true,
    convertToShares: true,
    convertToAssets: true,
    maxWithdraw: true,
    totalAssets: "0",
    performanceFee: "20.0",
  },
};

export interface TokenState {
  tokenForm: TokenForm;
  setTokenForm: (form: Partial<TokenForm>) => void;
  resetTokenForm: () => void;
}

export const tokenSlice: StateCreator<TokenState> = (set, get) => ({
  tokenForm: initialTokenForm,
  setTokenForm: (form: Partial<TokenForm>) =>
    set((state) => ({ tokenForm: { ...state.tokenForm, ...form } })),
  resetTokenForm: () => set({ tokenForm: initialTokenForm }),
});