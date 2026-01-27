import React from 'react';
import { Shield } from 'lucide-react';

interface RiskBadgeProps {
    score: number;
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ score }) => {
    const getRiskLevel = (score: number): { level: string; color: 'green' | 'yellow' | 'red' } => {
        if (score <= 40) return { level: 'Low', color: 'green' };
        if (score <= 70) return { level: 'Medium', color: 'yellow' };
        return { level: 'High', color: 'red' };
    };

    const { level, color } = getRiskLevel(score);

    const colorClasses: Record<'green' | 'yellow' | 'red', {
        bg: string;
        text: string;
        border: string;
        progress: string;
    }> = {
        green: {
            bg: 'bg-green-100',
            text: 'text-green-800',
            border: 'border-green-200',
            progress: 'bg-green-500',
        },
        yellow: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            border: 'border-yellow-200',
            progress: 'bg-yellow-500',
        },
        red: {
            bg: 'bg-red-100',
            text: 'text-red-800',
            border: 'border-red-200',
            progress: 'bg-red-500',
        },
    };

    const classes = colorClasses[color];

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${classes.bg} ${classes.text} ${classes.border}`}>
            <Shield className="w-3.5 h-3.5" />
            <span>{level} Risk</span>
            <span className="font-mono font-bold">{score}</span>
        </div>
    );
};

export default RiskBadge;
