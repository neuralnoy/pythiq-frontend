// src/pages/Search.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import toast from 'react-hot-toast';

const Usage = () => {
  const [usageData, setUsageData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [selectedWindow, setSelectedWindow] = useState('1d');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsageData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8000/api/usage/tokens`, {
          params: {
            month: selectedMonth,
            window: selectedWindow
          },
          withCredentials: true
        });
        setUsageData(response.data);
      } catch (error) {
        console.error('Error fetching usage data:', error);
        setError(error.response?.data?.detail || 'Failed to fetch usage data');
        toast.error('Failed to fetch usage data. Please try again.');
      }
      setIsLoading(false);
    };

    fetchUsageData();
  }, [selectedMonth, selectedWindow]);

  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp);
    if (selectedWindow === '1d') {
      return date.toLocaleDateString('en-US', { day: 'numeric' });
    }
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value;
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-col items-center justify-center h-64">
                <h2 className="text-xl font-bold text-error mb-4">Something went wrong!</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-8">
          <div className="flex gap-4">
            <select
              className="select select-bordered w-full max-w-xs"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                return (
                  <option key={value} value={value}>
                    {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </option>
                );
              })}
            </select>
            <select
              className="select select-bordered w-full max-w-xs"
              value={selectedWindow}
              onChange={(e) => setSelectedWindow(e.target.value)}
            >
              <option value="15m">15 Minutes</option>
              <option value="1h">1 Hour</option>
              <option value="1d">1 Day</option>
            </select>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Token Usage</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={usageData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid 
                      vertical={false}
                      stroke="#e5e7eb"
                    />
                    <XAxis
                      dataKey="timestamp"
                      tickFormatter={formatXAxis}
                      stroke="hsl(var(--bc) / 0.5)"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--bc) / 0.5)"
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={formatYAxis}
                    />
                    <Tooltip
                      labelFormatter={(label) => new Date(label).toLocaleString()}
                      formatter={(value) => [formatYAxis(value), 'Total Tokens']}
                    />
                    <Area 
                      type="monotone"
                      dataKey="total_tokens" 
                      stroke="oklch(var(--p))"
                      fill="oklch(var(--p) / 0.2)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usage;