/**
 * Proposal fields that gets loaded/rendered in the frontend
 */
export interface IProposal {
  firstName: string;
  lastName: string;
  title: string;
  summary: string;
  tokensRequested: string;
  github?: string;
  referral?: string;
  category: string;
  createdAt?: any;
  id: number;
  website?: string;
  organization?: string;
  recommendation?: string;
  projectPlan?: string;
  projectTimeline?: string;
  teamBackgrounds?: string;
  totalBudget?: string;
  otherFunding?: string;
  awardAddress: string;
}

/**
 * Public proposal metadata that gets saved to IPFS
 */
export interface IGrantProposalMetadata {
  firstName: string;
  lastName: string;
  title: string;
  summary: string;
  tokensRequested: string;
  github?: string;
  id: number;
  website?: string;
  organization?: string;
  recommendation?: string;
  projectPlan?: string;
  projectTimeline?: string;
  teamBackgrounds?: string;
  otherFunding?: string;
  awardAddress: string;
}

export interface IParameterChangesObject {
  [key: string]: {
    oldValue: any;
    newValue: any;
    type: any;
    key: any;
  };
}

// Rendered in the frontend
export interface IGovernanceProposal {
  parameterChanges: {
    oldValue: any;
    newValue: any;
    type: any;
    key: any;
  }
}

// Saved to IPFS
export interface IGovernanceProposalMetadata {
  firstName: string;
  lastName?: string;
  summary: string;
  organization?: string;
  parameterChanges: IParameterChangesObject;
}

export interface IGovernanceProposalInfo {
  metadatas: IGovernanceProposalMetadata[];
  multihashes: Buffer[];
}

export interface IGrantProposalInfo {
  metadatas: IGrantProposalMetadata[];
  multihashes: Buffer[];
}
