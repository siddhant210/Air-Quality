import { useState } from 'react';
import { Home, TrendingDown, Navigation, Brain, MessageCircle, BarChart3 } from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import ForecastPage from './pages/ForecastPage';
import SafeRoutePage from './pages/SafeRoutePage';
import InsightsPage from './pages/InsightsPage';
import PolicyDashboard from './pages/PolicyDashboard';

type Page = 'home' | 'forecast' | 'route' | 'insights' | 'chatbot' | 'dashboard';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'forecast':
        return <ForecastPage />;
      case 'route':
        return <SafeRoutePage />;
      case 'insights':
        return <InsightsPage />;
      case 'dashboard':
        return <PolicyDashboard />;
      default:
        return <HomePage />;
    }
  };

  const navItems = [
    { id: 'home' as Page, icon: Home, label: 'Home' },
    { id: 'forecast' as Page, icon: TrendingDown, label: 'Forecast' },
    { id: 'route' as Page, icon: Navigation, label: 'Routes' },
    { id: 'insights' as Page, icon: Brain, label: 'Insights' },
    { id: 'dashboard' as Page, icon: BarChart3, label: 'Policy' }
  ];

  return (
    <div className="min-h-screen bg-[#f5f7f7]">
      <header className="bg-gradient-to-r from-[#006d6d] to-[#008b8b] text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌤️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">ClearAir AI</h1>
                <p className="text-xs text-white/70">Delhi-NCR Air Quality</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Live</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-6">
        {renderPage()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-30">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#006d6d] bg-[#006d6d]/10'
                    : 'text-gray-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <aside className="hidden md:block fixed left-4 top-24 w-64 bg-white rounded-2xl shadow-lg p-4 z-30">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#006d6d] to-[#008b8b] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-gradient-to-br from-[#ffb400]/20 to-[#ff9500]/20 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">🎯 Quick Stats</h4>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex justify-between">
                <span>Stations:</span>
                <span className="font-semibold">6 active</span>
              </div>
              <div className="flex justify-between">
                <span>Last Update:</span>
                <span className="font-semibold">2 min ago</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-semibold text-green-600">● Online</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="hidden md:block fixed left-0 top-0 bottom-0 w-72"></div>

      <Chatbot />
    </div>
  );
}

export default App;
