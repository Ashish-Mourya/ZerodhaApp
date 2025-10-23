import { TrendingUp } from 'lucide-react';

const PortfolioCard = ({ title, amount, marginsUsed, openingBalance, icon }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          {icon === 'equity' ? (
            <TrendingUp className="w-4 h-4 text-gray-600" />
          ) : (
            <div className="w-4 h-4 rounded-full border-2 border-gray-600"></div>
          )}
        </div>
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </div>
      <div className="text-4xl font-light text-gray-900 mb-4">{amount}</div>
      <div className="space-y-2 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Margins used</span>
          <span className="font-medium text-gray-900">{marginsUsed}</span>
        </div>
        <div className="flex justify-between">
          <span>Opening balance</span>
          <span className="font-medium text-gray-900">{openingBalance}</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200">
        <span className="text-xs text-gray-500">Margin available</span>
      </div>
      <button className="mt-3 text-xs text-blue-600 hover:underline">
        View statement
      </button>
    </div>
  );
};

export default PortfolioCard;

