import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Mock portfolio data for demo mode
  const portfolioData = {
    balance: 12500.75,
    holdings: [
      {
        symbol: 'AAPL',
        shares: 50,
        price: 175.43,
        value: 8771.5,
      },
      {
        symbol: 'GOOGL',
        shares: 20,
        price: 138.92,
        value: 2778.4,
      },
      {
        symbol: 'MSFT',
        shares: 15,
        price: 378.91,
        value: 5683.65,
      },
    ],
    totalValue: 27233.55,
    lastUpdated: new Date().toISOString(),
  };

  res.status(200).json(portfolioData);
}
