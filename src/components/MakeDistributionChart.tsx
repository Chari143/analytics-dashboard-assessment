import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, TooltipProps } from 'recharts';
import type { ChartDataItem } from '../types';

const BAR_COLORS = [
    '#3b82f6', '#06b6d4', '#10b981', '#8b5cf6', '#f59e0b',
    '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#84cc16'
];

interface MakeDistributionChartProps {
    data: ChartDataItem[];
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-lg">
                <p className="text-gray-900 font-semibold mb-1">{label}</p>
                <p className="text-blue-600 text-lg">{payload[0].value?.toLocaleString()} vehicles</p>
            </div>
        );
    }
    return null;
}

function MakeDistributionChart({ data }: MakeDistributionChartProps) {
    if (!data || data.length === 0) {
        return <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">No data available</div>;
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Top 10 Manufacturers</h3>
                <p className="text-sm text-gray-500">EV market share by make</p>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                        <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(val) => val.toLocaleString()} />
                        <YAxis type="category" dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} width={55} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default MakeDistributionChart;
