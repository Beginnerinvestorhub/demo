import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Cache for 5 minutes since feature flags don't change frequently
  res.setHeader(
    'Cache-Control',
    'public, max-age=300, stale-while-revalidate=600'
  );
  res.status(200).json({
    newFeature: true,
    betaAccess: false,
    enableTrading: true,
  });
}
