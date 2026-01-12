import React, { useState, Suspense, useEffect } from 'react';

const Pie = React.lazy(() =>
  import('react-chartjs-2').then(mod => ({ default: mod.Pie }))
);
const Bar = React.lazy(() =>
  import('react-chartjs-2').then(mod => ({ default: mod.Bar }))
);

import { registerMechanicaCharts, getMechanicaTheme, MECHANICA_COLORS } from '@/utils/mechanicaCharts';

// Register ChartJS once
registerMechanicaCharts();

const brokers = [
  { name: 'Broker A', fee: 0 },
  { name: 'Broker B', fee: 1.99 },
  { name: 'Broker C', fee: 4.95 },
];

/**
 * FractionalShareCalculator is a component that allows users to calculate the number of fractional shares
 * they can buy from various brokers based on an investment amount and stock price. It provides a form for
 * inputting the investment amount and stock symbol, fetches the stock price, and displays the results in
 * both a pie chart showing fractional shares by broker and a bar chart comparing broker fees. Users can
 * select a broker to see the specific number of shares they can purchase with the investment amount minus
 * the broker's fee.
 */
export default function FractionalShareCalculator() {
  const [amount, setAmount] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('calc_amount') || '';
    }
    return '';
  });
  const [symbol, setSymbol] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [selectedBroker, setSelectedBroker] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('calc_selected_broker') || brokers[0].name;
    }
    return brokers[0].name;
  });
  const [loadingPrice, setLoadingPrice] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('calc_amount', amount);
  }, [amount]);

  useEffect(() => {
    localStorage.setItem('calc_selected_broker', selectedBroker);
  }, [selectedBroker]);

  const fetchPrice = async (sym: string) => {
    setLoadingPrice(true);
    setPriceError(null);
    setPrice('');
    try {
      const res = await fetch(
        `/api/price-proxy?symbol=${encodeURIComponent(sym)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch price');
      setPrice(data.price.toString());
    } catch (err: unknown) {
      setPriceError(err instanceof Error ? err.message : 'Failed to fetch price');
    } finally {
      setLoadingPrice(false);
    }
  };

  const calcShares = (amt: number, p: number, fee: number) =>
    amt - fee > 0 && p > 0 ? (amt - fee) / p : 0;

  const shares = brokers.map(b =>
    calcShares(Number(amount), Number(price), b.fee)
  );

  const pieData = {
    labels: brokers.map(b => b.name),
    datasets: [
      {
        data: shares,
        backgroundColor: [MECHANICA_COLORS.neutral, MECHANICA_COLORS.success, MECHANICA_COLORS.accent],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: brokers.map(b => b.name),
    datasets: [
      {
        label: 'Broker Fee ($)',
        data: brokers.map(b => b.fee),
        backgroundColor: MECHANICA_COLORS.primary,
        borderRadius: 8,
      },
    ],
  };

  // Interactive Blueprint SVG Logic
  const shareProgress = Math.min(1, (Number(amount) / Number(price)) || 0);
  const BlueprintVisualizer = () => {
    return (
      <div className="relative w-full h-48 bg-slate-900 rounded-2xl border-2 border-slate-800 flex items-center justify-center overflow-hidden mb-8 mechanica-hum">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
        <svg viewBox="0 0 200 100" className="w-64 h-32 relative z-10">
          {/* Base Platform */}
          <rect x="20" y="80" width="160" height="10" fill="#334155" rx="2" />

          {/* Assembly Progress - Gears or Parts that fill up */}
          <g className="transition-all duration-1000 ease-out" style={{ opacity: shareProgress > 0 ? 1 : 0.2 }}>
            {/* Part 1: Main Housing */}
            <rect x="50" y="40" width="100" height="40" fill="none" stroke={MECHANICA_COLORS.primary} strokeWidth="2" strokeDasharray="4 2" />
            <rect x="50" y="40" width={100 * shareProgress} height="40" fill={MECHANICA_COLORS.primary} className="transition-all duration-1000" />

            {/* Part 2: Inner Core (appears after 50%) */}
            <circle cx="100" cy="60" r="15" fill="none" stroke={MECHANICA_COLORS.accent} strokeWidth="2" strokeDasharray="2 1" />
            {shareProgress > 0.5 && (
              <circle cx="100" cy="60" r="15" fill={MECHANICA_COLORS.accent} className="animate-pulse" />
            )}

            {/* Connection Port (appears as it completes) */}
            <path d="M150 50 L170 50 L170 70" fill="none" stroke={MECHANICA_COLORS.success} strokeWidth="3"
              strokeDasharray="100" strokeDashoffset={100 - (shareProgress * 100)} className="transition-all duration-1000" />
          </g>

          {/* Technical Labels */}
          <text x="100" y="20" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="bold">
            COMPONENT ASSEMBLY: {(shareProgress * 100).toFixed(1)}%
          </text>
        </svg>

        {/* Steam Animation for "Active" state */}
        {shareProgress > 0 && (
          <div className="absolute right-12 bottom-12 flex space-x-1">
            <div className="w-1 h-8 bg-blue-400/20 mechanica-steam"></div>
            <div className="w-1 h-12 bg-blue-400/20 mechanica-steam" style={{ animationDelay: '0.5s' }}></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg mx-auto">
      <BlueprintVisualizer />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Investment Amount ($)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">$</span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-mechanica-moonlight-blue/10 focus:border-mechanica-moonlight-blue outline-none transition-all font-mono text-xl text-gray-800"
            />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Target Asset Price ($)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">$</span>
            <input
              type="number"
              placeholder="0.00"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full pl-10 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-mechanica-moonlight-blue/10 focus:border-mechanica-moonlight-blue outline-none transition-all font-mono text-xl text-gray-800"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3 text-mechanica-moonlight-blue">
          <div className="w-10 h-10 bg-mechanica-moonlight-blue/10 rounded-xl flex items-center justify-center mechanica-pulse-technical">
            <span className="text-xl">⚙️</span>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Yield Prediction</div>
            <div className="text-2xl font-black font-mono">
              {calcShares(Number(amount), Number(price), brokers.find(b => b.name === selectedBroker)?.fee ?? 0).toFixed(6)}{' '} <span className="text-sm font-bold text-gray-400">Components</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Precision Assembly</div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-mechanica-moonlight-blue transition-all duration-1000"
                style={{ width: `${Math.min(100, (Number(amount) / Number(price)) * 100)}%` }}
              ></div>
            </div>
            <span className="text-xs font-bold font-mono text-mechanica-moonlight-blue">
              {Math.min(100, (Number(amount) / Number(price)) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
      <form className="space-y-4 mb-8 mt-8">
        <div className="flex gap-2">
          <input
            type="text"
            className="input flex-1"
            placeholder="Stock Symbol (e.g. AAPL)"
            value={symbol}
            onChange={e => setSymbol(e.target.value.toUpperCase())}
            onBlur={() => symbol && fetchPrice(symbol)}
          />
          <button
            type="button"
            className="btn btn-primary"
            disabled={!symbol || loadingPrice}
            onClick={() => symbol && fetchPrice(symbol)}
          >
            {loadingPrice ? '...' : 'Get Price'}
          </button>
        </div>
        {priceError && <div className="text-red-500 text-sm">{priceError}</div>}
        <select
          className="input"
          value={selectedBroker}
          onChange={e => setSelectedBroker(e.target.value)}
        >
          {brokers.map(b => (
            <option key={b.name} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
      </form>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Fractional Shares by Broker</h3>
        <Suspense fallback={<div>Loading chart...</div>}>
          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-8 border-b border-gray-100 pb-2 w-full text-center">
              Fractional Allocation Blueprint
            </h4>
            <div className="relative w-full h-[300px]">
              <Pie
                key={`pie-${amount}-${price}`}
                data={pieData}
                options={getMechanicaTheme({
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom' as const,
                    }
                  }
                })}
              />
            </div>
          </div>
        </Suspense>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Broker Fee Comparison</h3>
        <Suspense fallback={<div>Loading chart...</div>}>
          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-8 border-b border-gray-100 pb-2 w-full text-center">
              Broker Fee Comparison
            </h4>
            <div className="relative w-full h-[300px]">
              <Bar
                key={`bar-${amount}-${price}`}
                data={barData}
                options={getMechanicaTheme()}
              />
            </div>
          </div>
        </Suspense>
      </div>
      <div className="text-center mt-4">
        <span className="text-lg font-bold text-indigo-700">
          {selectedBroker}:{' '}
          {calcShares(
            Number(amount),
            Number(price),
            brokers.find(b => b.name === selectedBroker)?.fee ?? 0
          ).toFixed(4)}{' '}
          shares
        </span>
      </div>
    </div >
  );
}
