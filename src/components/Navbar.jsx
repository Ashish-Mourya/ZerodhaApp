import { Bell, TrendingDown } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
      <div className="flex items-center gap-4">
        <div className="text-xs">
          <span className="font-medium">NIFTY 50</span>
          <span className="ml-2 text-red-600">18181.75</span>
          <span className="ml-1 text-red-600 text-[11px]">
            -104.75 (-0.57%)
          </span>
        </div>
        <div className="text-xs">
          <span className="font-medium">SENSEX</span>
          <span className="ml-2 text-red-600">61560.64</span>
          <span className="ml-1 text-red-600 text-[11px]">
            -371.83 (-0.60%)
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">D</span>
          </div>
          <span className="text-sm font-medium">DEMOUSER</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

