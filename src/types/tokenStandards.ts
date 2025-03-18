// src/types/tokenStandards.ts

export interface TokenStandard {
  value: string;
  label: string;
  description: string;
  mandatoryFunctions: string[];
  optionalFunctions: string[];
  configOptions: string[];
}

export const TOKEN_STANDARDS: TokenStandard[] = [
  {
    value: "ERC-20",
    label: "ERC-20 (Fungible Token)",
    description: "Standard for fungible tokens where each token is identical and interchangeable, ideal for currencies or commodities.",
    mandatoryFunctions: [
      "totalSupply()",
      "balanceOf(address)",
      "transfer(address,uint256)",
      "transferFrom(address,address,uint256)",
      "approve(address,uint256)",
      "allowance(address,address)",
    ],
    optionalFunctions: ["name()", "symbol()", "decimals()"],
    configOptions: ["Initial Supply", "Minting/Burning", "Pausable", "Access Control"],
  },
  {
    value: "ERC-721",
    label: "ERC-721 (Non-Fungible Token)",
    description: "Standard for unique, non-interchangeable tokens, suitable for collectibles or real estate.",
    mandatoryFunctions: [
      "balanceOf(address)",
      "ownerOf(uint256)",
      "safeTransferFrom(address,address,uint256)",
      "transferFrom(address,address,uint256)",
      "approve(address,uint256)",
      "getApproved(uint256)",
      "setApprovalForAll(address,bool)",
      "isApprovedForAll(address,address)",
    ],
    optionalFunctions: ["name()", "symbol()", "tokenURI(uint256)"],
    configOptions: ["Base URI", "Minting", "Royalties", "Metadata Storage"],
  },
  {
    value: "ERC-1155",
    label: "ERC-1155 (Multi Token)",
    description: "Versatile standard for managing multiple token types (fungible, semi-fungible, or non-fungible).",
    mandatoryFunctions: [
      "balanceOf(address,uint256)",
      "balanceOfBatch(address[],uint256[])",
      "setApprovalForAll(address,bool)",
      "isApprovedForAll(address,address)",
      "safeTransferFrom(address,address,uint256,uint256,bytes)",
      "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)",
    ],
    optionalFunctions: ["uri(uint256)"],
    configOptions: ["URI", "Minting", "Batch Operations", "Supply Tracking"],
  },
  {
    value: "ERC-1400",
    label: "ERC-1400 (Security Token)",
    description: "Standard for security tokens with transfer restrictions and compliance controls.",
    mandatoryFunctions: [
      "getDocument(bytes32)",
      "setDocument(bytes32,string,bytes32)",
      "isControllable()",
      "isIssuable()",
      "canTransferByPartition(bytes32,address,address,uint256,bytes)",
      "transferByPartition(bytes32,address,uint256,bytes)",
    ],
    optionalFunctions: [
      "controllers()",
      "authorizeOperator(address)",
      "revokeOperator(address)",
      "isOperator(address,address)",
    ],
    configOptions: ["Partitions", "Transfer Restrictions", "Document Management", "Compliance Controls"],
  },
  {
    value: "ERC-3525",
    label: "ERC-3525 (Semi-Fungible Token)",
    description: "Standard for semi-fungible tokens with slot-based categorization, ideal for structured products.",
    mandatoryFunctions: [
      "balanceOf(address)",
      "ownerOf(uint256)",
      "transferFrom(address,address,uint256)",
      "slotOf(uint256)",
      "valueDecimals()",
      "valueOf(uint256)",
      "transferValueFrom(uint256,uint256,uint256)",
    ],
    optionalFunctions: ["name()", "symbol()", "slotURI(uint256)"],
    configOptions: ["Slots", "Values", "Decimals", "Tranches"],
  },
  {
    value: "ERC-4626",
    label: "ERC-4626 (Tokenized Vault)",
    description: "Standard for yield-bearing vaults with asset management, suited for funds and ETFs.",
    mandatoryFunctions: [
      "asset()",
      "totalAssets()",
      "convertToShares(uint256)",
      "convertToAssets(uint256)",
      "maxDeposit(address)",
      "previewDeposit(uint256)",
      "deposit(uint256,address)",
      "maxMint(address)",
      "previewMint(uint256)",
      "mint(uint256,address)",
      "maxWithdraw(address)",
      "previewWithdraw(uint256)",
      "withdraw(uint256,address,address)",
      "maxRedeem(address)",
      "previewRedeem(uint256)",
      "redeem(uint256,address,address)",
    ],
    optionalFunctions: [],
    configOptions: ["Underlying Asset", "Yield Strategy", "Deposit/Withdrawal Limits", "Fee Structure"],
  },
  {
    value: "ERC-3643",
    label: "ERC-3643 (Compliance Token)",
    description: "Enhanced compliance standard for regulated assets like private equity, with advanced governance and valuation.",
    mandatoryFunctions: [
      "balanceOf(address)",
      "transfer(address,uint256)",
      "transferFrom(address,address,uint256)",
      "approve(address,uint256)",
      "allowance(address,address)",
      "getDocument(bytes32)",
    ],
    optionalFunctions: [
      "name()",
      "symbol()",
      "decimals()",
      "setDocument(bytes32,string,bytes32)",
      "getController(address)",
    ],
    configOptions: [
      "Valuation Schedule",
      "Voting Thresholds",
      "Dividend Frequency",
      "Lockup Period",
      "Tranches",
      "Multi-Signature",
    ],
  },
];