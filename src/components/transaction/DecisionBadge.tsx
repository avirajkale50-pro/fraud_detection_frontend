import React from 'react';
import type { TransactionDecision } from '../../types';
import { CheckCircle, AlertTriangle, XCircle, Flag } from 'lucide-react';

interface DecisionBadgeProps {
    decision: TransactionDecision;
}

const DecisionBadge: React.FC<DecisionBadgeProps> = ({ decision }) => {
    const config = {
        ALLOW: {
            bg: 'bg-green-100',
            text: 'text-green-800',
            border: 'border-green-200',
            icon: CheckCircle,
            label: 'Allowed',
        },
        FLAG: {
            bg: 'bg-orange-100',
            text: 'text-orange-800',
            border: 'border-orange-200',
            icon: Flag,
            label: 'Flagged for Review',
        },
        MFA_REQUIRED: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            border: 'border-yellow-200',
            icon: AlertTriangle,
            label: 'MFA Required',
        },
        BLOCK: {
            bg: 'bg-red-100',
            text: 'text-red-800',
            border: 'border-red-200',
            icon: XCircle,
            label: 'Blocked',
        },
    };

    const { bg, text, border, icon: Icon, label } = config[decision];

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${bg} ${text} ${border}`}>
            <Icon className="w-3.5 h-3.5" />
            {label}
        </span>
    );
};

export default DecisionBadge;
