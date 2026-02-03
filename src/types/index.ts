
export interface EVRecord {
    'VIN (1-10)': string;
    County: string;
    City: string;
    State: string;
    'Postal Code': number;
    'Model Year': number;
    Make: string;
    Model: string;
    'Electric Vehicle Type': string;
    'Clean Alternative Fuel Vehicle (CAFV) Eligibility': string;
    'Electric Range': number;
    'Base MSRP': number;
    'Legislative District': number;
    'DOL Vehicle ID': number;
    'Vehicle Location': string;
    'Electric Utility': string;
    '2020 Census Tract': number;
}

export interface Metrics {
    totalEVs: number;
    uniqueMakes: number;
    uniqueModels: number;
    avgRange: number;
    topMake: string;
    topMakeCount: number;
}

export interface ChartDataItem {
    name: string;
    value?: number;
    count?: number;
    fullName?: string;
}

export interface YearTrendItem {
    year: number;
    count: number;
}

export interface RangeItem {
    range: string;
    count: number;
}
