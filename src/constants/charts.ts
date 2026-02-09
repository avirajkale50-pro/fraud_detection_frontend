import { Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Configuration for transaction summary stat cards
 */
export interface StatCardConfig {
    label: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
    valueKey: 'total_transactions' | 'allowed_transactions' | 'flagged_transactions' | 'blocked_transactions';
}

export const TRANSACTION_STAT_CARDS: StatCardConfig[] = [
    {
        label: 'Total Transactions',
        valueKey: 'total_transactions',
        icon: Activity,
        color: 'bg-blue-100 text-blue-600',
        bgColor: 'bg-blue-50',
    },
    {
        label: 'Allowed',
        valueKey: 'allowed_transactions',
        icon: ShieldCheck,
        color: 'bg-green-100 text-green-600',
        bgColor: 'bg-green-50',
    },
    {
        label: 'Flagged',
        valueKey: 'flagged_transactions',
        icon: AlertTriangle,
        color: 'bg-orange-100 text-orange-600',
        bgColor: 'bg-orange-50',
    },
    {
        label: 'Blocked',
        valueKey: 'blocked_transactions',
        icon: ShieldCheck,
        color: 'bg-red-100 text-red-600',
        bgColor: 'bg-red-50',
    },
];

/**
 * Color configuration for transaction decision pie chart
 */
export interface PieChartColorConfig {
    name: 'Allowed' | 'Flagged' | 'Blocked';
    color: string;
    valueKey: 'allowed_transactions' | 'flagged_transactions' | 'blocked_transactions';
}

export const TRANSACTION_DECISION_COLORS: PieChartColorConfig[] = [
    { name: 'Allowed', valueKey: 'allowed_transactions', color: '#10b981' },
    { name: 'Flagged', valueKey: 'flagged_transactions', color: '#f59e0b' },
    { name: 'Blocked', valueKey: 'blocked_transactions', color: '#ef4444' },
];

/**
 * Color palette for triggered factors bar chart
 * Colors cycle through if there are more bars than colors
 */
export const BAR_CHART_COLORS = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // orange
    '#ef4444', // red
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#14b8a6', // teal
    '#f97316', // orange-red
];

/**
 * Gradient configuration for area chart
 */
export const AREA_CHART_GRADIENT = {
    id: 'colorTransactions',
    color: '#3b82f6',
    startOpacity: 0.8,
    endOpacity: 0,
};
