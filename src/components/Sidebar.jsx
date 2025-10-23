import { Search, TrendingUp, TrendingDown } from 'lucide-react';

const stocks = [
  { symbol: 'SENSEX', index: true, price: 61560.64, change: -371.83, changePct: -0.60 },
  { symbol: 'NIFTY 50', index: true, event: true, price: 18181.75, change: -104.75, changePct: -0.57 },
  { symbol: 'ASTRON', price: 26.05, change: -0.35, changePct: -1.33 },
  { symbol: 'ASIANPAINT', price: 3092.45, change: -45.65, changePct: -1.45 },
  { symbol: 'RITES', price: 396.50, change: 8.15, changePct: 2.10 },
  { symbol: 'BHEL', bse: true, price: 82.30, change: 0.74, changePct: 0.91 },
  { symbol: 'RELIANCE', price: 2439.30, change: -14.50, changePct: -0.59 },
  { symbol: 'NIFTYBEES', bse: true, price: 199.79, change: -0.76, changePct: -0.38 },
  { symbol: 'SAIL', bse: true, price: 82.85, change: -1.19, changePct: -1.42 },
  { symbol: 'WIPRO', price: 382.30, change: -4.65, changePct: -1.20 },
];

const Sidebar = ({ onStockClick }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-xs text-gray-500">20 / 50</span>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search (infy bse, nifty fut, etc)"
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Watchlist */}
      <div className="flex-1 overflow-y-auto">
        {stocks.map((stock, i) => (
          <div
            key={i}
            className="px-3 py-2 hover:bg-gray-50 border-b border-gray-100 group"
          >
            <div className="flex items-start justify-between">
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => onStockClick(stock, true)}
                title="Click to view chart"
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-xs font-medium text-gray-900 group-hover:text-blue-600">
                    {stock.symbol}
                  </span>
                  {stock.index && (
                    <span className="text-[10px] text-gray-500">INDEX</span>
                  )}
                  {stock.event && (
                    <span className="text-[10px] text-blue-600">EVENT</span>
                  )}
                  {stock.bse && (
                    <span className="text-[10px] text-gray-500">BSE</span>
                  )}
                </div>
              </div>
              <div 
                className="text-right cursor-pointer"
                onClick={() => onStockClick(stock, false)}
                title="Click to place order"
              >
                <div className="text-xs font-medium text-gray-900">
                  {stock.price.toFixed(2)}
                </div>
                <div
                  className={`text-[10px] flex items-center justify-end gap-0.5 ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stock.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>
                    {stock.change.toFixed(2)} ({stock.changePct.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="p-3 border-t border-gray-200 flex justify-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((page) => (
          <button
            key={page}
            className={`w-8 h-8 text-xs rounded ${
              page === 1
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

