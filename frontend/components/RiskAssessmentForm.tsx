import React, { useState } from 'react';

interface RiskAssessmentFormProps {
  onSubmit: (data: RiskAssessmentData) => void;
  loading: boolean;
  error: string | null;
}

interface RiskAssessmentData {
  // Step 1: Personal Details
  age: number;
  gender: string;
  marital_status: string;
  employment_status: string;
  is_retired: boolean;
  region: string;
  is_immigrant: boolean;
  // Step 2: Financial Profile
  income: number;
  assets: number;
  liabilities: number;
  expenses: number;
  credit_score: number;
  // Step 3: Behavior & Goals
  investment_experience: number;
  risk_tolerance: number;
  market_volatility: number;
  industry_risk: number;
  economic_outlook: number;
  dependents: number;
  education_level: string;
  primary_goal: string;
}

interface RiskAssessmentFormState {
  age: string | number;
  gender: string;
  marital_status: string;
  employment_status: string;
  is_retired: boolean;
  region: string;
  is_immigrant: boolean;
  income: string | number;
  assets: string | number;
  liabilities: string | number;
  expenses: string | number;
  credit_score: string | number;
  investment_experience: string | number;
  risk_tolerance: string | number;
  market_volatility: string | number;
  industry_risk: string | number;
  economic_outlook: string | number;
  dependents: string | number;
  education_level: string;
  primary_goal: string;
}

const initialState: RiskAssessmentFormState = {
  // Step 1: Personal Details
  age: '',
  gender: '',
  marital_status: '',
  employment_status: '',
  is_retired: false,
  region: '',
  is_immigrant: false,
  // Step 2: Financial Profile
  income: '',
  assets: '',
  liabilities: '',
  expenses: '',
  credit_score: '',
  // Step 3: Behavior & Goals
  investment_experience: 5,
  risk_tolerance: 5,
  market_volatility: 0,
  industry_risk: 0,
  economic_outlook: 0,
  dependents: '',
  education_level: '',
  primary_goal: '',
};

const steps = ['Personal Details', 'Financial Profile', 'Behavior & Goals'];

