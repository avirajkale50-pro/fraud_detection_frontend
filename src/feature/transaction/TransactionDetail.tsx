import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../service/api';
import type { Transaction } from '../../types';
import { Loader2, AlertCircle, ArrowLeft, Calendar, CreditCard, TrendingUp, Activity } from 'lucide-react';
import DecisionBadge from '../../components/transaction/DecisionBadge';
import RiskBadge from '../../components/transaction/RiskBadge';

const TransactionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchTransaction(parseInt(id));
        }
    }, [id]);

    const fetchTransaction = async (transactionId: number) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await api.getTransaction(transactionId);
            setTransaction(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load transaction details');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(date);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Loading transaction details...</p>
                </div>
            </div>
        );
    }

    if (error || !transaction) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Error Loading Transaction</h3>
                    <p className="text-gray-500 mb-4">{error || 'Transaction not found'}</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Back Button */}
            <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Transactions
            </button>

            {/* Header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {formatCurrency(transaction.amount)}
                        </h1>
                        <p className="text-gray-500">Transaction #{transaction.id}</p>
                    </div>
                    <div className="text-right space-y-2">
                        <DecisionBadge decision={transaction.decision} />
                        <RiskBadge score={transaction.risk_score} />
                    </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Payment Mode</p>
                            <p className="text-sm font-semibold text-gray-900">{transaction.mode.replace('_', ' ')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Created At</p>
                            <p className="text-sm font-semibold text-gray-900">{formatDate(transaction.created_at)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Activity className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">User ID</p>
                            <p className="text-sm font-semibold text-gray-900">#{transaction.user_id}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Risk Analysis */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Risk Analysis
                </h2>

                {/* Risk Score Visualization */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Overall Risk Score</span>
                        <span className="text-2xl font-bold text-gray-900">{transaction.risk_score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className={`h-3 rounded-full transition-all ${transaction.risk_score <= 40
                                ? 'bg-green-500'
                                : transaction.risk_score <= 70
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                            style={{ width: `${transaction.risk_score}%` }}
                        />
                    </div>
                </div>

                {/* Deviation Scores */}
                {(transaction.amount_deviation_score !== undefined ||
                    transaction.frequency_deviation_score !== undefined ||
                    transaction.mode_deviation_score !== undefined ||
                    transaction.time_deviation_score !== undefined) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {transaction.amount_deviation_score !== undefined && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Amount Deviation</span>
                                        <span className="text-lg font-bold text-gray-900">{transaction.amount_deviation_score}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{ width: `${transaction.amount_deviation_score}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                            {transaction.frequency_deviation_score !== undefined && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Frequency Deviation</span>
                                        <span className="text-lg font-bold text-gray-900">{transaction.frequency_deviation_score}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-purple-500 h-2 rounded-full"
                                            style={{ width: `${transaction.frequency_deviation_score}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                            {transaction.mode_deviation_score !== undefined && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Mode Deviation</span>
                                        <span className="text-lg font-bold text-gray-900">{transaction.mode_deviation_score}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-indigo-500 h-2 rounded-full"
                                            style={{ width: `${transaction.mode_deviation_score}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                            {transaction.time_deviation_score !== undefined && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Time Deviation</span>
                                        <span className="text-lg font-bold text-gray-900">{transaction.time_deviation_score}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-pink-500 h-2 rounded-full"
                                            style={{ width: `${transaction.time_deviation_score}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
            </div>

            {/* Triggered Factors */}
            {transaction.triggered_factors && transaction.triggered_factors.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Triggered Risk Factors</h2>
                    <div className="flex flex-wrap gap-3">
                        {transaction.triggered_factors.map((factor) => (
                            <div
                                key={factor}
                                className="px-4 py-2 bg-orange-50 text-orange-800 text-sm font-medium rounded-lg border border-orange-200"
                            >
                                {factor.replace('_', ' ')}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionDetail;
