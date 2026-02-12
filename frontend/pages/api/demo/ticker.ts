import { NextApiRequest, NextApiResponse } from 'next';

interface TickerData {
  symbol: string;
  price: string;
  change: string;
  up: boolean;
}

// Demo ticker data with realistic base prices from existing portfolio
const DEMO_TICKERS: TickerData[] = [
  { symbol: 'AAPL', price: '175.43', change: '+1.2%', up: true },
  { symbol: 'GOOGL', price: '138.92', change: '-0.4%', up: false },
  { symbol: 'MSFT', price: '378.91', change: '+2.1%', up: true },
  { symbol: 'TSLA', price: '242.67', change: '+0.8%', up: true },
  { symbol: 'NVDA', price: '485.09', change: '-1.5%', up: false },
  { symbol: 'AMZN', price: '127.35', change: '+3.4%', up: true },
];

let currentTickers = [...DEMO_TICKERS];

// Simulate price changes every 5-10 seconds
function updatePrices() {
  currentTickers = currentTickers.map(ticker => {
    const changePercent = (Math.random() - 0.5) * 2; // -1% to +1%
    const currentPrice = parseFloat(ticker.price.replace(',', ''));
    const newPrice = currentPrice * (1 + changePercent / 100);

    const change = (((newPrice - currentPrice) / currentPrice) * 100).toFixed(
      1
    );
    const up = parseFloat(change) >= 0;

    return {
      ...ticker,
      price: newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      change: `${up ? '+' : ''}${change}%`,
      up,
    };
  });
}

// Update prices periodically
if (typeof setInterval !== 'undefined') {
  setInterval(updatePrices, 5000 + Math.random() * 5000); // 5-10 seconds
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Return current ticker data
  res.status(200).json(currentTickers);
}
