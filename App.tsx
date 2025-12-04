import React, { useState } from 'react';
import { ShieldCheck, LayoutDashboard, Calculator as CalcIcon, FileText } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';

enum View {
  DASHBOARD = 'Dashboard',
  CALCULATOR = 'Scorecard Calculator',
  REPORT = 'Model Report'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.CALCULATOR);

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 fixed h-full z-10 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-primary-500 p-2 rounded-lg">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Credit Risk Scorecard</span>
        </div>
        
        <nav className="p-4 space-y-2 flex-1">
          <button 
            onClick={() => setCurrentView(View.DASHBOARD)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === View.DASHBOARD ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button 
             onClick={() => setCurrentView(View.CALCULATOR)}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === View.CALCULATOR ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <CalcIcon size={20} />
            <span className="font-medium">Calculator</span>
          </button>

          <button 
             onClick={() => setCurrentView(View.REPORT)}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === View.REPORT ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <FileText size={20} />
            <span className="font-medium">Model Report</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400">
            <p className="font-semibold text-slate-300 mb-1">Model Version: v2.5.1</p>
            <p>Last Trained: Oct 2023</p>
            <p className="mt-2 text-primary-400">Powered by Gemini</p>
          </div>
        </div>
      </aside>

      {/* Mobile Nav Overlay (simplified) */}
      <div className="md:hidden fixed bottom-0 w-full bg-slate-900 text-white z-50 flex justify-around p-3 border-t border-slate-800">
        <button onClick={() => setCurrentView(View.DASHBOARD)} className="p-2 flex flex-col items-center">
          <LayoutDashboard size={20} className={currentView === View.DASHBOARD ? 'text-primary-400' : 'text-slate-400'} />
          <span className="text-[10px] mt-1">Dashboard</span>
        </button>
        <button onClick={() => setCurrentView(View.CALCULATOR)} className="p-2 flex flex-col items-center">
          <CalcIcon size={20} className={currentView === View.CALCULATOR ? 'text-primary-400' : 'text-slate-400'} />
           <span className="text-[10px] mt-1">Calc</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        <header className="mb-8">
           <h1 className="text-3xl font-bold text-slate-900">{currentView}</h1>
           <p className="text-slate-500 mt-1">
             {currentView === View.DASHBOARD && 'Portfolio performance and risk distribution metrics.'}
             {currentView === View.CALCULATOR && 'Real-time credit scoring and AI risk assessment.'}
             {currentView === View.REPORT && 'Technical documentation and validation metrics.'}
           </p>
        </header>

        <div className="max-w-6xl mx-auto">
          {currentView === View.DASHBOARD && <Dashboard />}
          {currentView === View.CALCULATOR && <Calculator />}
          
          {currentView === View.REPORT && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
              <h3>Model Methodology</h3>
              <p>This Credit Risk Scorecard was built using Logistic Regression on the LendingClub dataset. The features were selected using Information Value (IV) and transformed using Weight of Evidence (WOE) encoding.</p>
              
              <h4>Score Scaling</h4>
              <p>The Probability of Default (PD) is mapped to a score using the standard formula:</p>
              <pre className="bg-slate-100 p-4 rounded text-sm font-mono">Score = Offset + Factor * ln(Odds)</pre>
              <ul>
                <li><strong>Target:</strong> 600 points at 50:1 Odds</li>
                <li><strong>PDO:</strong> 20 points (Points to Double the Odds)</li>
              </ul>

              <h4>Risk Segmentation</h4>
              <ul>
                <li><span className="text-emerald-600 font-bold">Low Risk:</span> Score &ge; 700</li>
                <li><span className="text-amber-600 font-bold">Medium Risk:</span> 600 &le; Score &lt; 700</li>
                <li><span className="text-red-600 font-bold">High Risk:</span> Score &lt; 600</li>
              </ul>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                <p className="font-bold text-blue-800 m-0">Python Pipeline</p>
                <p className="text-blue-700 m-0 text-sm">The preprocessing pipeline handles missing values via median imputation and caps outliers at the 99th percentile. Class imbalance was addressed using SMOTE (Synthetic Minority Over-sampling Technique) on the training set.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;