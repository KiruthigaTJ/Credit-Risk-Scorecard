import { HomeOwnership, LoanPurpose, Bin, CategoricalBin } from './types';

// This simulates the "Trained Model" artifact exported from Python
// Base score typically aligns with a specific odds ratio (e.g., 600 at 50:1)
export const BASE_SCORE = 550; 

export const MODEL_CONFIG = {
  age: [
    { min: 0, max: 25, points: -20, woe: -0.5 },
    { min: 25, max: 35, points: 10, woe: 0.2 },
    { min: 35, max: 50, points: 25, woe: 0.4 },
    { min: 50, max: 150, points: 35, woe: 0.6 },
  ] as Bin[],
  annualIncome: [
    { min: 0, max: 30000, points: -40, woe: -0.8 },
    { min: 30000, max: 60000, points: 0, woe: 0.0 },
    { min: 60000, max: 100000, points: 30, woe: 0.5 },
    { min: 100000, max: 10000000, points: 60, woe: 0.9 },
  ] as Bin[],
  dti: [
    { min: 0, max: 10, points: 40, woe: 0.7 },
    { min: 10, max: 20, points: 20, woe: 0.3 },
    { min: 20, max: 30, points: -10, woe: -0.2 },
    { min: 30, max: 1000, points: -50, woe: -0.9 },
  ] as Bin[],
  employmentLength: [
    { min: 0, max: 2, points: -15, woe: -0.3 },
    { min: 2, max: 5, points: 5, woe: 0.1 },
    { min: 5, max: 10, points: 20, woe: 0.35 },
    { min: 10, max: 100, points: 35, woe: 0.6 },
  ] as Bin[],
  delinq2yrs: [
    { min: 0, max: 0.9, points: 20, woe: 0.4 }, // 0
    { min: 0.9, max: 2, points: -40, woe: -0.8 }, // 1-2
    { min: 2, max: 100, points: -80, woe: -1.5 }, // 2+
  ] as Bin[],
  homeOwnership: [
    { value: HomeOwnership.RENT, points: -15, woe: -0.3 },
    { value: HomeOwnership.MORTGAGE, points: 10, woe: 0.2 },
    { value: HomeOwnership.OWN, points: 30, woe: 0.5 },
    { value: HomeOwnership.OTHER, points: -5, woe: -0.1 },
  ] as CategoricalBin[],
  loanPurpose: [
    { value: LoanPurpose.DEBT_CONSOLIDATION, points: -10, woe: -0.2 },
    { value: LoanPurpose.CREDIT_CARD, points: -5, woe: -0.1 },
    { value: LoanPurpose.HOME_IMPROVEMENT, points: 15, woe: 0.3 },
    { value: LoanPurpose.SMALL_BUSINESS, points: -20, woe: -0.4 },
    { value: LoanPurpose.MAJOR_PURCHASE, points: 10, woe: 0.2 },
    { value: LoanPurpose.OTHER, points: -10, woe: -0.2 },
  ] as CategoricalBin[]
};

// Mock data for Dashboard visualization (EDA)
export const MOCK_PORTFOLIO_DATA = [
  { name: 'G1', score: 720, defaultRate: 0.02, count: 150 },
  { name: 'G2', score: 680, defaultRate: 0.05, count: 220 },
  { name: 'G3', score: 640, defaultRate: 0.09, count: 300 },
  { name: 'G4', score: 600, defaultRate: 0.15, count: 280 },
  { name: 'G5', score: 560, defaultRate: 0.25, count: 180 },
  { name: 'G6', score: 520, defaultRate: 0.40, count: 100 },
];

export const FEATURE_IMPORTANCE_DATA = [
  { name: 'Annual Income', iv: 0.45 },
  { name: 'DTI', iv: 0.38 },
  { name: 'Delinq 2yrs', iv: 0.32 },
  { name: 'Home Ownership', iv: 0.25 },
  { name: 'Emp Length', iv: 0.18 },
  { name: 'Loan Purpose', iv: 0.12 },
  { name: 'Age', iv: 0.08 },
];
