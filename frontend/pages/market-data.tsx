import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { MechanicaButton } from '../components/ui/mechanicaButton';

interface MarketTicker {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

const initialTickers: MarketTicker[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 0, changePercent: 0, volume: '52.3M' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91, change: 0, changePercent: 0, volume: '28.7M' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 139.62, change: 0, changePercent: 0, volume: '31.2M' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 146.78, change: 0, changePercent: 0, volume: '41.8M' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.93, change: 0, changePercent: 0, volume: '118.5M' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 485.09, change: 0, changePercent: 0, volume: '45.2M' },
];

const marketIndices: MarketIndex[] = [
  { name: 'S&P 500', value: 4514.02, change: 0, changePercent: 0 },
  { name: 'Dow Jones', value: 35430.42, change: 0, changePercent: 0 },
  { name: 'NASDAQ', value: 14258.49, change: 0, changePercent: 0 },
];

export default function MarketDataPage() {
  const [tickers, setTickers] = useState<MarketTicker[]>(initialTickers);
  const [indices, setIndices] = useState<MarketIndex[]>(marketIndices);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Simulate live price updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setTickers(prevTickers => 
        prevTickers.map(ticker => {
          const changeAmount = (Math.random() - 0.5) * 2; // Random change between -1 and 1
          const newPrice = Math.max(0.01, ticker.price + changeAmount);
          const change = newPrice - ticker.price;
          const changePercent = (change / ticker.price) * 100;

          return {
            ...ticker,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat(changePercent.toFixed(2))
          };
        })
      );

      setIndices(prevIndices =>
        prevIndices.map(index => {
          const changeAmount = (Math.random() - 0.5) * 50; // Random change between -25 and 25
          const newValue = Math.max(0, index.value + changeAmount);
          const change = newValue - index.value;
          const changePercent = (change / index.value) * 100;

          return {
            ...index,
            value: parseFloat(newValue.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat(changePercent.toFixed(2))
          };
        })
      );

      setLastUpdate(new Date());
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const toggleLive = () => {
    setIsLive(!isLive);
  };

  return (
    <MechanicaLayout
      title="Market Data Dashboard"
      description="Real-time market data and live ticker updates for comprehensive investment analysis."
    >
      <Head>
        <title>Market Data | BeginnerInvestorHub</title>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Header */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center space-x-6 mb-8">
                <MechanicaGear size="xl" color="steel" speed="slow" />
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900">
                  Market <span className="text-green-600">Data</span>
                </h1>
                <MechanicaGear size="xl" color="steel" speed="reverse" />
              </div>
              
              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                  isLive ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                  <span className={`font-medium ${
                    isLive ? 'text-green-800' : 'text-gray-600'
                  }`}>
                    {isLive ? 'LIVE' : 'PAUSED'}
                  </span>
                </div>
                
                <MechanicaButton
                  variant={isLive ? 'wood' : 'mechanical'}
                  onClick={toggleLive}
                  className="px-6"
                >
                  {isLive ? 'Pause Updates' : 'Start Live Feed'}
                </MechanicaButton>
              </div>
              
              <p className="text-sm text-gray-500">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>

            {/* Market Indices */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {indices.map((index, idx) => (
                <MechanicaCard 
                  key={index.name} 
                  variant={idx % 3 === 0 ? 'mechanical' : idx % 3 === 1 ? 'wood' : 'brass'} 
                  animated 
                >
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {index.name}
                    </h3>
                    <div className="text-3xl font-bold mb-2">
                      {index.value.toLocaleString()}
                    </div>
                    <div className={`text-lg font-medium ${
                      index.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                </MechanicaCard>
              ))}
            </div>

            {/* Stock Tickers */}
            <MechanicaCard variant="mechanical" animated>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Live Stock Tickers
                  </h2>
                  <div className="flex items-center space-x-2">
                    <MechanicaGear size="small" color="steel" speed="fast" />
                    <span className="text-sm text-gray-500">Real-time</span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Symbol</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Price</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Change</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Change %</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickers.map((ticker, index) => (
                        <tr key={ticker.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono font-bold text-gray-900">
                            {ticker.symbol}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {ticker.name}
                          </td>
                          <td className="py-3 px-4 text-right font-mono">
                            ${ticker.price.toFixed(2)}
                          </td>
                          <td className={`py-3 px-4 text-right font-mono ${
                            ticker.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {ticker.change >= 0 ? '+' : ''}{ticker.change.toFixed(2)}
                          </td>
                          <td className={`py-3 px-4 text-right font-mono ${
                            ticker.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {ticker.changePercent >= 0 ? '+' : ''}{ticker.changePercent.toFixed(2)}%
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            {ticker.volume}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </MechanicaCard>
          </div>
        </section>

        {/* Market Stats */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Market Statistics
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MechanicaCard variant="wood" animated>
                <div className="p-6 text-center">
                  <MechanicaGear size="medium" color="brass" speed="slow" className="mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {tickers.length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Active Tickers
                  </div>
                </div>
              </MechanicaCard>
              
              <MechanicaCard variant="brass" animated>
                <div className="p-6 text-center">
                  <MechanicaGear size="medium" color="copper" speed="medium" className="mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {tickers.filter(t => t.change > 0).length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Advancing
                  </div>
                </div>
              </MechanicaCard>
              
              <MechanicaCard variant="mechanical" animated>
                <div className="p-6 text-center">
                  <MechanicaGear size="medium" color="steel" speed="reverse" className="mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {tickers.filter(t => t.change < 0).length}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Declining
                  </div>
                </div>
              </MechanicaCard>
              
              <MechanicaCard variant="wood" animated>
                <div className="p-6 text-center">
                  <MechanicaGear size="medium" color="brass" speed="fast" className="mx-auto mb-4" />
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    2s
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Update Interval
                  </div>
                </div>
              </MechanicaCard>
            </div>
          </div>
        </section>
      </div>
    </MechanicaLayout>
  );
}
