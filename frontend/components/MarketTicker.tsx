import React from 'react';

// Export the type so it can be used in other files, like pages/index.tsx
export interface TickerData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

interface MarketTickerProps {
  data: TickerData[];
  loading: boolean;
  error: string | null;
}

const MarketTicker: React.FC<MarketTickerProps> = ({ data, loading, error }) => {
  // The component now receives loading, error, and data states as props.
  // No internal state or useEffect is needed for data fetching.
  
  if (loading) {
    return (
      <div className="market-ticker">
        <div className="ticker-content">
          <span className="ticker-item">Loading market data... Please wait.</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="market-ticker error-ticker">
        <div className="ticker-content">
          <span className="ticker-item">Error: {error}</span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="market-ticker">
        <div className="ticker-content">
          <span className="ticker-item">No market data available.</span>
        </div>
      </div>
    );
  }

  const tickerItems = data.map((item, index) => (
    <React.Fragment key={`${item.symbol}-${index}`}>
      <span className="ticker-item">
        {item.symbol}: {' '}
        <span className={`ticker-value ${item.change >= 0 ? 'up' : 'down'}`}>
          {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
        </span>
      </span>
      {index < data.length - 1 && <span className="ticker-separator">•</span>}
    </React.Fragment>
  ));

  return (
    <div className="market-ticker">
      <div className="ticker-content">
        {tickerItems}
        {/* Duplicate for seamless infinite scroll */}
        {tickerItems}
      </div>
    </div>
  );
};

export default MarketTicker;
