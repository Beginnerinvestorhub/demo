import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { MechanicaButton } from '../components/ui/mechanicaButton';
import { useApiGet } from '../hooks/useApi'; // Import useApiGet

interface AdminDashboardData {
  totalUsers: number;
  activePortfolios: number;
  simulationsToday: number;
  systemHealth: 'healthy' | 'alert';
}

export default function AdminPage() {
  const { user, loading: authLoading, role } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Use useApiGet hook for admin data
  const {
    data: adminData,
    loading: adminDataLoading,
    error: adminDataError,
  } = useApiGet<AdminDashboardData>('/api/admin/dashboard', {
    autoFetch: true,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      setIsRedirecting(true);
      router.replace('/login');
    } else if (user && role !== 'admin') {
      setIsRedirecting(true);
      router.replace('/dashboard');
    }
  }, [user, authLoading, role, router]);

  // Loading state
  if (authLoading || isRedirecting || adminDataLoading) {
    return (
      <MechanicaLayout
        title="Loading | Admin Dashboard"
        description="Admin dashboard loading"
      >
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 flex items-center justify-center">
          <div className="text-center">
            {/* Mechanical Loading Gears */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0">
                <MechanicaGear size="xl" color="steel" speed="slow" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <MechanicaGear size="large" color="brass" speed="reverse" />
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-2 mechanica-heading-professional">
              Initializing System
            </p>
            <p className="text-sm text-gray-600 mechanica-text-technical">
              Loading admin dashboard...
            </p>
          </div>
        </div>
      </MechanicaLayout>
    );
  }

  // Handle error fetching admin data
  if (adminDataError) {
    return (
      <MechanicaLayout
        title="Error | Admin Dashboard"
        description="Error loading admin dashboard"
      >
        <div className="min-h-screen flex items-center justify-center">
          <MechanicaCard variant="mechanical" className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Error Loading Admin Data
            </h2>
            <p className="text-gray-700 mb-6">
              There was an issue fetching the dashboard information. Please try
              again later.
            </p>
            <MechanicaButton
              variant="mechanical"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </MechanicaButton>
          </MechanicaCard>
        </div>
      </MechanicaLayout>
    );
  }

  // Only render admin content if user is authenticated and is admin
  if (role !== 'admin' || !adminData) {
    return null; // Should be redirected by useEffect, but a safeguard
  }

  return (
    <MechanicaLayout
      title="System Control Panel | Admin Dashboard"
      description="Admin control panel for system management"
    >
      <Head>
        <title>System Control Panel | BeginnerInvestorHub</title>
        <meta
          name="description"
          content="Master engineering console for monitoring system components, user assemblies, and operational metrics. Deploy administrative controls with precision authority."
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50">
        {/* Technical Grid Overlay - Blueprint Pattern */}
        <div
          className="fixed inset-0 pointer-events-none opacity-5 bg-grid-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 61, 122, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 61, 122, 0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10 py-12">
          {/* Hero Section with Mechanical Elements */}
          <div className="text-center mb-12 relative">
            {/* Decorative Mechanical Gears */}
            <div className="absolute -top-6 left-0">
              <MechanicaGear size="large" color="steel" speed="slow" />
            </div>
            <div className="absolute top-2 right-8">
              <MechanicaGear size="medium" color="brass" speed="reverse" />
            </div>

            <MechanicaCard
              variant="mechanical"
              className="inline-flex items-center px-4 py-2 mb-4"
            >
              <div className="w-5 h-5 text-gray-700 mr-2">🔒</div>
              <span className="text-sm text-gray-700 font-medium mechanica-text-technical">
                Restricted Access - Admin Only
              </span>
            </MechanicaCard>

            <div className="flex justify-center items-center space-x-6 mb-8">
              <MechanicaGear size="xl" color="steel" speed="slow" />
              <h1 className="text-4xl md:text-5xl font-bold mechanica-heading-mechanical text-mechanica-moonlight-blue">
                System Control Panel
              </h1>
              <MechanicaGear size="xl" color="steel" speed="reverse" />
            </div>

            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mechanica-text-technical">
              <span className="font-semibold text-mechanica-moonlight-blue">
                Master Engineering Console:
              </span>{' '}
              Monitor all system components, user assemblies, and operational
              metrics. Deploy administrative controls with precision authority.
            </p>
          </div>

          {/* System Status Bar */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <MechanicaCard
              variant={
                adminData.systemHealth === 'healthy' ? 'mechanical' : 'wood'
              }
              className="inline-flex items-center px-4 py-2"
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                  adminData.systemHealth === 'healthy'
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
              ></div>
              <span
                className={`text-sm font-medium mechanica-text-technical ${
                  adminData.systemHealth === 'healthy'
                    ? 'text-gray-700'
                    : 'text-gray-700'
                }`}
              >
                System{' '}
                {adminData.systemHealth === 'healthy' ? 'Operational' : 'Alert'}
              </span>
            </MechanicaCard>
            <MechanicaCard
              variant="brass"
              className="inline-flex items-center px-4 py-2"
            >
              <div className="w-5 h-5 text-gray-700 mr-2">👤</div>
              <span className="text-sm text-gray-700 font-medium mechanica-text-technical">
                Admin: {user?.email || 'Administrator'}
              </span>
            </MechanicaCard>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <MechanicaCard variant="mechanical">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 text-blue-700">👥</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold mechanica-heading-professional text-mechanica-moonlight-blue">
                      {adminData.totalUsers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mechanica-text-technical">
                      Total Users
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Registered components
                </div>
              </div>
            </MechanicaCard>

            <MechanicaCard variant="brass">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MechanicaGear size="medium" color="steel" speed="medium" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold mechanica-heading-professional text-mechanica-moonlight-blue">
                      {adminData.activePortfolios.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mechanica-text-technical">
                      Active Portfolios
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Portfolio assemblies
                </div>
              </div>
            </MechanicaCard>

            <MechanicaCard variant="wood">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MechanicaGear size="medium" color="brass" speed="slow" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold mechanica-heading-professional text-mechanica-moonlight-blue">
                      {adminData.simulationsToday.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mechanica-text-technical">
                      Simulations Today
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Tests executed (24h)
                </div>
              </div>
            </MechanicaCard>
          </div>

          {/* Administrative Controls */}
          <MechanicaCard variant="mechanical" animated>
            <div className="p-8">
              <div className="mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <MechanicaGear size="medium" color="brass" speed="slow" />
                  <h2 className="text-2xl font-bold mechanica-heading-professional text-mechanica-text-primary">
                    ⚙️ Administrative Controls
                  </h2>
                </div>
                <p className="text-gray-600 mechanica-text-technical">
                  Access system management tools and configuration panels.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MechanicaButton
                  variant="wood"
                  className="text-left p-6 flex items-start space-x-4 h-auto"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="w-5 h-5 text-blue-700">👥</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1 mechanica-heading-professional">
                      User Management
                    </div>
                    <p className="text-sm text-gray-600 mechanica-text-technical">
                      Manage user accounts and permissions
                    </p>
                  </div>
                </MechanicaButton>

                <MechanicaButton
                  variant="wood"
                  className="text-left p-6 flex items-start space-x-4 h-auto"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MechanicaGear size="medium" color="steel" speed="medium" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1 mechanica-heading-professional">
                      System Analytics
                    </div>
                    <p className="text-sm text-gray-600 mechanica-text-technical">
                      View detailed usage statistics
                    </p>
                  </div>
                </MechanicaButton>

                <MechanicaButton
                  variant="wood"
                  className="text-left p-6 flex items-start space-x-4 h-auto"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MechanicaGear size="medium" color="brass" speed="slow" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1 mechanica-heading-professional">
                      System Configuration
                    </div>
                    <p className="text-sm text-gray-600 mechanica-text-technical">
                      Adjust system settings and parameters
                    </p>
                  </div>
                </MechanicaButton>

                <MechanicaButton
                  variant="wood"
                  className="text-left p-6 flex items-start space-x-4 h-auto"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <div className="w-5 h-5 text-amber-700">⚠️</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1 mechanica-heading-professional">
                      Security Logs
                    </div>
                    <p className="text-sm text-gray-600 mechanica-text-technical">
                      Review system security events
                    </p>
                  </div>
                </MechanicaButton>

                <MechanicaButton
                  variant="wood"
                  className="text-left p-6 flex items-start space-x-4 h-auto"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <MechanicaGear
                      size="medium"
                      color="copper"
                      speed="reverse"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1 mechanica-heading-professional">
                      Database Management
                    </div>
                    <p className="text-sm text-gray-600 mechanica-text-technical">
                      Backup and maintenance operations
                    </p>
                  </div>
                </MechanicaButton>

                <MechanicaButton
                  variant="wood"
                  className="text-left p-6 flex items-start space-x-4 h-auto"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <div className="w-5 h-5 text-indigo-700">📄</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1 mechanica-heading-professional">
                      System Reports
                    </div>
                    <p className="text-sm text-gray-600 mechanica-text-technical">
                      Generate and export system reports
                    </p>
                  </div>
                </MechanicaButton>
              </div>
            </div>
          </MechanicaCard>

          {/* Security Notice */}
          <div className="mt-12 text-center">
            <MechanicaCard
              variant="wood"
              className="inline-flex items-center px-6 py-3"
            >
              <div className="flex items-center space-x-3">
                <MechanicaGear size="small" color="steel" speed="medium" />
                <span className="text-sm text-gray-700 font-medium mechanica-text-technical">
                  All administrative actions are logged and monitored for
                  security compliance
                </span>
              </div>
            </MechanicaCard>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
