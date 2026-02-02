import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import type { RangeItem } from '../types';

interface RangeDistributionChartProps {
    data: RangeItem[];
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-lg">
                <p className="text-gray-900 font-semibold mb-1">{label} miles</p>
                <p className="text-blue-600 text-lg">{payload[0].value?.toLocaleString()} vehicles</p>
            </div>
        );
    }
    return null;
}

function RangeDistributionChart({ data }: RangeDistributionChartProps) {
    if (!data || data.length === 0) {
        return <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">No data available</div>;
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Electric Range Distribution</h3>
                <p className="text-sm text-gray-500">Vehicle count by range (miles)</p>
            </div>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="range" tick={{ fill: '#6b7280', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default RangeDistributionChart;
