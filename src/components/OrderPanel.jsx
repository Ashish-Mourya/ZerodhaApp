import { useState } from 'react';
import { X, Menu } from 'lucide-react';

const OrderPanel = ({ stock, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('0.05');

  if (!stock) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-fade-in">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-lg">{stock.symbol}</div>
              <div className="text-xs opacity-90 mt-1">NSE • Last Price: ₹{stock.price}</div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-blue-800 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex gap-2 mb-5">
            <button className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 text-white py-3 rounded-lg text-base font-bold shadow-md hover:shadow-lg transition-all">
              BUY
            </button>
            <button className="flex-1 bg-gradient-to-br from-red-500 to-red-600 text-white py-3 rounded-lg text-base font-bold shadow-md hover:shadow-lg transition-all">
              SELL
            </button>
            <button className="p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="border-b border-gray-200 mb-5">
            <div className="flex gap-1">
              <button className="px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 border-b-3 border-blue-600 rounded-t-lg">
                Quick
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-t-lg transition-colors">
                Regular
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-t-lg transition-colors">Cover</button>
              <button className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-t-lg transition-colors">AMO</button>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-sm font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Enter quantity"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.05"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-sm font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Enter price"
              />
            </div>

            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <input type="checkbox" id="intraday" className="w-4 h-4 text-blue-600 rounded" />
              <label htmlFor="intraday" className="text-sm font-medium text-gray-700">
                Intraday MIS
              </label>
            </div>

            <div className="flex justify-between text-xs font-medium text-gray-600 bg-gray-50 p-3 rounded-lg">
              <span>Amount: <span className="text-gray-900 font-semibold">N/A</span></span>
              <span>Charges: <span className="text-gray-900 font-semibold">N/A</span></span>
            </div>

            <button className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white py-3.5 rounded-lg font-bold text-base shadow-md hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all">
              Place Order
            </button>

            <button
              onClick={onClose}
              className="w-full border-2 border-gray-300 text-gray-700 py-3.5 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPanel;

