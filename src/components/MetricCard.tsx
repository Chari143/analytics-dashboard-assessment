interface MetricCardProps {
    label: string;
    value: string | number;
    subValue?: string;
}

const colorStyles: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600'
};

function MetricCard({ label, value, subValue }: MetricCardProps) {
    const formattedValue = typeof value === 'number'
        ? value.toLocaleString()
        : value;

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">{label}</div>
            <div className="text-2xl font-bold text-gray-900">{formattedValue}</div>
            {subValue && <div className="text-sm text-gray-400 mt-1">{subValue}</div>}
        </div>
    );
}

export default MetricCard;
