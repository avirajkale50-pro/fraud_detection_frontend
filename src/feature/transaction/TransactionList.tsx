import React, { useEffect, useState } from 'react';
import { api } from '../../service/api';
import type { Transaction } from '../../types';
import { Loader2, AlertCircle, ArrowRight, Calendar, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DecisionBadge from '../../components/transaction/DecisionBadge';
import RiskBadge from '../../components/transaction/RiskBadge';

const TransactionList: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await api.getTransactions();
            setTransactions(response.data || []);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load transactions');
            setTransactions([]); // Reset to empty array on error
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
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
                    <p className="text-gray-500">Loading transactions...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Error Loading Transactions</h3>
                    <p className="text-gray-500 mb-4">{error}</p>
                    <button
                        onClick={fetchTransactions}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Transaction History</h1>
                <p className="text-gray-500">Monitor and analyze your payment transactions</p>
            </div>

            {/* Empty State */}
            {!transactions || transactions.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <DollarSign className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No Transactions Yet</h3>
                    <p className="text-gray-500">Create your first transaction to get started</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            onClick={() => navigate(`/transactions/${transaction.id}`)}
                            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between">
                                {/* Left Side */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {formatCurrency(transaction.amount)}
                                        </h3>
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                                            {transaction.mode.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(transaction.created_at)}
                                        </div>
                                        <div className="text-gray-300">•</div>
                                        <div>ID: #{transaction.id}</div>
                                    </div>
                                </div>

                                {/* Right Side */}
                                <div className="flex items-center gap-4">
                                    <div className="text-right space-y-2">
                                        <RiskBadge score={transaction.risk_score} />
                                        <br />
                                        <DecisionBadge decision={transaction.decision} />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>

                            {/* Triggered Factors */}
                            {transaction.triggered_factors.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex flex-wrap gap-2">
                                        {transaction.triggered_factors.map((factor) => (
                                            <span
                                                key={factor}
                                                className="px-2 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded border border-orange-200"
                                            >
                                                {factor.replace('_', ' ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionList;
