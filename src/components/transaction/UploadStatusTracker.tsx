import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Loader2, Clock } from 'lucide-react';
import { useUploadStatus } from '../../hooks/useBulkUpload';
import { useQueryClient } from '@tanstack/react-query';
import type { JobStatus } from '../../types';

interface UploadStatusTrackerProps {
    jobId: string;
    onComplete?: () => void;
    onClose: () => void;
}

const UploadStatusTracker: React.FC<UploadStatusTrackerProps> = ({ jobId, onComplete, onClose }) => {
    const { data: status, isLoading } = useUploadStatus(jobId, true);
    const queryClient = useQueryClient();

    // Handle completion
    useEffect(() => {
        if (status?.status === 'COMPLETED') {
            // Invalidate transactions to refresh the list
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            onComplete?.();
        }
    }, [status?.status, queryClient, onComplete]);

    const getStatusIcon = (jobStatus?: JobStatus) => {
        switch (jobStatus) {
            case 'PENDING':
                return <Clock className="w-6 h-6 text-gray-500" />;
            case 'PROCESSING':
                return <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />;
            case 'COMPLETED':
                return <CheckCircle className="w-6 h-6 text-green-600" />;
            case 'FAILED':
                return <XCircle className="w-6 h-6 text-red-600" />;
            default:
                return <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />;
        }
    };

    const getStatusText = (jobStatus?: JobStatus) => {
        switch (jobStatus) {
            case 'PENDING':
                return 'Queued for processing...';
            case 'PROCESSING':
                return 'Processing transactions...';
            case 'COMPLETED':
                return 'Upload completed successfully!';
            case 'FAILED':
                return 'Upload failed';
            default:
                return 'Loading status...';
        }
    };

    const getStatusColor = (jobStatus?: JobStatus) => {
        switch (jobStatus) {
            case 'PENDING':
                return 'bg-gray-50 border-gray-200';
            case 'PROCESSING':
                return 'bg-blue-50 border-blue-200';
            case 'COMPLETED':
                return 'bg-green-50 border-green-200';
            case 'FAILED':
                return 'bg-red-50 border-red-200';
            default:
                return 'bg-gray-50 border-gray-200';
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                    <p className="text-sm text-gray-600">Loading upload status...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`rounded-xl border p-6 ${getStatusColor(status?.status)}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {getStatusIcon(status?.status)}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            {getStatusText(status?.status)}
                        </h3>
                        <p className="text-xs text-gray-500">Job ID: {jobId}</p>
                    </div>
                </div>
                {(status?.status === 'COMPLETED' || status?.status === 'FAILED') && (
                    <button
                        onClick={onClose}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Dismiss
                    </button>
                )}
            </div>

            {/* Progress Bar */}
            {status?.progress && (
                <div className="space-y-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-300 ${status.status === 'COMPLETED'
                                    ? 'bg-green-600'
                                    : status.status === 'FAILED'
                                        ? 'bg-red-600'
                                        : 'bg-blue-600'
                                }`}
                            style={{ width: `${status.progress.percent}%` }}
                        />
                    </div>

                    {/* Progress Stats */}
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                            <p className="text-xs text-gray-500">Total</p>
                            <p className="text-sm font-semibold text-gray-900">{status.progress.total}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Processed</p>
                            <p className="text-sm font-semibold text-gray-900">{status.progress.processed}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Success</p>
                            <p className="text-sm font-semibold text-green-600">{status.progress.success}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Failed</p>
                            <p className="text-sm font-semibold text-red-600">{status.progress.failed}</p>
                        </div>
                    </div>

                    {/* Percentage */}
                    <p className="text-center text-sm font-medium text-gray-700">
                        {status.progress.percent.toFixed(1)}% Complete
                    </p>
                </div>
            )}
        </div>
    );
};

export default UploadStatusTracker;
