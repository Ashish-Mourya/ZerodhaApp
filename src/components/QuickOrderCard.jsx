import { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, Zap, Activity, BarChart3, Sparkles } from 'lucide-react';

const QuickOrderCard = ({ stock, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(stock?.price.toFixed(2) || '0.00');
  const [orderType, setOrderType] = useState('BUY');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  if (!stock) return null;

  const isPositive = stock.change >= 0;
  const totalAmount = (quantity * parseFloat(price)).toFixed(2);

  return (
    <>
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Quick Order Card - Centered & Scrollable */}
      <div 
        className={`fixed z-50 bg-white rounded-3xl shadow-2xl w-[420px] max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Header - Animated Gradient Background */}
        <div className="relative overflow-hidden rounded-t-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
          
          <div className="relative px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-white opacity-20 blur-xl rounded-full animate-pulse"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                    <Activity className="w-6 h-6 text-white animate-pulse" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-bold text-white text-lg">{stock.symbol}</div>
                    <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                  </div>
                  <div className="text-xs text-white/80 flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    NSE • Quick Trade
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-xl transition-all flex items-center justify-center hover:rotate-90 duration-300 border border-white/20"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Current Price Display - Glassmorphism */}
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/70 mb-1 flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    Last Traded Price
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">₹{stock.price.toFixed(2)}</div>
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${
                    isPositive ? 'bg-green-500/30' : 'bg-red-500/30'
                  }`}>
                    {isPositive ? <TrendingUp className="w-4 h-4 text-green-200" /> : <TrendingDown className="w-4 h-4 text-red-200" />}
                    <span className="text-sm font-bold text-white">
                      {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePct.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                    <BarChart3 className="w-8 h-8 text-white/70" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Type Buttons */}
        <div className="p-5">
          <div className="flex gap-3 mb-5">
            <button
              onClick={() => setOrderType('BUY')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 ${
                orderType === 'BUY'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                BUY
              </span>
            </button>
            <button
              onClick={() => setOrderType('SELL')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all transform hover:scale-105 ${
                orderType === 'SELL'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/50'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                SELL
              </span>
            </button>
          </div>

          {/* Inputs Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Quantity Input */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Qty"
                min="1"
              />
            </div>

            {/* Price Input */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.05"
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Price"
              />
            </div>
          </div>

          {/* Order Type Selection */}
          <div className="mb-4">
            <label className="text-xs font-bold text-gray-700 block mb-2">
              Order Type
            </label>
            <select className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white">
              <option>Market Order</option>
              <option>Limit Order</option>
              <option>Stop Loss</option>
              <option>Stop Loss Market</option>
            </select>
          </div>

          {/* Product Type */}
          <div className="mb-5 p-3 bg-gray-50 rounded-xl">
            <div className="text-xs font-bold text-gray-700 mb-2">Product</div>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                <input type="radio" name="product" defaultChecked className="text-blue-500 w-4 h-4" />
                <span className="text-xs font-semibold">MIS</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                <input type="radio" name="product" className="text-blue-500 w-4 h-4" />
                <span className="text-xs font-semibold">CNC</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                <input type="radio" name="product" className="text-blue-500 w-4 h-4" />
                <span className="text-xs font-semibold">NRML</span>
              </label>
            </div>
          </div>

          {/* Total Amount Display */}
          <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-gray-600 mb-1">Order Value</div>
                <div className="text-2xl font-bold text-gray-900">₹{totalAmount}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600">Quantity × Price</div>
                <div className="text-sm font-semibold text-gray-700">{quantity} × ₹{price}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            className={`w-full py-4 rounded-2xl font-bold text-base shadow-2xl transition-all transform hover:scale-105 active:scale-95 mb-3 relative overflow-hidden group ${
              orderType === 'BUY'
                ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white shadow-blue-500/50'
                : 'bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white shadow-red-500/50'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="relative flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              {orderType === 'BUY' ? 'Place Buy Order' : 'Place Sell Order'}
            </span>
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 border-2 border-gray-300 rounded-2xl font-semibold text-sm text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all hover:shadow-lg"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </>
  );
};

export default QuickOrderCard;

