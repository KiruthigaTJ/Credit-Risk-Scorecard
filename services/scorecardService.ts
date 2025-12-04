import { Applicant, ScorecardResult, RiskTier, Bin, CategoricalBin } from '../types';
import { MODEL_CONFIG, BASE_SCORE } from '../constants';

const getBin = (value: number, bins: Bin[]) => {
  return bins.find(b => value >= b.min && value < b.max) || bins[bins.length - 1];
};

const getCatBin = (value: string, bins: CategoricalBin[]) => {
  return bins.find(b => b.value === value) || bins.find(b => b.value === 'Other') || bins[0];
};

export const calculateCreditScore = (applicant: Applicant): ScorecardResult => {
  let totalScore = BASE_SCORE;
  const factors: ScorecardResult['factors'] = [];

  // Age
  const ageBin = getBin(applicant.age, MODEL_CONFIG.age);
  totalScore += ageBin.points;
  factors.push({ name: 'Age', value: applicant.age, points: ageBin.points, woe: ageBin.woe });

  // Income
  const incBin = getBin(applicant.annualIncome, MODEL_CONFIG.annualIncome);
  totalScore += incBin.points;
  factors.push({ name: 'Annual Income', value: `₹${applicant.annualIncome.toLocaleString('en-IN')}`, points: incBin.points, woe: incBin.woe });

  // DTI
  const dtiBin = getBin(applicant.dti, MODEL_CONFIG.dti);
  totalScore += dtiBin.points;
  factors.push({ name: 'DTI Ratio', value: `${applicant.dti}%`, points: dtiBin.points, woe: dtiBin.woe });

  // Employment
  const empBin = getBin(applicant.employmentLength, MODEL_CONFIG.employmentLength);
  totalScore += empBin.points;
  factors.push({ name: 'Emp. Length', value: `${applicant.employmentLength} years`, points: empBin.points, woe: empBin.woe });

  // Delinquency
  const delBin = getBin(applicant.delinq2yrs, MODEL_CONFIG.delinq2yrs);
  totalScore += delBin.points;
  factors.push({ name: 'Delinquencies', value: applicant.delinq2yrs, points: delBin.points, woe: delBin.woe });

  // Home Ownership
  const homeBin = getCatBin(applicant.homeOwnership, MODEL_CONFIG.homeOwnership);
  totalScore += homeBin.points;
  factors.push({ name: 'Home Ownership', value: applicant.homeOwnership, points: homeBin.points, woe: homeBin.woe });

  // Loan Purpose
  const purpBin = getCatBin(applicant.loanPurpose, MODEL_CONFIG.loanPurpose);
  totalScore += purpBin.points;
  factors.push({ name: 'Loan Purpose', value: applicant.loanPurpose, points: purpBin.points, woe: purpBin.woe });

  // Cap Score 300-850
  const finalScore = Math.max(300, Math.min(850, totalScore));

  // Determine Tier
  let tier = RiskTier.HIGH;
  if (finalScore >= 700) tier = RiskTier.LOW;
  else if (finalScore >= 600) tier = RiskTier.MEDIUM;

  // Simple PD estimation (logistic-like inverse of score)
  // This is a simplified proxy for PD = 1 / (1 + e^(score_related_term))
  const pd = Math.max(0.01, Math.min(0.99, 1 - (finalScore / 900))); 

  return {
    score: finalScore,
    pd: parseFloat(pd.toFixed(4)),
    tier,
    factors
  };
};