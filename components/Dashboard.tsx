import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_PORTFOLIO_DATA, FEATURE_IMPORTANCE_DATA } from '../constants';

const COLORS = ['#0ea5e9', '#22c55e', '#eab308', '#ef4444'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500">Total Applicants</h3>
          <p className="text-2xl font-bold text-slate-800">1,250</p>
          <span className="text-xs text-emerald-600 font-medium">+12% vs last month</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500">Avg. Credit Score</h3>
          <p className="text-2xl font-bold text-slate-800">645</p>
          <span className="text-xs text-amber-600 font-medium">Medium Risk Avg</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500">Portfolio Default Rate</h3>
          <p className="text-2xl font-bold text-slate-800">4.8%</p>
          <span className="text-xs text-emerald-600 font-medium">-0.5% improvement</span>
        </div>
         <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500">Model Gini Coeff.</h3>
          <p className="text-2xl font-bold text-slate-800">0.42</p>
          <span className="text-xs text-slate-400 font-medium">Validation Set</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Score Distribution & Default Rate */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Score Distribution vs Default Rate (Validation)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_PORTFOLIO_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="count" fill="#0ea5e9" name="Applicant Count" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="defaultRate" fill="#ef4444" name="Default Rate" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center">
            Graph shows inverse relationship: As scores (bins G1-G6) decrease, Default Rate (Red) increases.
          </p>
        </div>

        {/* Feature Importance (IV) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Information Value (Feature Importance)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart layout="vertical" data={FEATURE_IMPORTANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false}/>
                <XAxis type="number" domain={[0, 0.6]} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="iv" fill="#6366f1" radius={[0, 4, 4, 0]} name="Information Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-slate-500">
            <p><strong>Strong Predictors (IV &gt; 0.3):</strong> Annual Income, DTI, Delinquencies.</p>
            <p><strong>Medium Predictors (0.1 &lt; IV &lt; 0.3):</strong> Home Ownership, Emp Length.</p>
          </div>
        </div>
      </div>

       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Model Performance Metrics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="uppercase tracking-wider border-b-2 border-slate-100 bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-600">Metric</th>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-600">Value</th>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-600">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-800">ROC-AUC</td>
                <td className="px-6 py-4 text-emerald-600 font-bold">0.78</td>
                <td className="px-6 py-4 text-slate-600">Good discriminative ability</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-800">KS Statistic</td>
                <td className="px-6 py-4 text-emerald-600 font-bold">45.2</td>
                <td className="px-6 py-4 text-slate-600">Top 3 deciles capture 45% of defaults</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-800">Gini Coefficient</td>
                <td className="px-6 py-4 text-amber-600 font-bold">0.56</td>
                <td className="px-6 py-4 text-slate-600">Acceptable for consumer credit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
