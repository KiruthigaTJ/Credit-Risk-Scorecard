export enum RiskTier {
  LOW = 'Low Risk',
  MEDIUM = 'Medium Risk',
  HIGH = 'High Risk'
}

export enum HomeOwnership {
  RENT = 'RENT',
  MORTGAGE = 'MORTGAGE',
  OWN = 'OWN',
  OTHER = 'OTHER'
}

export enum LoanPurpose {
  DEBT_CONSOLIDATION = 'Debt Consolidation',
  CREDIT_CARD = 'Credit Card',
  HOME_IMPROVEMENT = 'Home Improvement',
  MAJOR_PURCHASE = 'Major Purchase',
  SMALL_BUSINESS = 'Small Business',
  OTHER = 'Other'
}

export interface Applicant {
  id?: string;
  age: number;
  annualIncome: number;
  loanAmount: number;
  homeOwnership: HomeOwnership;
  employmentLength: number; // in years
  loanPurpose: LoanPurpose;
  dti: number; // Debt to Income ratio
  delinq2yrs: number; // Delinquencies in last 2 years
}

export interface ScorecardResult {
  score: number;
  pd: number; // Probability of Default
  tier: RiskTier;
  factors: {
    name: string;
    value: string | number;
    points: number;
    woe: number;
  }[];
}

export interface Bin {
  min: number;
  max: number;
  points: number;
  woe: number;
  label?: string;
}

export interface CategoricalBin {
  value: string;
  points: number;
  woe: number;
}
