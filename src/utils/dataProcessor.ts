// Data processing utilities for the dashboard
import Papa from 'papaparse';
import type { EVRecord, Metrics, ChartDataItem, YearTrendItem, RangeItem } from '../types';

// loads and parses the CSV file
export async function loadCSVData(csvPath: string): Promise<EVRecord[]> {
    const response = await fetch(csvPath);
    const csvText = await response.text();

    const result = Papa.parse<EVRecord>(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        transformHeader: (header) => header.trim()
    });

    return result.data;
}

// calculates the summary stats shown in the metric cards
export function calculateMetrics(data: EVRecord[]): Metrics {
    if (!data || data.length === 0) {
        return { totalEVs: 0, uniqueMakes: 0, uniqueModels: 0, avgRange: 0, topMake: 'N/A', topMakeCount: 0 };
    }

    const totalEVs = data.length;

    const makes = new Set(data.map(d => d.Make).filter(Boolean));
    const models = new Set(data.map(d => d.Model).filter(Boolean));

    const ranges = data
        .map(d => d['Electric Range'])
        .filter((r): r is number => r !== null && r !== undefined && r > 0);

    const avgRange = ranges.length > 0
        ? Math.round(ranges.reduce((sum, r) => sum + r, 0) / ranges.length)
        : 0;

    const makeCounts: Record<string, number> = {};
    data.forEach(d => {
        if (d.Make) {
            makeCounts[d.Make] = (makeCounts[d.Make] || 0) + 1;
        }
    });

    const topMakeEntry = Object.entries(makeCounts).sort((a, b) => b[1] - a[1])[0];

    return {
        totalEVs,
        uniqueMakes: makes.size,
        uniqueModels: models.size,
        avgRange,
        topMake: topMakeEntry ? topMakeEntry[0] : 'N/A',
        topMakeCount: topMakeEntry ? topMakeEntry[1] : 0
    };
}

// gets the BEV vs PHEV distribution
export function getEVTypeDistribution(data: EVRecord[]): ChartDataItem[] {
    const typeCounts: Record<string, number> = {};

    data.forEach(d => {
        const type = d['Electric Vehicle Type'];
        if (type) {
            const shortType = type.includes('Battery') ? 'BEV' :
                type.includes('Plug-in') ? 'PHEV' : type;
            typeCounts[shortType] = (typeCounts[shortType] || 0) + 1;
        }
    });

    return Object.entries(typeCounts).map(([name, value]) => ({
        name,
        value,
        fullName: name === 'BEV' ? 'Battery Electric Vehicle' : 'Plug-in Hybrid Electric Vehicle'
    }));
}

// top manufacturers by vehicle count
export function getMakeDistribution(data: EVRecord[], topN: number = 10): ChartDataItem[] {
    const makeCounts: Record<string, number> = {};

    data.forEach(d => {
        if (d.Make) {
            makeCounts[d.Make] = (makeCounts[d.Make] || 0) + 1;
        }
    });

    return Object.entries(makeCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topN)
        .map(([name, count]) => ({ name, count }));
}

// registrations grouped by model year
export function getYearTrend(data: EVRecord[]): YearTrendItem[] {
    const yearCounts: Record<number, number> = {};

    data.forEach(d => {
        const year = d['Model Year'];
        if (year && year >= 2010 && year <= 2025) {
            yearCounts[year] = (yearCounts[year] || 0) + 1;
        }
    });

    return Object.entries(yearCounts)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([year, count]) => ({ year: parseInt(year), count }));
}

// EVs by county (top N)
export function getCountyDistribution(data: EVRecord[], topN: number = 10): ChartDataItem[] {
    const countyCounts: Record<string, number> = {};

    data.forEach(d => {
        if (d.County) {
            countyCounts[d.County] = (countyCounts[d.County] || 0) + 1;
        }
    });

    return Object.entries(countyCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topN)
        .map(([name, count]) => ({ name, count }));
}

// electric range histogram with buckets
export function getRangeDistribution(data: EVRecord[]): RangeItem[] {
    const buckets: Record<string, number> = {
        '0-50': 0,
        '51-100': 0,
        '101-150': 0,
        '151-200': 0,
        '201-250': 0,
        '251-300': 0,
        '300+': 0
    };

    data.forEach(d => {
        const range = d['Electric Range'];
        if (!range || range <= 0) return;

        if (range <= 50) buckets['0-50']++;
        else if (range <= 100) buckets['51-100']++;
        else if (range <= 150) buckets['101-150']++;
        else if (range <= 200) buckets['151-200']++;
        else if (range <= 250) buckets['201-250']++;
        else if (range <= 300) buckets['251-300']++;
        else buckets['300+']++;
    });

    return Object.entries(buckets).map(([range, count]) => ({ range, count }));
}

// CAFV eligibility breakdown
export function getCAFVDistribution(data: EVRecord[]): ChartDataItem[] {
    const eligibilityCounts: Record<string, number> = {};

    data.forEach(d => {
        const cafv = d['Clean Alternative Fuel Vehicle (CAFV) Eligibility'];
        if (cafv) {
            let shortLabel = cafv;
            if (cafv.includes('Eligible')) shortLabel = 'Eligible';
            else if (cafv.includes('Not eligible')) shortLabel = 'Not Eligible';
            else if (cafv.includes('unknown')) shortLabel = 'Unknown';

            eligibilityCounts[shortLabel] = (eligibilityCounts[shortLabel] || 0) + 1;
        }
    });

    return Object.entries(eligibilityCounts).map(([name, value]) => ({ name, value }));
}

// top models (make + model combined)
export function getTopModels(data: EVRecord[], topN: number = 10): ChartDataItem[] {
    const modelCounts: Record<string, number> = {};

    data.forEach(d => {
        if (d.Make && d.Model) {
            const key = `${d.Make} ${d.Model}`;
            modelCounts[key] = (modelCounts[key] || 0) + 1;
        }
    });

    return Object.entries(modelCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topN)
        .map(([name, count]) => ({ name, count }));
}
