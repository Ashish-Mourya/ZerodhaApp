import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import QuickOrderCard from './components/QuickOrderCard';
import StockDetailChart from './components/StockDetailChart';
import './App.css';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [quickOrder, setQuickOrder] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleStockClick = (stock, showChart = false) => {
    if (showChart) {
      setSelectedStock(stock);
    } else {
      setQuickOrder({ stock });
    }
  };

  const closeQuickOrder = () => {
    setQuickOrder(null);
  };

  const closeStockChart = () => {
    setSelectedStock(null);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar onStockClick={handleStockClick} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Top Navigation Bar */}
        <Navbar />

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <div className="flex items-center gap-8 px-6">
            {['Dashboard', 'Orders', 'Holdings', 'Positions', 'Bids', 'Funds'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab.toLowerCase())}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === tab.toLowerCase()
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <Dashboard selectedTab={selectedTab} />
        </div>
      </div>

      {/* Quick Order Card */}
      {quickOrder && (
        <QuickOrderCard 
          stock={quickOrder.stock}
          onClose={closeQuickOrder} 
        />
      )}

      {/* Stock Detail Chart */}
      <StockDetailChart stock={selectedStock} onClose={closeStockChart} />
    </div>
  );
};

export default App;
