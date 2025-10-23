import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import PortfolioCard from './PortfolioCard';
import StockChart from './StockChart';

const holdings = [
  { symbol: 'USDINR 23JUN FUT (NRML)', color: '#ef4444' },
  { symbol: '11th 23MAY 18700 CE (NRML)', color: '#f97316' },
  { symbol: 'USDINR 23MAY FUT (NRML)', color: '#fb923c' },
  { symbol: '11th 23MAY 18750 CE (NRML)', color: '#fdba74' },
];

const positions = [
  { product: 'CO', qty: '0 / 1', ltp: 49.30, price: '0.00 / 48.50', status: 'OPEN' },
  { product: 'CO', qty: '0 / 1', ltp: 49.30, price: '49.50 / 48.50', status: 'OPEN' },
  { product: 'NRML', qty: '0 / 3', ltp: 82.4225, price: 81.0000, status: 'OPEN' },
  { product: 'MIS', qty: '0 / 1', ltp: 82.4225, price: 81.0000, status: 'OPEN' },
];

const Dashboard = ({ selectedTab }) => {
  const pieChartRef = useRef(null);

  useEffect(() => {
    if (pieChartRef.current && selectedTab === 'dashboard') {
      const chart = echarts.init(pieChartRef.current);
      const option = {
        tooltip: { trigger: 'item' },
        series: [
          {
            type: 'bar',
            data: [
              { value: 4200, itemStyle: { color: '#3b82f6' } },
              { value: 3800, itemStyle: { color: '#06b6d4' } },
              { value: 2800, itemStyle: { color: '#8b5cf6' } },
              { value: 2200, itemStyle: { color: '#a855f7' } },
              { value: 1800, itemStyle: { color: '#06b6d4' } },
              { value: 1600, itemStyle: { color: '#14b8a6' } },
              { value: 1200, itemStyle: { color: '#10b981' } },
              { value: 800, itemStyle: { color: '#84cc16' } },
              { value: 600, itemStyle: { color: '#eab308' } },
              { value: 400, itemStyle: { color: '#f59e0b' } },
            ],
            barWidth: 24,
            label: { show: false },
          },
        ],
        xAxis: { show: false },
        yAxis: { show: false },
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
      };
      chart.setOption(option);
      return () => chart.dispose();
    }
  }, [selectedTab]);

  if (selectedTab === 'dashboard') {
    return (
      <div className="p-6">
        {/* Warning Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 flex items-center gap-2">
          <span className="text-yellow-600 text-xl">⚠</span>
          <span className="text-sm text-gray-700">
            This is a demo platform with dummy data.{' '}
            <a href="#" className="text-blue-600 font-medium">
              Signup now
            </a>{' '}
            to access the live platform.
          </span>
        </div>

        {/* Greeting */}
        <h1 className="text-2xl font-light text-gray-900 mb-6">Hi, Demo</h1>

        {/* Portfolio Cards */}
        <div className="grid grid-cols-2 gap-5 mb-6">
          <PortfolioCard
            title="Equity"
            amount="1L"
            marginsUsed="0"
            openingBalance="1L"
            icon="equity"
          />
          <PortfolioCard
            title="Commodity"
            amount="50k"
            marginsUsed="0"
            openingBalance="50k"
            icon="commodity"
          />
        </div>

        {/* Holdings Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-600 rounded-sm"></div>
            </div>
            <span className="text-sm font-medium text-gray-900">Holdings (17)</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <div className="text-3xl font-light text-green-600 mb-1">
                2.24k
                <span className="text-sm ml-2">+16.90%</span>
              </div>
              <div className="text-xs text-gray-500">P&L</div>
            </div>
            <div className="flex-1 min-w-0">
              <div ref={pieChartRef} className="h-20"></div>
            </div>
            <div className="text-right text-xs text-gray-600 flex-shrink-0">
              <div className="mb-2">
                <div className="text-gray-500">Current value</div>
                <div className="font-medium text-gray-900">15.46k</div>
              </div>
              <div>
                <div className="text-gray-500">Investment</div>
                <div className="font-medium text-gray-900">13.23k</div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview & Positions */}
        <div className="grid grid-cols-2 gap-5">
          <StockChart type="line" />

          <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded bg-gray-100"></div>
              <span className="text-sm font-medium text-gray-900">Positions (8)</span>
            </div>
            <div className="space-y-2">
              {holdings.map((holding, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                  <div
                    className="w-32 h-3 rounded"
                    style={{ backgroundColor: holding.color }}
                  ></div>
                  <span className="flex-1">{holding.symbol}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedTab === 'orders') {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 p-5">
            <div className="flex items-center gap-1">
              <button className="px-4 py-2.5 text-sm font-semibold text-orange-600 bg-white border-b-3 rounded-t-lg shadow-sm">
                Orders
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-t-lg transition-colors">
                GTT
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-t-lg transition-colors">
                Baskets
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-t-lg transition-colors">
                SIP
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-t-lg transition-colors">
                Alerts
              </button>
            </div>
          </div>
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-600 border-b-2 border-gray-200 bg-gray-50">
                  <th className="pb-3 pt-3 px-4">Product</th>
                  <th className="pb-3 pt-3 px-4">Qty.</th>
                  <th className="pb-3 pt-3 px-4">LTP</th>
                  <th className="pb-3 pt-3 px-4">Price</th>
                  <th className="pb-3 pt-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((pos, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-semibold text-gray-800">{pos.product}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{pos.qty}</td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{pos.ltp}</td>
                    <td className="py-4 px-4 text-sm text-gray-700">{pos.price}</td>
                    <td className="py-4 px-4">
                      <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1.5 rounded-full">
                        {pos.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 text-center text-gray-500">
      <p>Select a tab to view content</p>
    </div>
  );
};

export default Dashboard;

