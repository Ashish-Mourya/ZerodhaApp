import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { TrendingUp } from 'lucide-react';

const StockChart = ({ type = 'line' }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      
      if (type === 'line') {
        const option = {
          grid: { left: 50, right: 20, top: 20, bottom: 30 },
          xAxis: {
            type: 'category',
            data: Array.from({ length: 50 }, (_, i) => i),
            show: false,
          },
          yAxis: {
            type: 'value',
            splitLine: { lineStyle: { color: '#f0f0f0' } },
          },
          series: [
            {
              data: [
                17800, 17850, 17900, 18000, 18100, 18200, 18300, 18400, 18500,
                18550, 18600, 18650, 18700, 18750, 18800, 18850, 18900, 18950,
                19000, 18950, 18900, 18850, 18800, 18750, 18700, 18650, 18600,
                18700, 18800, 18900, 19000, 19100, 19200, 19100, 19000, 18900,
                18800, 18700, 18600, 18500, 18400, 18500, 18600, 18700, 18800,
                18900, 18850, 18800, 18750, 18700,
              ],
              type: 'line',
              smooth: true,
              symbol: 'none',
              lineStyle: { color: '#2563eb', width: 2 },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(37, 99, 235, 0.3)' },
                  { offset: 1, color: 'rgba(37, 99, 235, 0.05)' },
                ]),
              },
            },
          ],
        };
        chart.setOption(option);
      } else {
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
      }
      
      return () => chart.dispose();
    }
  }, [type]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-900">
          {type === 'line' ? 'Market overview' : 'Holdings Chart'}
        </span>
      </div>
      <div ref={chartRef} className="h-48"></div>
    </div>
  );
};

export default StockChart;

