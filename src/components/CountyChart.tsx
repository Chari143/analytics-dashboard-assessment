import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import type { ChartDataItem } from '../types';

interface CountyChartProps {
    data: ChartDataItem[];
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-lg">
                <p className="text-gray-900 font-semibold mb-1">{label} County</p>
                <p className="text-blue-600 text-lg">{payload[0].value?.toLocaleString()} vehicles</p>
            </div>
        );
    }
    return null;
}

function CountyChart({ data }: CountyChartProps) {
    if (!data || data.length === 0) {
        return <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">No data available</div>;
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Top Counties by EV Count</h3>
                <p className="text-sm text-gray-500">Geographic distribution</p>
            </div>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} angle={-45} textAnchor="end" height={60} interval={0} />
                        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default CountyChart;
