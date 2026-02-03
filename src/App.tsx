import { useState, useEffect } from 'react';
import type { Metrics, ChartDataItem, YearTrendItem, RangeItem } from './types';
import {
    loadCSVData,
    calculateMetrics,
    getEVTypeDistribution,
    getMakeDistribution,
    getYearTrend,
    getCountyDistribution,
    getRangeDistribution,
    getCAFVDistribution,
    getTopModels
} from './utils/dataProcessor';

import MetricCard from './components/MetricCard';
import EVTypeChart from './components/EVTypeChart';
import MakeDistributionChart from './components/MakeDistributionChart';
import YearTrendChart from './components/YearTrendChart';
import CountyChart from './components/CountyChart';
import RangeDistributionChart from './components/RangeDistributionChart';
import CAFVChart from './components/CAFVChart';
import TopModelsChart from './components/TopModelsChart';

const CSV_PATH = '/data-to-visualize/Electric_Vehicle_Population_Data.csv';

interface ChartData {
    evType: ChartDataItem[];
    makes: ChartDataItem[];
    yearTrend: YearTrendItem[];
    counties: ChartDataItem[];
    ranges: RangeItem[];
    cafv: ChartDataItem[];
    models: ChartDataItem[];
}

function App() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [chartData, setChartData] = useState<ChartData>({
        evType: [],
        makes: [],
        yearTrend: [],
        counties: [],
        ranges: [],
        cafv: [],
        models: []
    });

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const rawData = await loadCSVData(CSV_PATH);
                console.log(`Loaded ${rawData.length} EV records`);

                const summaryMetrics = calculateMetrics(rawData);
                setMetrics(summaryMetrics);

                setChartData({
                    evType: getEVTypeDistribution(rawData),
                    makes: getMakeDistribution(rawData, 10),
                    yearTrend: getYearTrend(rawData),
                    counties: getCountyDistribution(rawData, 10),
                    ranges: getRangeDistribution(rawData),
                    cafv: getCAFVDistribution(rawData),
                    models: getTopModels(rawData, 10)
                });

                setLoading(false);
            } catch (err) {
                console.error('Error loading data:', err);
                setError('Failed to load EV data. Please try refreshing.');
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6">
                <div className="w-12 h-12 border-[3px] border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-gray-500 text-lg">Loading EV population data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold text-blue-600">
                            EV Analytics Dashboard
                        </h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <MetricCard
                        label="Total EVs"
                        value={metrics?.totalEVs ?? 0}
                        subValue="Registered vehicles"
                    />
                    <MetricCard
                        label="Manufacturers"
                        value={metrics?.uniqueMakes ?? 0}
                        subValue="Different makes"
                    />
                    <MetricCard
                        label="Average  Range"
                        value={`${metrics?.avgRange ?? 0} mi`}
                        subValue="Electric range"
                    />
                    <MetricCard
                        label="Top Make"
                        value={metrics?.topMake ?? 'N/A'}
                        subValue={`${metrics?.topMakeCount?.toLocaleString() ?? 0} vehicles`}
                    />
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <EVTypeChart data={chartData.evType} />
                        <div className="lg:col-span-2">
                            <YearTrendChart data={chartData.yearTrend} />
                        </div>
                    </div>

                    <MakeDistributionChart data={chartData.makes} />
                    <TopModelsChart data={chartData.models} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <CountyChart data={chartData.counties} />
                        <RangeDistributionChart data={chartData.ranges} />
                    </div>

                    <CAFVChart data={chartData.cafv} />
                </div>
            </main>

            <footer className="text-center py-6 text-gray-400 text-sm">
                Built for MapUp Analytics Dashboard Assessment • Data Source: WA State DOL
            </footer>
        </div>
    );
}

export default App;
