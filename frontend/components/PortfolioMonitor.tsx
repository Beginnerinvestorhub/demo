import React, { Suspense, useEffect, useState, useMemo } from 'react';

const Pie = React.lazy(() =>
  import('react-chartjs-2').then(mod => ({ default: mod.Pie }))
);
const Line = React.lazy(() =>
  import('react-chartjs-2').then(mod => ({ default: mod.Line }))
);

import { registerMechanicaCharts, getMechanicaTheme, MECHANICA_COLORS } from '@/utils/mechanicaCharts';
import { MechanicaCard } from './ui/mechanicaCard';
import { MechanicaButton } from './ui/mechanicaButton';
import { MechanicaGear } from './ui/mechanicaGear';

// Register ChartJS once
registerMechanicaCharts();

type PortfolioAsset = { name: string; value: number; allocation: number };
type PortfolioHistory = { date: string; total: number };
type PortfolioMonitoringData = {
  assets: PortfolioAsset[];
  history: PortfolioHistory[];
  riskMetrics?: Record<string, number | string | boolean>;
  marketStatus?: string;
  servicesStatus?: Record<string, boolean>;
  timestamp?: string;
};

// Mock data for frontend-only implementation
const mockPortfolioData: PortfolioMonitoringData = {
  assets: [
    { name: 'Stocks', value: 50000, allocation: 60 },
    { name: 'Bonds', value: 25000, allocation: 30 },
    { name: 'Real Estate', value: 8333, allocation: 10 },
  ],
  history: [
    { date: 'Jan', total: 75000 },
    { date: 'Feb', total: 78000 },
    { date: 'Mar', total: 82000 },
    { date: 'Apr', total: 81000 },
    { date: 'May', total: 83333 },
  ],
  riskMetrics: {
    volatility: 0.15,
    var_95: 5000,
    sharpe_ratio: 1.2,
    max_drawdown: 0.08,
  },
  marketStatus: 'healthy',
  servicesStatus: {
    'Data Feed': true,
    'Analytics': true,
    'Alerts': true,
  },
  timestamp: new Date().toISOString(),
};

