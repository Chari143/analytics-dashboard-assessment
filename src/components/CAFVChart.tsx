import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, TooltipProps } from 'recharts';
import type { ChartDataItem } from '../types';

const COLORS = ['#10b981', '#f59e0b', '#9ca3af'];

interface CAFVChartProps {
    data: ChartDataItem[];
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
    if (active && payload && payload.length) {
        const data = payload[0].payload as ChartDataItem;
        return (
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-lg">
                <p className="text-gray-900 font-semibold mb-1">{data.name}</p>
                <p className="text-blue-600 text-lg">{data.value?.toLocaleString()} vehicles</p>
            </div>
        );
    }
    return null;
}

function CAFVChart({ data }: CAFVChartProps) {
    if (!data || data.length === 0) {
        return <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">No data available</div>;
    }

    const sortOrder: Record<string, number> = { 'Eligible': 0, 'Not Eligible': 1, 'Unknown': 2 };
    const sortedData = [...data].sort((a, b) => (sortOrder[a.name] ?? 3) - (sortOrder[b.name] ?? 3));

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">CAFV Eligibility</h3>
                <p className="text-sm text-gray-500">Clean Alternative Fuel Vehicle incentive status</p>
            </div>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={sortedData}
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                        >
                            {sortedData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="white" strokeWidth={2} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-gray-600">{value}</span>} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default CAFVChart;