export default function RiskAssessmentForm({
  onSubmit,
  loading,
  error,
}: RiskAssessmentFormProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RiskAssessmentFormState>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      age: Number(form.age),
      income: Number(form.income),
      assets: Number(form.assets),
      liabilities: Number(form.liabilities),
      expenses: Number(form.expenses),
      credit_score: Number(form.credit_score),
      investment_experience: Number(form.investment_experience),
      risk_tolerance: Number(form.risk_tolerance),
      market_volatility: Number(form.market_volatility),
      industry_risk: Number(form.industry_risk),
      economic_outlook: Number(form.economic_outlook),
      dependents: Number(form.dependents),
      is_retired: Boolean(form.is_retired),
      is_immigrant: Boolean(form.is_immigrant),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-premium border border-gray-100 p-10 w-full max-w-xl mx-auto transform transition-all duration-500 hover:shadow-xl"
    >
      <div className="mb-10 text-center">
        <div className="inline-block px-4 py-1.5 bg-mechanica-moonlight-blue/5 border border-mechanica-moonlight-blue/10 rounded-full mb-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-mechanica-moonlight-blue">
            Assembly Phase {step + 1} of {steps.length}
          </span>
        </div>
        <h3 className="text-2xl font-extrabold text-mechanica-moonlight-blue font-serif">
          {steps[step]}
        </h3>
      </div>
      {step === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block ml-1">
              Age Source
            </label>
            <input
              name="age"
              type="number"
              min="18"
              max="100"
              placeholder="Enter age"
              value={form.age}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mechanica-moonlight-blue/20 focus:border-mechanica-moonlight-blue outline-none transition-all font-mono text-gray-700"
              required
            />
          </div>
          <div className="relative">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block ml-1">
              Gender Identification
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mechanica-moonlight-blue/20 focus:border-mechanica-moonlight-blue outline-none transition-all font-medium text-gray-700 appearance-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="unspecified">Prefer not to say</option>
            </select>
          </div>
          <div className="relative">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block ml-1">
              Marital Status
            </label>
            <select
              name="marital_status"
              value={form.marital_status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mechanica-moonlight-blue/20 focus:border-mechanica-moonlight-blue outline-none transition-all font-medium text-gray-700 appearance-none"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>
          <div className="relative">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block ml-1">
              Employment Type
            </label>
            <select
              name="employment_status"
              value={form.employment_status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mechanica-moonlight-blue/20 focus:border-mechanica-moonlight-blue outline-none transition-all font-medium text-gray-700 appearance-none"
              required
            >
              <option value="">Select Employment</option>
              <option value="employed">Employed</option>
              <option value="unemployed">Unemployed</option>
              <option value="student">Student</option>
              <option value="retired">Retired</option>
            </select>
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col space-y-4 pt-2">
            <label className="flex items-center group cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  name="is_retired"
                  checked={form.is_retired}
                  onChange={handleChange}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:bg-mechanica-moonlight-blue checked:border-mechanica-moonlight-blue"
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </div>
              <span className="ml-3 text-sm font-semibold text-gray-600 group-hover:text-mechanica-moonlight-blue transition-colors uppercase tracking-widest">
                Permanent Retirement Mode
              </span>
            </label>
            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block ml-1">
                Global Region of Origin
              </label>
              <input
                name="region"
                type="text"
                placeholder="e.g. North America, European Union"
                value={form.region}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mechanica-moonlight-blue/20 focus:border-mechanica-moonlight-blue outline-none transition-all font-medium text-gray-700"
                required
              />
            </div>
            <label className="flex items-center group cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  name="is_immigrant"
                  checked={form.is_immigrant}
                  onChange={handleChange}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:bg-mechanica-moonlight-blue checked:border-mechanica-moonlight-blue"
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </div>
              <span className="ml-3 text-sm font-semibold text-gray-600 group-hover:text-mechanica-moonlight-blue transition-colors uppercase tracking-widest">
                Inter-Region Compliance Status
              </span>
            </label>
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="space-y-4">
          <input
            name="income"
            type="number"
            min="0"
            placeholder="Annual Income (USD)"
            value={form.income}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="assets"
            type="number"
            min="0"
            placeholder="Total Assets (USD)"
            value={form.assets}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="liabilities"
            type="number"
            min="0"
            placeholder="Total Liabilities (USD)"
            value={form.liabilities}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="expenses"
            type="number"
            min="0"
            placeholder="Annual Expenses (USD)"
            value={form.expenses}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="credit_score"
            type="number"
            min="300"
            max="900"
            placeholder="Credit Score"
            value={form.credit_score}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <label className="block">
            Investment Experience (1-10)
            <input
              name="investment_experience"
              type="range"
              min="1"
              max="10"
              value={form.investment_experience}
              onChange={handleChange}
              className="w-full"
            />
            <span className="ml-2">{form.investment_experience}</span>
          </label>
          <label className="block">
            Risk Tolerance (1-10)
            <input
              name="risk_tolerance"
              type="range"
              min="1"
              max="10"
              value={form.risk_tolerance}
              onChange={handleChange}
              className="w-full"
            />
            <span className="ml-2">{form.risk_tolerance}</span>
          </label>
          <label className="block">
            Market Volatility Perception (-10 to 10)
            <input
              name="market_volatility"
              type="range"
              min="-10"
              max="10"
              value={form.market_volatility}
              onChange={handleChange}
              className="w-full"
            />
            <span className="ml-2">{form.market_volatility}</span>
          </label>
          <label className="block">
            Industry Risk Perception (-10 to 10)
            <input
              name="industry_risk"
              type="range"
              min="-10"
              max="10"
              value={form.industry_risk}
              onChange={handleChange}
              className="w-full"
            />
            <span className="ml-2">{form.industry_risk}</span>
          </label>
          <label className="block">
            Economic Outlook (-10 to 10)
            <input
              name="economic_outlook"
              type="range"
              min="-10"
              max="10"
              value={form.economic_outlook}
              onChange={handleChange}
              className="w-full"
            />
            <span className="ml-2">{form.economic_outlook}</span>
          </label>
          <input
            name="dependents"
            type="number"
            min="0"
            placeholder="Number of Dependents"
            value={form.dependents}
            onChange={handleChange}
            className="input"
            required
          />
          <select
            name="education_level"
            value={form.education_level}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Education Level</option>
            <option value="high_school">High School</option>
            <option value="bachelor">Bachelor&apos;s</option>
            <option value="master">Master&apos;s</option>
            <option value="doctorate">Doctorate</option>
            <option value="other">Other</option>
          </select>
          <select
            name="primary_goal"
            value={form.primary_goal}
            onChange={handleChange}
            className="input"
          >
            <option value="">Primary Financial Goal</option>
            <option value="retirement">Retirement</option>
            <option value="income">Income</option>
            <option value="growth">Growth</option>
            <option value="preservation">Preservation</option>
          </select>
        </div>
      )}
      <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100">
        {step > 0 ? (
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2.5 bg-gray-100 text-gray-500 font-bold rounded-xl hover:bg-gray-200 transition-all uppercase tracking-[0.2em] text-xs"
          >
            &lt; Previous Component
          </button>
        ) : (
          <div />
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-8 py-3 bg-mechanica-moonlight-blue text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all uppercase tracking-[0.2em] text-xs"
          >
            Next Component &gt;
          </button>
        ) : (
          <button
            type="submit"
            className="px-10 py-3 bg-yellow-500 text-mechanica-moonlight-blue font-extrabold rounded-xl shadow-lg hover:bg-yellow-400 hover:shadow-xl hover:-translate-y-0.5 transition-all uppercase tracking-[0.2em] text-sm"
            disabled={loading}
          >
            {loading ? 'Initializing...' : 'Deploy Assessment'}
          </button>
        )}
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </form>
  );
}