const PortfolioMonitor = React.memo(function PortfolioMonitor() {
  const [showAsset, setShowAsset] = useState<string | null>(null);
  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>(mockPortfolioData.assets);
  const [newAsset, setNewAsset] = useState({ ticker: '', amount: '', price: '' });

  // Persistent Alert Sensitivity
  const [alertSensitivity, setAlertSensitivity] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('portfolio_alert_sensitivity')) || 5;
    }
    return 5;
  });

  useEffect(() => {
    localStorage.setItem('portfolio_alert_sensitivity', alertSensitivity.toString());
  }, [alertSensitivity]);

  // Calculate total portfolio value and allocations
  const portfolioData = useMemo(() => {
    const totalValue = portfolioAssets.reduce((sum, asset) => sum + asset.value, 0);
    const assetsWithAllocation = portfolioAssets.map(asset => ({
      ...asset,
      allocation: totalValue > 0 ? (asset.value / totalValue) * 100 : 0
    }));

    return {
      ...mockPortfolioData,
      assets: assetsWithAllocation,
    };
  }, [portfolioAssets]);

  const loading = false;
  const error = null;

  // Memoize chart data to prevent unnecessary recalculations - MUST be before early returns
  const pieData = useMemo(
    () => {
      const portfolio = (portfolioData?.assets || []).map((a: PortfolioAsset) => ({ ...a }));
      return {
        labels: portfolio.map(a => a.name),
        datasets: [
          {
            data: portfolio.map(a => a.allocation),
            backgroundColor: [
              MECHANICA_COLORS.neutral,
              MECHANICA_COLORS.accent,
              MECHANICA_COLORS.success,
              MECHANICA_COLORS.danger,
              '#a78bfa',
            ],
            borderColor: '#ffffff',
            borderWidth: 2,
          },
        ],
      };
    },
    [portfolioData]
  );

  const lineData = useMemo(
    () => {
      const history = portfolioData?.history || [];
      return {
        labels: history.map(h => h.date),
        datasets: [
          {
            label: 'Portfolio Value',
            data: history.map(h => h.total),
            fill: true,
            borderColor: MECHANICA_COLORS.primary,
            backgroundColor: 'rgba(79, 115, 142, 0.1)',
            tension: 0.4,
            pointBackgroundColor: MECHANICA_COLORS.primary,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
          },
        ],
      };
    },
    [portfolioData]
  );

  // Memoize chart options to prevent unnecessary re-renders
  const pieOptions = useMemo(
    () => getMechanicaTheme({
      plugins: {
        legend: {
          display: true,
          position: 'bottom' as const,
        }
      }
    }),
    []
  );

  const lineOptions = useMemo(
    () => getMechanicaTheme({
      scales: {
        y: {
          beginAtZero: false, // Better for portfolio growth
        }
      }
    }),
    []
  );

  if (loading) {
    return <div className="text-center py-12">Loading portfolio data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-12">Error: {error}</div>;
  }

  // Extract service status and risk metrics
  const servicesStatus = portfolioData?.servicesStatus || {};
  const riskMetrics = portfolioData?.riskMetrics || {};
  const marketStatus = portfolioData?.marketStatus || 'unknown';
  const timestamp = portfolioData?.timestamp;

  return (
    <MechanicaCard variant="mechanical" animated gearDecoration className="w-full max-w-5xl overflow-hidden">
      <div className="p-6 md:p-10">
        {/* Header section with Gear */}
        <div className="flex items-center space-x-4 mb-8 border-b border-gray-100 pb-6">
          <MechanicaGear size="large" color="brass" speed="slow" />
          <div>
            <h2 className="text-3xl font-black mechanica-heading-professional text-mechanica-moonlight-blue uppercase tracking-tighter">
              Portfolio Analyzer
            </h2>
            <p className="text-sm text-gray-500 mechanica-text-technical uppercase tracking-widest">
              [ Engine Status: Optimal ]
            </p>
          </div>
        </div>

        {/* Service Status Bar */}
        <div className="mb-8 p-6 bg-blue-50/50 rounded-xl border border-blue-100/50 backdrop-blur-sm shadow-inner-premium">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-black text-mechanica-moonlight-blue uppercase tracking-[0.2em]">System Diagnostics</h4>
            {timestamp && (
              <span className="text-[10px] font-mono text-gray-400 uppercase">
                Last Sync: {new Date(timestamp).toLocaleTimeString()}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {Object.entries(servicesStatus).map(([service, healthy]) => (
              <div
                key={service}
                className={`flex items-center px-3 py-1.5 rounded-lg border-2 text-[10px] font-black uppercase tracking-widest transition-all ${healthy
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
                  }`}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${healthy ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                {service}: {healthy ? 'Active' : 'Offline'}
              </div>
            ))}
            <div className="flex items-center px-3 py-1.5 rounded-lg border-2 bg-indigo-50 border-indigo-200 text-indigo-700 text-[10px] font-black uppercase tracking-widest">
              Feed: {marketStatus}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          <MechanicaCard variant="default" hover className="p-6 border-mechanica-moonlight-blue/10">
            <h3 className="text-sm font-black text-mechanica-moonlight-blue uppercase tracking-[0.2em] mb-6 flex items-center">
              <span className="mr-2">📊</span> Asset Allocation
            </h3>
            <Suspense fallback={<div className="h-[300px] flex items-center justify-center"><MechanicaGear size="medium" color="steel" speed="fast" /></div>}>
              <div className="h-[300px] relative">
                <Pie data={pieData} options={pieOptions} redraw={true} />
              </div>
            </Suspense>
          </MechanicaCard>

          <MechanicaCard variant="default" hover className="p-6 border-mechanica-moonlight-blue/10">
            <h3 className="text-sm font-black text-mechanica-moonlight-blue uppercase tracking-[0.2em] mb-6 flex items-center">
              <span className="mr-2">📈</span> Performance History
            </h3>
            <Suspense fallback={<div className="h-[300px] flex items-center justify-center"><MechanicaGear size="medium" color="steel" speed="fast" /></div>}>
              <div className="h-[300px] relative">
                <Line data={lineData} options={lineOptions} redraw={true} />
              </div>
            </Suspense>
          </MechanicaCard>
        </div>

        {/* Risk Metrics Section */}
        {Object.keys(riskMetrics).length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-black text-mechanica-moonlight-blue uppercase tracking-[0.2em] mb-6 flex items-center">
              <span className="mr-2">🎯</span> Risk Vector Analysis
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Volatility', value: `${((riskMetrics.volatility as any) * 100).toFixed(2)}%`, icon: '🌪️' },
                { label: 'VaR (95%)', value: Number(riskMetrics.var_95 || 0).toFixed(2), icon: '🛡️' },
                { label: 'Sharpe', value: Number(riskMetrics.sharpe_ratio || 0).toFixed(2), icon: '⚖️' },
                { label: 'Drawdown', value: `${((riskMetrics.max_drawdown as any) * 100).toFixed(2)}%`, icon: '📉' }
              ].map((metric) => (
                <div key={metric.label} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                    {metric.label}
                    <span className="opacity-50">{metric.icon}</span>
                  </div>
                  <div className="text-lg font-black text-mechanica-moonlight-blue font-mono">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-mechanica-moonlight-blue uppercase tracking-[0.2em] block">
              Asset Monitor Isolation
            </label>
            <select
              id="asset-select"
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-3 text-sm font-bold mechanica-text-technical focus:border-mechanica-moonlight-blue focus:ring-0 transition-all outline-none"
              value={showAsset || ''}
              onChange={e => setShowAsset(e.target.value || null)}
              title="Select asset"
            >
              <option value="">Full Portfolio View</option>
              {portfolioData?.assets.map(a => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-mechanica-moonlight-blue uppercase tracking-[0.2em] block flex justify-between">
              Alert Sensitivity <span>Level: {alertSensitivity}</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={alertSensitivity}
              onChange={e => setAlertSensitivity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-mechanica-moonlight-blue"
              title="Alert sensitivity"
            />
          </div>
        </div>

        <MechanicaCard variant="wood" className="mb-10 p-6">
          <h3 className="text-xs font-black text-mechanica-moonlight-blue uppercase tracking-[0.2em] mb-4">
            Isolated Component Status
          </h3>
          {showAsset ? (
            <div className="flex items-center space-x-4">
              <MechanicaGear size="medium" color="brass" speed="medium" />
              <div className="text-2xl font-black text-mechanica-moonlight-blue font-mono">
                {showAsset}: <span className="text-indigo-600">${portfolioData?.assets.find(a => a.name === showAsset)?.value?.toLocaleString() || 'N/A'}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3 text-gray-400 italic font-medium">
              <span className="text-xl">⚙️</span>
              <span>All components currently synchronized. Select an asset for detailed isolation.</span>
            </div>
          )}
        </MechanicaCard>

        {/* Portfolio Input Form */}
        <div className="p-8 bg-gray-900 rounded-2xl text-white shadow-2xl relative overflow-hidden">
          {/* Decorative gear background */}
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <MechanicaGear size="xl" color="steel" speed="slow" />
          </div>

          <h3 className="text-lg font-black uppercase tracking-widest text-yellow-400 mb-6 flex items-center">
            <span className="mr-3">⚙️</span> Component Assembly Form
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Ticker ID</label>
              <input
                type="text"
                placeholder="e.g., AAPL"
                value={newAsset.ticker}
                onChange={(e) => setNewAsset({ ...newAsset, ticker: e.target.value })}
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-yellow-400/50 transition-all font-mono uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Unit Quantity</label>
              <input
                type="number"
                placeholder="0.00"
                value={newAsset.amount}
                onChange={(e) => setNewAsset({ ...newAsset, amount: e.target.value })}
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-yellow-400/50 transition-all font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Price Vector</label>
              <input
                type="number"
                placeholder="0.00"
                value={newAsset.price}
                onChange={(e) => setNewAsset({ ...newAsset, price: e.target.value })}
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-yellow-400/50 transition-all font-mono"
              />
            </div>
            <div className="flex items-end">
              <MechanicaButton
                variant="mechanical"
                size="md"
                onClick={() => {
                  if (newAsset.ticker && newAsset.amount && newAsset.price) {
                    const value = parseFloat(newAsset.amount) * parseFloat(newAsset.price);
                    setPortfolioAssets([
                      ...portfolioAssets,
                      {
                        name: newAsset.ticker.toUpperCase(),
                        value,
                        allocation: 0
                      }
                    ]);
                    setNewAsset({ ticker: '', amount: '', price: '' });
                  }
                }}
                className="w-full py-4 text-xs font-black uppercase tracking-[0.2em]"
              >
                Assemble
              </MechanicaButton>
            </div>
          </div>
        </div>
      </div>
    </MechanicaCard>
  );
});

export default PortfolioMonitor;
