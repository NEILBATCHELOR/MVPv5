// src/types/buildingBlocks.ts

export interface BuildingBlock {
  id: string;
  name: string;
  description: string;
}

export interface BuildingBlocks {
  compliance: BuildingBlock[];
  features: BuildingBlock[];
  governance: BuildingBlock[];
}

export const BUILDING_BLOCKS: BuildingBlocks = {
  compliance: [
    { id: "kyc", name: "KYC", description: "Know Your Customer verification" },
    { id: "aml", name: "AML", description: "Anti-Money Laundering checks" },
    { id: "accredited", name: "Accredited Investors Only", description: "Restrict to accredited/qualified investors" },
    { id: "jurisdiction", name: "Jurisdiction Restrictions", description: "Restrict based on investor jurisdiction" },
    { id: "max_investors", name: "Maximum Investors", description: "Limit the total number of investors" },
    { id: "whitelist", name: "Whitelist", description: "Restrict to pre-approved wallet addresses" },
    { id: "lockup", name: "Lockup Period", description: "Enforce a period during which tokens cannot be transferred" },
  ],
  features: [
    { id: "voting", name: "Voting", description: "Enable governance voting rights" },
    { id: "dividends", name: "Dividends", description: "Enable dividend/distribution payments" },
    { id: "transfer_restrictions", name: "Transfer Restrictions", description: "Restrict token transfers based on rules" },
    { id: "redemption", name: "Redemption Rights", description: "Allow token redemption under specific conditions" },
    { id: "vesting", name: "Vesting Schedule", description: "Implement token vesting schedules" },
    { id: "mintable", name: "Mintable", description: "Allow creation of new tokens" },
    { id: "burnable", name: "Burnable", description: "Allow tokens to be destroyed" },
    { id: "pausable", name: "Pausable", description: "Enable emergency stop functionality" },
    { id: "tranches", name: "Tranches", description: "Support multiple token classes or slots" },
    { id: "interest_rate", name: "Interest Rate", description: "Enable yield-bearing interest payments" },
    { id: "fractional_shares", name: "Fractional Shares", description: "Allow fractional ownership of assets" },
    { id: "deposit_limits", name: "Deposit Limits", description: "Set minimum and maximum deposit amounts" },
    { id: "yield_strategy", name: "Yield Strategy", description: "Define strategy for generating yield" },
    { id: "nav_calculation", name: "NAV Calculation", description: "Enable Net Asset Value calculation" },
    { id: "revenue_sharing", name: "Revenue Sharing", description: "Distribute profits among token holders" },
  ],
  governance: [
    { id: "issuer_control", name: "Issuer Control", description: "Issuer maintains full control over token" },
    { id: "board_approval", name: "Board Approval", description: "Require board approval for certain actions" },
    { id: "dao", name: "DAO Governance", description: "Decentralized Autonomous Organization governance" },
    { id: "multi_sig", name: "Multi-Signature", description: "Require multiple signatures for key actions" },
  ],
};