import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import type { YearTrendItem } from '../types';

interface YearTrendChartProps {
    data: YearTrendItem[];
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-lg">
                <p className="text-gray-900 font-semibold mb-1">Model Year: {label}</p>
                <p className="text-blue-600 text-lg">{payload[0].value?.toLocaleString()} vehicles</p>
            </div>
        );
    }
    return null;
}

function YearTrendChart({ data }: YearTrendChartProps) {
    if (!data || data.length === 0) {
        return <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">No data available</div>;
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">EV Registrations by Model Year</h3>
                <p className="text-sm text-gray-500">Growth trend over time</p>
            </div>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default YearTrendChart;
