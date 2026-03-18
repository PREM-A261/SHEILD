import React, { useState } from 'react';
import {
    LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, PageHeader, FilterPanel } from '../../components/ui/Components';
import regionsData, { stateList } from '../../data/regions';
import './DataInsights.css';

// Generate mock historical data for trend charts
const generateMockTrend = () => {
    return [
        { year: 2018, sexRatio: 915, childMarriage: 28.5, litGap: 24.2 },
        { year: 2019, sexRatio: 918, childMarriage: 27.1, litGap: 22.5 },
        { year: 2020, sexRatio: 924, childMarriage: 24.8, litGap: 20.1 },
        { year: 2021, sexRatio: 928, childMarriage: 23.2, litGap: 18.5 },
        { year: 2022, sexRatio: 933, childMarriage: 21.0, litGap: 16.8 },
        { year: 2023, sexRatio: 938, childMarriage: 19.5, litGap: 15.2 },
    ];
};

function DataInsights() {
    const [filters, setFilters] = useState({ state: '' });

    // Filter for top/bottom districts based on data
    const filteredData = filters.state ? regionsData.filter(r => r.state_name === filters.state) : regionsData;
    const sortedByLit = [...filteredData].sort((a, b) => b.female_literacy - a.female_literacy).slice(0, 8);
    const sortedByLabor = [...filteredData].sort((a, b) => (b.male_labor_participation - b.female_labor_participation) - (a.male_labor_participation - a.female_labor_participation)).slice(0, 8); // Top gaps

    const trendData = generateMockTrend();

    const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

    return (
        <div className="data-insights-page">
            <div className="container">
                <PageHeader
                    title="Data Insights & Trends"
                    subtitle="High-level analytical visualizations showing gender equity trends across regions."
                    actions={
                        <FilterPanel
                            filters={[{ key: 'state', label: 'Filter by State', options: stateList }]}
                            values={filters}
                            onChange={handleFilterChange}
                        />
                    }
                />

                <div className="insights-grid">
                    {/* Trend Chart: Sex Ratio */}
                    <Card className="insight-card full-width">
                        <div className="chart-header">
                            <h3>Sex Ratio Trend (National Average)</h3>
                            <p>Historical progression of females per 1000 males at birth</p>
                        </div>
                        <div className="chart-container" style={{ height: 350 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9ECEF" />
                                    <XAxis dataKey="year" axisLine={false} tickLine={false} />
                                    <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="sexRatio" name="Sex Ratio" stroke="#3F51B5" strokeWidth={3} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Bar Chart: Literacy Comparison */}
                    <Card className="insight-card">
                        <div className="chart-header">
                            <h3>Literacy Comparison by District</h3>
                            <p>{filters.state ? `Selected districts in ${filters.state}` : 'Top sampled districts'}</p>
                        </div>
                        <div className="chart-container" style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sortedByLit} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9ECEF" />
                                    <XAxis dataKey="district_name" angle={-45} textAnchor="end" height={60} interval={0} tick={{ fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                                    <Legend verticalAlign="top" height={36} />
                                    <Bar dataKey="female_literacy" name="Female %" fill="#3F51B5" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="male_literacy" name="Male %" fill="#009688" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Bar Chart: Labor Force Gap */}
                    <Card className="insight-card">
                        <div className="chart-header">
                            <h3>Highest Labor Force Participation Gaps</h3>
                            <p>Districts with largest disparity between male and female workforce</p>
                        </div>
                        <div className="chart-container" style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sortedByLabor} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E9ECEF" />
                                    <XAxis type="number" axisLine={false} tickLine={false} />
                                    <YAxis dataKey="district_name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                                    <Legend verticalAlign="top" height={36} />
                                    <Bar dataKey="male_labor_participation" name="Male %" fill="#009688" radius={[0, 4, 4, 0]} barSize={12} />
                                    <Bar dataKey="female_labor_participation" name="Female %" fill="#FF9800" radius={[0, 4, 4, 0]} barSize={12} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Area Chart: Child Marriage Trend */}
                    <Card className="insight-card full-width">
                        <div className="chart-header">
                            <h3>Decline in Child Marriage Rates</h3>
                            <p>National average reduction over the last 6 years</p>
                        </div>
                        <div className="chart-container" style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorChildM" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#F44336" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#F44336" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9ECEF" />
                                    <XAxis dataKey="year" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="childMarriage" name="Child Marriage %" stroke="#F44336" fillOpacity={1} fill="url(#colorChildM)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
}

export default DataInsights;
