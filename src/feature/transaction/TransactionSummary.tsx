import React from 'react';
import { useTransactionSummary } from '../../hooks/useTransactionSummary';
import { BarChart3, TrendingUp, ShieldCheck, Activity } from 'lucide-react';
import { formatEnumValue } from '../../utils/formatters';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import {
    TRANSACTION_STAT_CARDS,
    TRANSACTION_DECISION_COLORS,
    BAR_CHART_COLORS,
    AREA_CHART_GRADIENT,
} from '../../constants/charts';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    AreaChart,
} from 'recharts';

const TransactionSummary: React.FC = () => {
    console.log('[TransactionSummary] Component rendering');
    const { data: summary, isLoading, error } = useTransactionSummary();

    console.log('[TransactionSummary] State:', { isLoading, hasError: !!error, hasSummary: !!summary });

    if (isLoading) {
        return <LoadingState message="Loading transaction summary..." />;
    }

    if (error) {
        return <ErrorState error={error} title="Failed to load summary" />;
    }

    if (!summary) {
        return null;
    }

    // Map stat cards with dynamic values from summary
    const stats = TRANSACTION_STAT_CARDS.map((config) => ({
        ...config,
        value: summary[config.valueKey],
    }));

    // Prepare data for pie chart (transaction decisions)
    const pieData = TRANSACTION_DECISION_COLORS.map((config) => ({
        name: config.name,
        value: summary[config.valueKey],
        color: config.color,
    })).filter((item) => item.value > 0);

    // Prepare data for triggered factors bar chart
    const triggeredFactorsData = Object.entries(summary.triggered_factors_breakdown)
        .map(([factor, count]) => ({
            name: formatEnumValue(factor),
            count: count,
        }))
        .sort((a, b) => b.count - a.count);



    // Prepare data for daily activity area chart
    const dailyActivityData = Object.entries(summary.recent_daily_activity)
        .map(([date, count]) => ({
            date: date,
            transactions: count,
        }))
        .sort((a, b) => a.date.localeCompare(b.date));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <div className="p-2 bg-black rounded-lg">
                        <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Transaction Summary</h1>
                        <p className="text-gray-500 text-sm sm:text-base">Overview of your transaction activity</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className={`${stat.bgColor} border border-gray-200 rounded-lg p-5 sm:p-6 transition-all hover:shadow-md`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`p-2 rounded-lg ${stat.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Transaction Decisions Pie Chart */}
                    {pieData.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <ShieldCheck className="w-5 h-5 text-gray-700" />
                                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Transaction Decisions</h2>
                            </div>
                            <ResponsiveContainer width="100%" height={250} className="sm:!h-[300px]">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={(entry) => {
                                            const percent = entry.percent || 0;
                                            return `${entry.name} ${(percent * 100).toFixed(0)}%`;
                                        }}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Triggered Factors Bar Chart */}
                    {triggeredFactorsData.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="w-5 h-5 text-gray-700" />
                                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Triggered Factors</h2>
                            </div>
                            <ResponsiveContainer width="100%" height={250} className="sm:!h-[300px]">
                                <BarChart data={triggeredFactorsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        angle={0}
                                        textAnchor="middle"
                                        height={80}
                                        fontSize={10}
                                        className="sm:text-xs"
                                    />
                                    <YAxis fontSize={10} className="sm:text-xs" />
                                    <Tooltip />
                                    <Bar dataKey="count">
                                        {triggeredFactorsData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={BAR_CHART_COLORS[index % BAR_CHART_COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                {/* Daily Activity Area Chart */}
                {dailyActivityData.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="w-5 h-5 text-gray-700" />
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Daily Activity</h2>
                        </div>
                        <ResponsiveContainer width="100%" height={250} className="sm:!h-[300px]">
                            <AreaChart data={dailyActivityData}>
                                <defs>
                                    <linearGradient id={AREA_CHART_GRADIENT.id} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={AREA_CHART_GRADIENT.color} stopOpacity={AREA_CHART_GRADIENT.startOpacity} />
                                        <stop offset="95%" stopColor={AREA_CHART_GRADIENT.color} stopOpacity={AREA_CHART_GRADIENT.endOpacity} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" fontSize={10} className="sm:text-xs" />
                                <YAxis fontSize={10} className="sm:text-xs" />
                                <Tooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="transactions"
                                    stroke={AREA_CHART_GRADIENT.color}
                                    fillOpacity={1}
                                    fill={`url(#${AREA_CHART_GRADIENT.id})`}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionSummary;
