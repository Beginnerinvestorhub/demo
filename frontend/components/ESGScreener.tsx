import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { MechanicaGear } from './ui/mechanicaGear';

const Bubble = React.lazy(() =>
  import('react-chartjs-2').then(mod => ({ default: mod.Bubble }))
);
const Radar = React.lazy(() =>
  import('react-chartjs-2').then(mod => ({ default: mod.Radar }))
);
const Bar = React.lazy(() =>
  import('react-chartjs-2').then(mod => ({ default: mod.Bar }))
);

import { registerMechanicaCharts, getMechanicaTheme, MECHANICA_COLORS } from '@/utils/mechanicaCharts';

// Register ChartJS once
registerMechanicaCharts();

type ESGData = {
  name: string;
  sector: string;
  esg: number;
  environmental: number;
  social: number;
  governance: number;
  flagged: boolean;
  marketCap: number;
  baseESG?: number;
  baseMarketCap?: number;
};

// Dynamic ESG data generator
const generateDynamicESGData = (): ESGData[] => {
  const baseData = [
    { name: 'Apple Inc.', sector: 'Technology', baseESG: 85, baseMarketCap: 2800 },
    { name: 'Microsoft Corp.', sector: 'Technology', baseESG: 88, baseMarketCap: 2500 },
    { name: 'Tesla Inc.', sector: 'Automotive', baseESG: 72, baseMarketCap: 800 },
    { name: 'Exxon Mobil', sector: 'Energy', baseESG: 45, baseMarketCap: 400 },
    { name: 'Johnson & Johnson', sector: 'Healthcare', baseESG: 78, baseMarketCap: 450 },
    { name: 'Amazon.com Inc.', sector: 'Technology', baseESG: 68, baseMarketCap: 1500 },
    { name: 'Walmart Inc.', sector: 'Retail', baseESG: 75, baseMarketCap: 400 },
    { name: 'BP plc', sector: 'Energy', baseESG: 52, baseMarketCap: 350 },
  ];

  const hour = new Date().getHours();
  const dayMultiplier = hour >= 9 && hour <= 17 ? 1.1 : 0.9;
  const randomVariation = () => (Math.random() - 0.5) * 10; // ±5 variation

  return baseData.map(company => {
    const dynamicESG = Math.max(0, Math.min(100, company.baseESG + randomVariation()));
    const dynamicMarketCap = Math.max(100, company.baseMarketCap * dayMultiplier * (1 + (Math.random() - 0.5) * 0.2));

    // Generate pillar scores that sum to approximately the ESG score
    const environmental = Math.max(0, Math.min(100, dynamicESG + randomVariation()));
    const social = Math.max(0, Math.min(100, dynamicESG + randomVariation()));
    const governance = Math.max(0, Math.min(100, dynamicESG + randomVariation()));

    // Flag companies with low ESG scores
    const flagged = dynamicESG < 60;

    return {
      name: company.name,
      sector: company.sector,
      esg: Math.round(dynamicESG),
      environmental: Math.round(environmental),
      social: Math.round(social),
      governance: Math.round(governance),
      flagged,
      marketCap: Math.round(dynamicMarketCap),
    };
  });
};

const mockESGData = generateDynamicESGData();

