import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, DollarSign, Upload, CheckCircle, X, BarChart3 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import type { Transaction, BulkUploadResponse } from '../../types';
import DecisionBadge from '../../components/transaction/DecisionBadge';
import RiskBadge from '../../components/transaction/RiskBadge';
import { useTransactions } from '../../hooks/useTransactions';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import PaginationControls from '../../components/common/PaginationControls';
import BulkUploadModal from '../../components/transaction/BulkUploadModal';
import { formatDate, formatCurrency, formatEnumValue } from '../../utils/formatters';
import { ROUTES } from '../../constants/routes';
import { api } from '../../service/api';

const TransactionList: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Bulk upload state
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadResult, setUploadResult] = useState<BulkUploadResponse | null>(null);

    // Calculate offset for pagination
    const offset = (currentPage - 1) * pageSize;

    const { data, isLoading, error, refetch } = useTransactions({
        limit: pageSize,
        offset: offset,
    });

    // Ensure transactions is always an array
    const transactions = Array.isArray(data) ? data : [];

    // Prefetch next page for instant navigation
    useEffect(() => {
        if (transactions.length === pageSize) {
            const nextOffset = currentPage * pageSize;
            queryClient.prefetchQuery({
                queryKey: ['transactions', pageSize, nextOffset],
                queryFn: () => api.getTransactions({ limit: pageSize, offset: nextOffset }),
            });
        }
    }, [currentPage, pageSize, transactions.length, queryClient]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const handleUploadSuccess = (result: BulkUploadResponse) => {
        setUploadResult(result);
        refetch();
    };

    if (isLoading) {
        return <LoadingState message="Loading transactions..." />;
    }

    if (error) {
        return (
            <ErrorState
                error={error}
                onRetry={refetch}
                title="Error Loading Transactions"
                defaultMessage="Failed to load transactions"
            />
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Transaction History</h1>
                    <p className="text-gray-500 text-sm sm:text-base">Monitor and analyze your payment transactions</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
                    <Link
                        to={ROUTES.SUMMARY}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        <BarChart3 className="w-4 h-4" />
                        View Summary
                    </Link>
                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                        <Upload className="w-4 h-4" />
                        Upload File
                    </button>
                </div>
            </div>

            {/* Upload Success Alert */}
            {uploadResult && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-semibold text-green-900 mb-1">
                                    {uploadResult.message}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-2">
                                    <div>
                                        <p className="text-xs text-green-700">Total Rows</p>
                                        <p className="text-sm font-semibold text-green-900">{uploadResult.data.total_rows}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-green-700">Processed</p>
                                        <p className="text-sm font-semibold text-green-900">{uploadResult.data.processed_rows}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-green-700">Failed</p>
                                        <p className="text-sm font-semibold text-red-600">{uploadResult.data.failed_rows}</p>
                                    </div>
                                </div>
                                {uploadResult.data.errors.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-xs font-medium text-green-900 mb-1">Errors:</p>
                                        <ul className="text-xs text-green-800 space-y-1">
                                            {uploadResult.data.errors.slice(0, 5).map((error, idx) => (
                                                <li key={idx}>• {error}</li>
                                            ))}
                                            {uploadResult.data.errors.length > 5 && (
                                                <li>• ... and {uploadResult.data.errors.length - 5} more</li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => setUploadResult(null)}
                            className="text-green-600 hover:text-green-800 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

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
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="space-y-0 divide-y divide-gray-200">
                        {transactions.map((transaction: Transaction) => (
                            <div
                                key={transaction.id}
                                onClick={() => navigate(ROUTES.TRANSACTION_DETAIL(transaction.id))}
                                className="p-4 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    {/* Left Side */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                                            {transaction.amount !== undefined && transaction.amount !== null && (
                                                <h3 className="text-lg sm:text-lg font-semibold text-gray-900">
                                                    {formatCurrency(transaction.amount)}
                                                </h3>
                                            )}
                                            {transaction.mode && (
                                                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                                                    {formatEnumValue(transaction.mode)}
                                                </span>
                                            )}
                                            {!transaction.amount && !transaction.mode && (
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Transaction #{transaction.id}
                                                </h3>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 flex-wrap">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(transaction.created_at)}
                                            </div>
                                            <div className="text-gray-300">•</div>
                                            <div>ID: #{transaction.id}</div>
                                        </div>
                                    </div>

                                    {/* Right Side */}
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2">
                                            <RiskBadge score={transaction.risk_score} />
                                            <DecisionBadge decision={transaction.decision} />
                                        </div>
                                        <ArrowRight className="hidden sm:block w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
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
                                                    {formatEnumValue(factor)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <PaginationControls
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                        hasMore={transactions.length === pageSize}
                    />
                </div>
            )}

            {/* Bulk Upload Modal */}
            <BulkUploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUploadSuccess={handleUploadSuccess}
            />
        </div>
    );
};

export default TransactionList;
