import React, { Suspense, useEffect, useState, useMemo } from 'react';

const Pie = React.lazy(() =>
  import('react-chartjs-2').then(mod => ({ default: mod.Pie }))
);
const Line = React.lazy(() =>
  import('react-chartjs-2').then(mod => ({ default: mod.Line }))
);

import { registerMechanicaCharts, getMechanicaTheme, MECHANICA_COLORS } from '@/utils/mechanicaCharts';

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
    <div className="bg-white rounded-xl shadow-md p-6 md:p-10 w-full max-w-3xl">
      {/* Service Status Bar */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-gray-700">Service Status</h4>
          {timestamp && (
            <span className="text-xs text-gray-500">
              Last updated: {new Date(timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(servicesStatus).map(([service, healthy]) => (
            <div
              key={service}
              className={`px-2 py-1 rounded text-xs font-medium ${healthy
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
                }`}
            >
              {service}: {healthy ? 'Online' : 'Offline'}
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-600">
          Market Data: <span className={`font-medium ${marketStatus === 'healthy' ? 'text-green-600' :
            marketStatus === 'degraded' ? 'text-yellow-600' : 'text-gray-600'
            }`}>{marketStatus}</span>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold text-indigo-800 mb-4">
          Portfolio Allocation
        </h3>
        <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Loading chart...</div>}>
          <div className="h-[300px] relative">
            <Pie data={pieData} options={pieOptions} redraw={true} />
          </div>
        </Suspense>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold text-indigo-800 mb-4">
          Performance Over Time
        </h3>
        <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Loading chart...</div>}>
          <div className="h-[300px] relative">
            <Line data={lineData} options={lineOptions} redraw={true} />
          </div>
        </Suspense>
      </div>

      {/* Risk Metrics Section */}
      {Object.keys(riskMetrics).length > 0 && (
        <div className="mb-10 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Risk Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {riskMetrics.volatility && (
              <div>
                <div className="text-gray-600">Volatility</div>
                <div className="font-semibold text-blue-900">
                  {((riskMetrics.volatility as any) * 100).toFixed(2)}%
                </div>
              </div>
            )}
            {riskMetrics.var_95 && (
              <div>
                <div className="text-gray-600">VaR (95%)</div>
                <div className="font-semibold text-blue-900">
                  {((riskMetrics.var_95 as any) || 0).toFixed(2)}
                </div>
              </div>
            )}
            {riskMetrics.sharpe_ratio && (
              <div>
                <div className="text-gray-600">Sharpe Ratio</div>
                <div className="font-semibold text-blue-900">
                  {((riskMetrics.sharpe_ratio as any) || 0).toFixed(2)}
                </div>
              </div>
            )}
            {riskMetrics.max_drawdown && (
              <div>
                <div className="text-gray-600">Max Drawdown</div>
                <div className="font-semibold text-blue-900">
                  {((riskMetrics.max_drawdown as any) * 100).toFixed(2)}%
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mb-10 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">
            Asset Toggle
          </label>
          <label
            htmlFor="asset-select"
            className="block text-sm font-semibold mb-1"
          >
            Asset Toggle
          </label>
          <select
            id="asset-select"
            className="w-full border border-gray-300 rounded-md p-2"
            value={showAsset || ''}
            onChange={e => setShowAsset(e.target.value || null)}
            title="Select asset"
          >
            <option value="">All</option>
            {portfolioData?.assets.map(a => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">
            Alert Sensitivity
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={alertSensitivity}
            onChange={e => setAlertSensitivity(Number(e.target.value))}
            className="w-full"
            title="Alert sensitivity"
          />
          <div className="text-sm text-gray-600 mt-1">
            Level: {alertSensitivity}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-indigo-800 mb-2">
          Asset Details
        </h3>
        {showAsset ? (
          <div className="text-indigo-700 font-bold">
            {showAsset}: $
            {portfolioData?.assets
              .find(a => a.name === showAsset)
              ?.value?.toLocaleString() || 'N/A'}
          </div>
        ) : (
          <div className="text-gray-700">Select an asset to view details.</div>
        )}
      </div>

      {/* Portfolio Input Form */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-indigo-800 mb-4">
          Add New Asset
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Ticker (e.g., AAPL)"
            value={newAsset.ticker}
            onChange={(e) => setNewAsset({ ...newAsset, ticker: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newAsset.amount}
            onChange={(e) => setNewAsset({ ...newAsset, amount: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Price per share"
            value={newAsset.price}
            onChange={(e) => setNewAsset({ ...newAsset, price: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => {
              if (newAsset.ticker && newAsset.amount && newAsset.price) {
                const value = parseFloat(newAsset.amount) * parseFloat(newAsset.price);
                setPortfolioAssets([
                  ...portfolioAssets,
                  {
                    name: newAsset.ticker.toUpperCase(),
                    value,
                    allocation: 0 // Will be calculated in useMemo
                  }
                ]);
                setNewAsset({ ticker: '', amount: '', price: '' });
              }
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add Asset
          </button>
        </div>
      </div>
    </div>
  );
});

export default PortfolioMonitor;
