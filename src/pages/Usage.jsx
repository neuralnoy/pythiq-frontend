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
import { format, parseISO, getDaysInMonth, startOfMonth, addDays } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

const Usage = () => {
  const [chatUsageData, setChatUsageData] = useState([]);
  const [documentUsageData, setDocumentUsageData] = useState([]);
  const [totalMonthlyTokens, setTotalMonthlyTokens] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to generate all days in the selected month
  const generateMonthDays = (yearMonth) => {
    const [year, month] = yearMonth.split('-').map(Number);
    const startDate = startOfMonth(new Date(year, month - 1));
    const daysInMonth = getDaysInMonth(startDate);
    
    return Array.from({ length: daysInMonth }, (_, index) => {
      const date = addDays(startDate, index);
      return {
        timestamp: format(date, 'yyyy-MM-dd') + 'T00:00:00Z',
        total_tokens: 0
      };
    });
  };

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

        // Generate all days of the month
        const allDays = generateMonthDays(selectedMonth);
        const daysMap = new Map(allDays.map(day => [day.timestamp.split('T')[0], day]));

        // Process chat data
        chatResponse.data.forEach(item => {
          const timestamp = item.timestamp.includes('T') 
            ? item.timestamp 
            : `${item.timestamp}T00:00:00Z`;
          const dateKey = timestamp.split('T')[0];
          if (daysMap.has(dateKey)) {
            daysMap.set(dateKey, {
              timestamp: timestamp,
              total_tokens: item.total_tokens
            });
          }
        });

        // Convert map back to array and sort by date
        const chatData = Array.from(daysMap.values())
          .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

        // Process document data with all days
        const docDaysMap = new Map(generateMonthDays(selectedMonth).map(day => [day.timestamp.split('T')[0], day]));

        docResponse.data.forEach(item => {
          const timestamp = item.timestamp.includes('T') 
            ? item.timestamp 
            : `${item.timestamp}T00:00:00Z`;
          const date = parseISO(timestamp);
          const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
          const dateKey = format(localDate, 'yyyy-MM-dd');
          
          if (docDaysMap.has(dateKey)) {
            const existing = docDaysMap.get(dateKey);
            docDaysMap.set(dateKey, {
              timestamp: existing.timestamp,
              total_tokens: (existing.total_tokens || 0) + item.total_tokens
            });
          }
        });

        const docDataAggregated = Array.from(docDaysMap.values())
          .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

        // Calculate cumulative totals for the month
        const combinedData = chatData.map((item, index) => {
          const dailyTotal = item.total_tokens + (docDataAggregated[index]?.total_tokens || 0);
          let cumulative = dailyTotal;
          if (index > 0) {
            const prevData = chatData.map((item, i) => {
              if (i >= index) return 0;
              return item.total_tokens + (docDataAggregated[i]?.total_tokens || 0);
            }).reduce((sum, current) => sum + current, 0);
            cumulative += prevData;
          }
          return cumulative;
        });

        // Get the last cumulative total
        const monthEndTotal = combinedData[combinedData.length - 1] || 0;
        setTotalMonthlyTokens(monthEndTotal);

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

  const calculateCost = (totalTokens) => {
    const freeTokens = 5000000; // 5M tokens included in base fee
    const baseFee = 20; // $20 base fee
    const additionalTokens = Math.max(0, totalTokens - freeTokens);
    const additionalCost = (additionalTokens / 1000000) * 5; // $5 per million tokens, proportionally calculated
    const totalCost = +(baseFee + additionalCost).toFixed(2); // Round to 2 decimal places
    return {
      total: totalCost,
      base: baseFee,
      additional: +additionalCost.toFixed(2)
    };
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
        <div className="flex justify-between items-center mb-8">
          <div className="card bg-base-100 shadow-xl p-4">
            <div className="text-sm font-semibold mb-2">Monthly Cost Estimation</div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total Tokens</div>
                <div className="stat-value text-primary">{formatYAxis(totalMonthlyTokens)}</div>
                <div className="stat-desc">
                  {totalMonthlyTokens > 5000000 
                    ? `${formatYAxis(totalMonthlyTokens - 5000000)} tokens over free tier` 
                    : `${formatYAxis(5000000 - totalMonthlyTokens)} tokens remaining in free tier`}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Estimated Cost</div>
                {(() => {
                  const cost = calculateCost(totalMonthlyTokens);
                  return (
                    <>
                      <div className="stat-value text-secondary">${cost.total}</div>
                      <div className="stat-desc">
                        Base: ${cost.base} + Additional: ${cost.additional}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
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

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Chat Token Usage Chart */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4 text-sm">Chat Token Usage</h2>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chatUsageData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid 
                        vertical={false}
                        horizontal={true}
                        stroke="#e5e7eb"
                      />
                      <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatXAxis}
                        stroke="hsl(var(--bc) / 0.5)"
                        axisLine={false}
                        tickLine={false}
                        style={{ fontSize: '0.75rem' }}
                      />
                      <YAxis 
                        stroke="hsl(var(--bc) / 0.5)"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={formatYAxis}
                        style={{ fontSize: '0.75rem' }}
                      />
                      <Tooltip
                        labelFormatter={formatTooltipLabel}
                        formatter={(value) => [formatYAxis(value), 'Total Tokens']}
                        contentStyle={{ fontSize: '0.75rem' }}
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
              <h2 className="card-title mb-4 text-sm">Document Processing Token Usage</h2>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={documentUsageData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid 
                        vertical={false}
                        horizontal={true}
                        stroke="#e5e7eb"
                      />
                      <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatXAxis}
                        stroke="hsl(var(--bc) / 0.5)"
                        axisLine={false}
                        tickLine={false}
                        style={{ fontSize: '0.75rem' }}
                      />
                      <YAxis 
                        stroke="hsl(var(--bc) / 0.5)"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={formatYAxis}
                        style={{ fontSize: '0.75rem' }}
                      />
                      <Tooltip
                        labelFormatter={formatTooltipLabel}
                        formatter={(value) => [formatYAxis(value), 'Total Tokens']}
                        contentStyle={{ fontSize: '0.75rem' }}
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

        {/* Combined Daily Usage Chart */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4 text-sm">Total Daily Token Usage</h2>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chatUsageData.map((item, index) => ({
                        timestamp: item.timestamp,
                        total_tokens: item.total_tokens + (documentUsageData[index]?.total_tokens || 0)
                      }))}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid 
                        vertical={false}
                        horizontal={true}
                        stroke="#e5e7eb"
                      />
                      <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatXAxis}
                        stroke="hsl(var(--bc) / 0.5)"
                        axisLine={false}
                        tickLine={false}
                        style={{ fontSize: '0.75rem' }}
                      />
                      <YAxis 
                        stroke="hsl(var(--bc) / 0.5)"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={formatYAxis}
                        style={{ fontSize: '0.75rem' }}
                      />
                      <Tooltip
                        labelFormatter={formatTooltipLabel}
                        formatter={(value) => [formatYAxis(value), 'Total Tokens']}
                        contentStyle={{ fontSize: '0.75rem' }}
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

          {/* Cumulative Usage Chart */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4 text-sm">Cumulative Token Usage</h2>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chatUsageData.map((item, index) => {
                        const dailyTotal = item.total_tokens + (documentUsageData[index]?.total_tokens || 0);
                        let cumulative = dailyTotal;
                        if (index > 0) {
                          // Get the previous cumulative value
                          const prevData = chatUsageData.map((item, i) => {
                            if (i >= index) return 0;
                            return item.total_tokens + (documentUsageData[i]?.total_tokens || 0);
                          }).reduce((sum, current) => sum + current, 0);
                          cumulative += prevData;
                        }
                        return {
                          timestamp: item.timestamp,
                          total_tokens: cumulative
                        };
                      })}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid 
                        vertical={false}
                        horizontal={true}
                        stroke="#e5e7eb"
                      />
                      <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatXAxis}
                        stroke="hsl(var(--bc) / 0.5)"
                        axisLine={false}
                        tickLine={false}
                        style={{ fontSize: '0.75rem' }}
                      />
                      <YAxis 
                        stroke="hsl(var(--bc) / 0.5)"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={formatYAxis}
                        style={{ fontSize: '0.75rem' }}
                      />
                      <Tooltip
                        labelFormatter={formatTooltipLabel}
                        formatter={(value) => [formatYAxis(value), 'Cumulative Tokens']}
                        contentStyle={{ fontSize: '0.75rem' }}
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
    </div>
  );
};

export default Usage;