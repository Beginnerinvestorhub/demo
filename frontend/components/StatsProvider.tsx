import React, { useState, useEffect } from 'react';

interface StatsData {
  portfoliosBuilt: number;
  simulationsRun: number;
  simulatedValue: number;
  userSatisfaction: number;
}

interface StatsProviderProps {
  children: (stats: StatsData) => React.ReactNode;
}

import { apiClient } from '@/services/apiClient';

// ... imports

const StatsProvider: React.FC<StatsProviderProps> = ({ children }) => {
  const [stats, setStats] = useState<StatsData>({
    portfoliosBuilt: 12847,
    simulationsRun: 45392,
    simulatedValue: 2100000,
    userSatisfaction: 95,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/stats');
        setStats(response.data);
      } catch (err) {
        console.warn('Failed to fetch real stats, using fallback data:', err);
        // Keep the fallback data - no need to set error state
      }
    };

    // Initial fetch
    fetchStats();

    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return <>{children(stats)}</>;
};

export default StatsProvider;
