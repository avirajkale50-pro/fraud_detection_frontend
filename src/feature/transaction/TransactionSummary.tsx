import React from 'react';
import { useTransactionSummary } from '../../hooks/useTransactionSummary';
import { BarChart3, TrendingUp, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import { formatEnumValue } from '../../utils/formatters';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
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

    const stats = [
        {
            label: 'Total Transactions',
            value: summary.total_transactions,
            icon: Activity,
            color: 'bg-blue-100 text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            label: 'Allowed',
            value: summary.allowed_transactions,
            icon: ShieldCheck,
            color: 'bg-green-100 text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            label: 'Flagged',
            value: summary.flagged_transactions,
            icon: AlertTriangle,
            color: 'bg-orange-100 text-orange-600',
            bgColor: 'bg-orange-50',
        },
        {
            label: 'Blocked',
            value: summary.blocked_transactions,
            icon: ShieldCheck,
            color: 'bg-red-100 text-red-600',
            bgColor: 'bg-red-50',
        },
    ];

    // Prepare data for pie chart (transaction decisions)
    const pieData = [
        { name: 'Allowed', value: summary.allowed_transactions, color: '#10b981' },
        { name: 'Flagged', value: summary.flagged_transactions, color: '#f59e0b' },
        { name: 'Blocked', value: summary.blocked_transactions, color: '#ef4444' },
    ].filter(item => item.value > 0);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-black rounded-lg">
                        <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Transaction Summary</h1>
                        <p className="text-gray-500">Overview of your transaction activity</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className={`${stat.bgColor} border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`p-2 rounded-lg ${stat.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
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
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <ShieldCheck className="w-5 h-5 text-gray-700" />
                                <h2 className="text-lg font-semibold text-gray-900">Transaction Decisions</h2>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
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
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="w-5 h-5 text-gray-700" />
                                <h2 className="text-lg font-semibold text-gray-900">Triggered Factors</h2>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={triggeredFactorsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                        fontSize={12}
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#f59e0b" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                {/* Daily Activity Area Chart */}
                {dailyActivityData.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="w-5 h-5 text-gray-700" />
                            <h2 className="text-lg font-semibold text-gray-900">Recent Daily Activity</h2>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={dailyActivityData}>
                                <defs>
                                    <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" fontSize={12} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="transactions"
                                    stroke="#3b82f6"
                                    fillOpacity={1}
                                    fill="url(#colorTransactions)"
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
