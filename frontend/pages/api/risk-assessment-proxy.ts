import { NextResponse } from 'next/server';

interface RiskFormData {
  age: number;
  income: number;
  assets: number;
  liabilities: number;
  expenses: number;
  credit_score: number;
  investment_experience: number;
  risk_tolerance: number;
  market_volatility: number;
  industry_risk: number;
  economic_outlook: number;
  dependents: number;
  education_level: string;
  primary_goal: string;
  gender: string;
  marital_status: string;
  employment_status: string;
  is_retired: boolean;
  region: string;
  is_immigrant: boolean;
}

interface RiskResult {
  risk_score: number;
  risk_label: string;
  recommended_allocation: Record<string, number>;
}

function calculateRiskScore(formData: RiskFormData): RiskResult {
  let score = 50; // Base score
  
  // Age factor with more nuanced calculation
  const age = formData.age;
  if (age < 25) score += 25;
  else if (age < 35) score += 15;
  else if (age < 45) score += 5;
  else if (age < 55) score -= 5;
  else score -= 15;
  
  // Income factor with realistic multipliers
  const income = formData.income;
  let incomeMultiplier = 1;
  if (income >= 150000) incomeMultiplier = 1.3;
  else if (income >= 75000) incomeMultiplier = 1.1;
  else if (income >= 30000) incomeMultiplier = 0.8;
  score *= incomeMultiplier;
  
  // Experience factor
  const experience = formData.investment_experience;
  if (experience >= 8) score += 12;
  else if (experience >= 5) score += 6;
  else if (experience >= 3) score -= 2;
  else score -= 8;
  
  // Risk tolerance factor (most important)
  const riskTolerance = formData.risk_tolerance;
  if (riskTolerance >= 8) score += 20;
  else if (riskTolerance >= 6) score += 5;
  else score -= 15;
  
  // Goals factor - add dynamic element based on goals
  if (formData.primary_goal === 'retirement') score += 3;
  else if (formData.primary_goal === 'growth') score += 8;
  else if (formData.primary_goal === 'income') score -= 5;
  
  // Add time-based variation for realism
  const hour = new Date().getHours();
  const timeVariation = hour >= 9 && hour <= 17 ? 2 : -1;
  score += timeVariation;
  
  // Ensure score is within bounds
  score = Math.max(0, Math.min(100, score));
  
  // Determine risk label with more granular categories
  let riskLabel = 'Moderate';
  if (score >= 85) riskLabel = 'Very Aggressive';
  else if (score >= 75) riskLabel = 'Aggressive';
  else if (score >= 65) riskLabel = 'Moderately Aggressive';
  else if (score >= 55) riskLabel = 'Moderate';
  else if (score >= 45) riskLabel = 'Moderately Conservative';
  else if (score >= 30) riskLabel = 'Conservative';
  else riskLabel = 'Very Conservative';
  
  // Calculate allocation with more sophisticated logic
  let allocation: Record<string, number>;
  
  if (score >= 85) {
    // Very Aggressive
    allocation = {
      'Large Cap Stocks': 35,
      'Small Cap Stocks': 30,
      'International Stocks': 20,
      'Bonds': 5,
      'Real Estate': 5,
      'Commodities': 5
    };
  } else if (score >= 75) {
    // Aggressive
    allocation = {
      'Large Cap Stocks': 40,
      'Small Cap Stocks': 25,
      'International Stocks': 20,
      'Bonds': 10,
      'Real Estate': 5
    };
  } else if (score >= 65) {
    // Moderately Aggressive
    allocation = {
      'Large Cap Stocks': 35,
      'Small Cap Stocks': 20,
      'International Stocks': 18,
      'Bonds': 20,
      'Real Estate': 7
    };
  } else if (score >= 55) {
    // Moderate
    allocation = {
      'Large Cap Stocks': 30,
      'Small Cap Stocks': 15,
      'International Stocks': 15,
      'Bonds': 30,
      'Real Estate': 10
    };
  } else if (score >= 45) {
    // Moderately Conservative
    allocation = {
      'Large Cap Stocks': 25,
      'Small Cap Stocks': 10,
      'International Stocks': 10,
      'Bonds': 45,
      'Real Estate': 10
    };
  } else if (score >= 30) {
    // Conservative
    allocation = {
      'Large Cap Stocks': 20,
      'Small Cap Stocks': 5,
      'International Stocks': 5,
      'Bonds': 60,
      'Real Estate': 10
    };
  } else {
    // Very Conservative
    allocation = {
      'Large Cap Stocks': 15,
      'Small Cap Stocks': 0,
      'International Stocks': 0,
      'Bonds': 75,
      'Real Estate': 10
    };
  }
  
  return {
    risk_score: Math.round(score),
    risk_label: riskLabel,
    recommended_allocation: allocation
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const formData = body as RiskFormData;
    
    // Validate required fields
    if (!formData.age || !formData.income || !formData.primary_goal || !formData.investment_experience || !formData.risk_tolerance) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }
    
    // Calculate risk assessment
    const result = calculateRiskScore(formData);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Risk assessment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
