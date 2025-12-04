import React, { useState } from 'react';
import { HomeOwnership, LoanPurpose, Applicant, ScorecardResult, RiskTier } from '../types';
import { calculateCreditScore } from '../services/scorecardService';
import { analyzeRiskWithGemini } from '../services/geminiService';
import { AlertCircle, CheckCircle, XCircle, BrainCircuit, Loader2 } from 'lucide-react';

const Calculator: React.FC = () => {
  const [formData, setFormData] = useState<Applicant>({
    age: 30,
    annualIncome: 55000,
    loanAmount: 10000,
    homeOwnership: HomeOwnership.RENT,
    employmentLength: 2,
    loanPurpose: LoanPurpose.DEBT_CONSOLIDATION,
    dti: 15,
    delinq2yrs: 0
  });

  const [result, setResult] = useState<ScorecardResult | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'homeOwnership' || name === 'loanPurpose' ? value : Number(value)
    }));
  };

  const handleCalculate = () => {
    const scoreResult = calculateCreditScore(formData);
    setResult(scoreResult);
    setAiAnalysis(null); // Reset AI analysis on new calculation
  };

  const handleAiAnalyze = async () => {
    if (!result) return;
    setLoadingAi(true);
    const analysis = await analyzeRiskWithGemini(formData, result);
    setAiAnalysis(analysis);
    setLoadingAi(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 700) return 'text-emerald-600';
    if (score >= 600) return 'text-amber-500';
    return 'text-red-600';
  };

  const getTierBadge = (tier: RiskTier) => {
    switch (tier) {
      case RiskTier.LOW: return <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold flex items-center gap-2"><CheckCircle size={16}/> Low Risk</span>;
      case RiskTier.MEDIUM: return <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold flex items-center gap-2"><AlertCircle size={16}/> Medium Risk</span>;
      case RiskTier.HIGH: return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold flex items-center gap-2"><XCircle size={16}/> High Risk</span>;
    }
  };

  const inputClasses = "w-full p-2 bg-sky-50 border border-sky-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all shadow-sm";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Applicant Details</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Annual Income (₹)</label>
              <input type="number" name="annualIncome" value={formData.annualIncome} onChange={handleChange} className={inputClasses} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Employment (Years)</label>
              <input type="number" name="employmentLength" value={formData.employmentLength} onChange={handleChange} className={inputClasses} />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">DTI Ratio (%)</label>
              <input type="number" name="dti" value={formData.dti} onChange={handleChange} className={inputClasses} />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-600 mb-1">Loan Amount (₹)</label>
             <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} className={inputClasses} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Home Ownership</label>
              <select name="homeOwnership" value={formData.homeOwnership} onChange={handleChange} className={inputClasses}>
                {Object.values(HomeOwnership).map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Delinquencies (2yrs)</label>
              <input type="number" name="delinq2yrs" value={formData.delinq2yrs} onChange={handleChange} className={inputClasses} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Loan Purpose</label>
            <select name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} className={inputClasses}>
              {Object.values(LoanPurpose).map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <button 
            onClick={handleCalculate}
            className="w-full mt-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Calculate Score
          </button>
        </div>
      </div>

      {/* Results Panel */}
      <div className="space-y-6">
        {result ? (
          <>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-slate-800">Scorecard Result</h2>
                {getTierBadge(result.tier)}
              </div>
              
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className={`text-6xl font-bold ${getScoreColor(result.score)}`}>{result.score}</div>
                  <div className="text-slate-500 text-sm mt-2">Credit Score</div>
                </div>
                <div className="ml-12 border-l pl-12 text-center">
                   <div className="text-3xl font-semibold text-slate-700">{(result.pd * 100).toFixed(2)}%</div>
                   <div className="text-slate-500 text-sm mt-2">Est. Probability of Default</div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-slate-600 mb-3">Key Score Factors</h3>
                <div className="space-y-2">
                  {result.factors.map((f, i) => (
                    <div key={i} className="flex justify-between text-sm p-2 bg-slate-50 rounded">
                      <span className="text-slate-700">{f.name} <span className="text-slate-400">({f.value})</span></span>
                      <span className={`font-mono font-medium ${f.points >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {f.points > 0 ? '+' : ''}{f.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {!aiAnalysis && (
                <button 
                  onClick={handleAiAnalyze}
                  disabled={loadingAi}
                  className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  {loadingAi ? <Loader2 className="animate-spin" /> : <BrainCircuit />} 
                  Analyze with Gemini AI
                </button>
              )}
            </div>

            {aiAnalysis && (
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                 <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                   <BrainCircuit className="text-purple-600" /> AI Underwriter Opinion
                 </h3>
                 <div className="prose prose-sm text-slate-600 max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{aiAnalysis}</pre>
                 </div>
               </div>
            )}
          </>
        ) : (
          <div className="h-full bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-12">
            <div className="text-4xl mb-4">📊</div>
            <p>Enter applicant details to generate a scorecard.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;