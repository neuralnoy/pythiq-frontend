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
  ResponsiveContainer,
  Legend
} from 'recharts';
import toast from 'react-hot-toast';
import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

const Usage = () => {
  const [chatUsageData, setChatUsageData] = useState([]);
  const [documentUsageData, setDocumentUsageData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsageData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch chat token usage
        const chatResponse = await axios.get(`http://localhost:8000/api/usage/tokens`, {
          params: {
            month: selectedMonth
          },
          withCredentials: true
        });

        // Fetch document token usage
        const docResponse = await axios.get(`http://localhost:8000/api/usage/document-tokens`, {
          params: {
            month: selectedMonth
          },
          withCredentials: true
        });

        console.log('Raw chat data:', chatResponse.data);
        console.log('Raw doc data:', docResponse.data);

        // Process chat data (timestamps with Z suffix)
        const chatData = chatResponse.data.map(item => {
          // For dates without time, append T00:00:00Z to treat as UTC midnight
          const timestamp = item.timestamp.includes('T') 
            ? item.timestamp 
            : `${item.timestamp}T00:00:00Z`;
          return {
            timestamp,
            total_tokens: item.total_tokens
          };
        }).sort((a, b) => a.timestamp.localeCompare(b.timestamp));

        // Process document data (timestamps without Z suffix)
        const docData = docResponse.data.map(item => {
          // For dates without time, append T00:00:00Z to treat as UTC midnight
          const timestamp = item.timestamp.includes('T') 
            ? item.timestamp 
            : `${item.timestamp}T00:00:00Z`;
          return {
            timestamp,
            total_tokens: item.total_tokens
          };
        });

        // Aggregate document data by local day
        const docAggregated = docData.reduce((acc, item) => {
          const date = parseISO(item.timestamp);
          const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
          const key = format(localDate, 'yyyy-MM-dd');
          
          if (!acc[key]) {
            acc[key] = {
              timestamp: key + 'T00:00:00Z',
              total_tokens: 0
            };
          }
          acc[key].total_tokens += item.total_tokens;
          return acc;
        }, {});

        const docDataAggregated = Object.values(docAggregated).sort((a, b) => 
          a.timestamp.localeCompare(b.timestamp)
        );

        console.log('Final processed chat data:', chatData);
        console.log('Final processed doc data:', docDataAggregated);

        setChatUsageData(chatData);
        setDocumentUsageData(docDataAggregated);
      } catch (error) {
        console.error('Error fetching usage data:', error);
        setError(error.response?.data?.detail || 'Failed to fetch usage data');
        toast.error('Failed to fetch usage data. Please try again.');
      }
      setIsLoading(false);
    };

    fetchUsageData();
  }, [selectedMonth]);

  const formatXAxis = (timestamp) => {
    try {
      // Parse UTC timestamp and format in local time
      const date = parseISO(timestamp);
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return format(localDate, 'MMM d');
    } catch (error) {
      console.error('Error formatting timestamp:', timestamp, error);
      return '';
    }
  };

  const formatTooltipLabel = (timestamp) => {
    try {
      // Parse UTC timestamp and format in local time
      const date = parseISO(timestamp);
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return format(localDate, 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting tooltip timestamp:', timestamp, error);
      return 'Invalid Date';
    }
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
        </div>

        {/* Chat Token Usage Chart */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title mb-4">Chat Token Usage</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chatUsageData}
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
                      labelFormatter={formatTooltipLabel}
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

        {/* Document Token Usage Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Document Processing Token Usage</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={documentUsageData}
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
                      labelFormatter={formatTooltipLabel}
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