export default function ESGScreener() {
  const [data, setData] = useState<ESGData[]>(mockESGData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Persistent Filters using localStorage
  const [sector, setSector] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('esg_sector_filter') || '';
    }
    return '';
  });

  const [threshold, setThreshold] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('esg_threshold_filter')) || 0;
    }
    return 0;
  });

  // Negative screening filters
  const [excludeEnergy, setExcludeEnergy] = useState(false);
  const [excludeAutomotive, setExcludeAutomotive] = useState(false);

  useEffect(() => {
    localStorage.setItem('esg_sector_filter', sector);
  }, [sector]);

  useEffect(() => {
    localStorage.setItem('esg_threshold_filter', threshold.toString());
  }, [threshold]);

  const sectors = Array.from(new Set(data.map(d => d.sector)));

  const filtered = useMemo(() => {
    return data.filter(d => {
      const sectorMatch = sector === '' || d.sector === sector;
      const thresholdMatch = d.esg >= threshold;
      const energyFilter = !excludeEnergy || d.sector !== 'Energy';
      const automotiveFilter = !excludeAutomotive || d.sector !== 'Automotive';

      return sectorMatch && thresholdMatch && energyFilter && automotiveFilter;
    });
  }, [data, sector, threshold, excludeEnergy, excludeAutomotive]);

  const bubbleData = {
    datasets: filtered.map(d => ({
      label: d.name,
      data: [{ x: d.marketCap, y: d.esg, r: 10 }],
      backgroundColor: d.flagged ? '#f43f5e' : '#10b981',
      borderColor: '#6366f1',
      borderWidth: 1,
    })),
  };

  // Radar chart data for ESG pillars (using first company as example)
  const radarData = useMemo(() => {
    if (filtered.length === 0) return null;
    const example = filtered[0];
    return {
      labels: ['Environmental', 'Social', 'Governance'],
      datasets: [{
        label: example.name,
        data: [example.environmental, example.social, example.governance],
        backgroundColor: 'rgba(79, 115, 142, 0.2)',
        borderColor: 'rgba(79, 115, 142, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(79, 115, 142, 1)',
      }],
    };
  }, [filtered]);

  // Bar chart data for industry peer comparison
  const barData = useMemo(() => {
    const sectorAverages = sectors.map(sector => {
      const sectorCompanies = data.filter(d => d.sector === sector);
      const avgESG = sectorCompanies.reduce((sum, d) => sum + d.esg, 0) / sectorCompanies.length;
      return { sector, avgESG };
    });

    return {
      labels: sectorAverages.map(s => s.sector),
      datasets: [{
        label: 'Average ESG Score by Sector',
        data: sectorAverages.map(s => s.avgESG),
        backgroundColor: MECHANICA_COLORS.primary,
        borderColor: MECHANICA_COLORS.accent,
        borderWidth: 1,
      }],
    };
  }, [data, sectors]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
        <div className="relative w-16 h-16 mb-4">
          <MechanicaGear size="lg" color="brass" speed="medium" className="absolute inset-0" />
          <div className="absolute inset-0 bg-yellow-500/10 blur-xl rounded-full scale-150 animate-pulse"></div>
        </div>
        <p className="text-blue-100 font-bold uppercase tracking-widest text-sm">Initializing Integrity Scan...</p>
      </div>
    );
  }

  // Error handling moved inside the main render for better integration

  return (
    <div className="bg-white rounded-3xl shadow-premium border border-gray-100 p-10 w-full max-w-4xl mx-auto overflow-hidden mechanica-hum">
      {/* Decorative Steam Vent */}
      <div className="absolute top-0 right-1/4 w-px h-16 bg-gradient-to-b from-blue-400/20 to-transparent mechanica-steam"></div>

      {error && (
        <div className="mb-10 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-2xl shadow-inner-premium relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform">
            <MechanicaGear size="lg" color="steel" speed="fast" />
          </div>
          <div className="flex items-start relative z-10">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-5 flex-shrink-0 shadow-sm">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-black text-red-900 uppercase tracking-tighter mb-1 mechanica-heading-professional">
                Scanner Interrupted
              </h3>
              <p className="text-red-700 font-medium text-sm italic mb-4 leading-relaxed max-w-2xl">
                {error.includes('Network Error') ? 'Our precision data streams are currently recalibrating. Please verify your connection architecture.' : error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-5 py-2.5 bg-red-600 text-white font-black rounded-xl shadow-lg hover:bg-red-700 hover:scale-105 transition-all uppercase tracking-widest text-[10px]"
              >
                <span className="mr-2">🔄</span>
                Re-Initialize Scan
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-8 mb-10 shadow-inner-premium relative">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Market Component Sector</label>
            <div className="relative">
              <select
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-mechanica-moonlight-blue/10 focus:border-mechanica-moonlight-blue outline-none transition-all font-bold text-gray-700 appearance-none cursor-pointer"
                value={sector}
                onChange={e => setSector(e.target.value)}
              >
                <option value="">All Global Sectors</option>
                {sectors.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Minimum Integrity Score</label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-mechanica-moonlight-blue/10 focus:border-mechanica-moonlight-blue outline-none transition-all font-mono text-xl font-black text-gray-800"
                value={threshold}
                onChange={e => setThreshold(Number(e.target.value))}
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</div>
            </div>
          </div>
        </form>

        {/* Negative Screening Filters */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Negative Screening Filters</h4>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={excludeEnergy}
                onChange={(e) => setExcludeEnergy(e.target.checked)}
                className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Exclude Energy Sector</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={excludeAutomotive}
                onChange={(e) => setExcludeAutomotive(e.target.checked)}
                className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Exclude Automotive Sector</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 flex items-center">
            <span className="w-2 h-2 bg-mechanica-moonlight-blue rounded-full mr-3 animate-pulse"></span>
            ESG Score Bubble Chart
          </h3>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Blueprint Visualizer v2.0</div>
        </div>
        <div className="relative w-full h-[400px] p-4 bg-gray-50/30 rounded-2xl border border-gray-50">
          <Suspense fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-mechanica-moonlight-blue border-t-transparent"></div>
            </div>
          }>
            <Bubble
              data={bubbleData}
              redraw={true}
              options={getMechanicaTheme({
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (ctx: { raw: { x: number; y: number; r: number }; dataset: { label?: string } }) => {
                        const raw = ctx.raw;
                        return ` COMPONENT: ${ctx.dataset.label} | INTEGRITY: ${raw.y}% | CAP: $${raw.x}B`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    title: { display: true, text: 'Market Capitalization ($B)', font: { size: 10, weight: 'bold', family: 'monospace' }, color: '#94a3b8' },
                  },
                  y: {
                    title: { display: true, text: 'ESG Integrity Score (%)', font: { size: 10, weight: 'bold', family: 'monospace' }, color: '#94a3b8' },
                    min: 0,
                    max: 100,
                  },
                },
              })}
            />
          </Suspense>
        </div>
      </div>

      {/* ESG Pillars Radar Chart */}
      {radarData && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 flex items-center">
              <span className="w-2 h-2 bg-mechanica-moonlight-blue rounded-full mr-3 animate-pulse"></span>
              ESG Pillar Analysis
            </h3>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {radarData.datasets[0].label}
            </div>
          </div>
          <div className="relative w-full h-[400px] p-4 bg-gray-50/30 rounded-2xl border border-gray-50">
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-mechanica-moonlight-blue border-t-transparent"></div>
              </div>
            }>
              <Radar
                data={radarData}
                redraw={true}
                options={getMechanicaTheme({
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top' as const,
                    }
                  },
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        stepSize: 20
                      }
                    }
                  }
                })}
              />
            </Suspense>
          </div>
        </div>
      )}

      {/* Industry Peer Comparison Bar Chart */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 flex items-center">
            <span className="w-2 h-2 bg-mechanica-moonlight-blue rounded-full mr-3 animate-pulse"></span>
            Industry Peer Comparison
          </h3>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sector Analysis</div>
        </div>
        <div className="relative w-full h-[400px] p-4 bg-gray-50/30 rounded-2xl border border-gray-50">
          <Suspense fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-mechanica-moonlight-blue border-t-transparent"></div>
            </div>
          }>
            <Bar
              data={barData}
              redraw={true}
              options={getMechanicaTheme({
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Average ESG Score',
                      font: { size: 12, weight: 'bold' },
                      color: '#94a3b8'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Industry Sectors',
                      font: { size: 12, weight: 'bold' },
                      color: '#94a3b8'
                    }
                  }
                }
              })}
            />
          </Suspense>
        </div>
      </div>

      <div className="bg-red-50/50 rounded-2xl border border-red-100 p-8">
        <div className="flex items-center space-x-3 mb-6 border-b border-red-100 pb-4">
          <span className="text-xl">🚨</span>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-red-900">High-Risk Red Flags</h3>
        </div>
        <ul className="space-y-4">
          {filtered.filter(d => d.flagged).length === 0 ? (
            <li className="flex items-center text-green-700 font-bold italic text-sm">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
              No red flag anomalies detected in current component stream.
            </li>
          ) : (
            filtered
              .filter(d => d.flagged)
              .map(d => (
                <li key={d.name} className="flex items-start bg-white p-4 rounded-xl border border-red-100 shadow-sm transform transition-all hover:-translate-y-0.5">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <span className="text-xs font-black">!</span>
                  </div>
                  <div>
                    <div className="font-black text-gray-900 uppercase tracking-tight text-sm">Component Failure: {d.name}</div>
                    <div className="text-xs text-red-600 font-bold uppercase tracking-widest mt-1">Sector: {d.sector} | Status: High-Risk Greenwashing Pattern</div>
                  </div>
                </li>
              ))
          )}
        </ul>
      </div>
    </div>
  );
}

