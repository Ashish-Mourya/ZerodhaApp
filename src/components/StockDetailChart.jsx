import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { X, TrendingUp, TrendingDown } from 'lucide-react';

const StockDetailChart = ({ stock, onClose }) => {
  const chartRef = useRef(null);

  const generateStockData = (basePrice) => {
    const data = [];
    let price = basePrice;
    const now = new Date();
    
    for (let i = 90; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      const change = (Math.random() - 0.48) * (basePrice * 0.02);
      price = Math.max(basePrice * 0.7, Math.min(basePrice * 1.3, price + change));
      
      const open = price;
      const close = price + (Math.random() - 0.5) * (basePrice * 0.015);
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.01);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.01);
      
      data.push({
        date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        values: [open, close, low, high],
        volume: Math.floor(Math.random() * 1000000) + 500000
      });
    }
    return data;
  };

  useEffect(() => {
    if (chartRef.current && stock) {
      const chart = echarts.init(chartRef.current);
      const stockData = generateStockData(stock.price);
      
      const dates = stockData.map(item => item.date);
      const candlestickData = stockData.map(item => item.values);
      const volumes = stockData.map(item => item.volume);

      const option = {
        backgroundColor: '#fff',
        animation: true,
        legend: {
          data: ['Candlestick', 'Volume'],
          top: 10,
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: '#ddd',
          borderWidth: 1,
          textStyle: {
            color: '#333'
          },
          formatter: function (params) {
            let result = `<div style="font-weight: bold; margin-bottom: 5px;">${params[0].axisValue}</div>`;
            if (params[0] && params[0].data) {
              const data = params[0].data;
              result += `
                <div style="margin: 3px 0;">Open: ₹${data[0].toFixed(2)}</div>
                <div style="margin: 3px 0;">Close: ₹${data[1].toFixed(2)}</div>
                <div style="margin: 3px 0;">Low: ₹${data[2].toFixed(2)}</div>
                <div style="margin: 3px 0;">High: ₹${data[3].toFixed(2)}</div>
              `;
            }
            if (params[1]) {
              result += `<div style="margin: 3px 0;">Volume: ${(params[1].data / 1000).toFixed(1)}K</div>`;
            }
            return result;
          }
        },
        axisPointer: {
          link: [{ xAxisIndex: 'all' }]
        },
        grid: [
          {
            left: '8%',
            right: '5%',
            top: '15%',
            height: '55%'
          },
          {
            left: '8%',
            right: '5%',
            top: '75%',
            height: '15%'
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: dates,
            boundaryGap: false,
            axisLine: { lineStyle: { color: '#8392A5' } },
            axisLabel: {
              formatter: function (value) {
                return value;
              }
            },
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
              show: true
            }
          },
          {
            type: 'category',
            gridIndex: 1,
            data: dates,
            boundaryGap: false,
            axisLine: { lineStyle: { color: '#8392A5' } },
            axisLabel: { show: false },
            min: 'dataMin',
            max: 'dataMax'
          }
        ],
        yAxis: [
          {
            scale: true,
            splitLine: {
              lineStyle: {
                color: '#f0f0f0'
              }
            },
            axisLine: { lineStyle: { color: '#8392A5' } },
            axisLabel: {
              formatter: '₹{value}'
            }
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 70,
            end: 100
          },
          {
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            bottom: '5%',
            start: 70,
            end: 100,
            height: 20
          }
        ],
        series: [
          {
            name: 'Candlestick',
            type: 'candlestick',
            data: candlestickData,
            itemStyle: {
              color: '#26a69a',
              color0: '#ef5350',
              borderColor: '#26a69a',
              borderColor0: '#ef5350'
            },
            emphasis: {
              itemStyle: {
                color: '#26a69a',
                color0: '#ef5350',
                borderColor: '#26a69a',
                borderColor0: '#ef5350'
              }
            }
          },
          {
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: volumes,
            itemStyle: {
              color: function(params) {
                const dataIndex = params.dataIndex;
                if (dataIndex === 0) return '#26a69a';
                const current = candlestickData[dataIndex];
                const prev = candlestickData[dataIndex - 1];
                return current[1] > prev[1] ? '#26a69a' : '#ef5350';
              }
            }
          }
        ]
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, [stock]);

  if (!stock) return null;

  const isPositive = stock.change >= 0;

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col overflow-hidden">
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">{stock.symbol}</h2>
                {stock.index && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded font-medium">
                    INDEX
                  </span>
                )}
                {stock.bse && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded font-medium">
                    BSE
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xl font-bold text-gray-900">
                  ₹{stock.price.toFixed(2)}
                </span>
                <span
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5" />
                  )}
                  {stock.change.toFixed(2)} ({stock.changePct.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-1.5 bg-blue-500 text-white rounded-md text-sm font-semibold hover:bg-blue-600 transition-colors">
              Buy
            </button>
            <button className="px-5 py-1.5 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition-colors">
              Sell
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-4 flex-shrink-0">
        <div className="flex gap-4">
          <button className="py-2.5 text-xs font-semibold border-b-2 border-blue-500 text-blue-600">
            Chart
          </button>
          <button className="py-2.5 text-xs font-medium text-gray-600 hover:text-gray-900">
            Market Depth
          </button>
          <button className="py-2.5 text-xs font-medium text-gray-600 hover:text-gray-900">
            Fundamentals
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 bg-gray-50 overflow-auto min-h-0">
        <div className="bg-white rounded-lg border border-gray-200 p-3 h-full min-h-[500px]">
          <div ref={chartRef} className="w-full h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default StockDetailChart;

