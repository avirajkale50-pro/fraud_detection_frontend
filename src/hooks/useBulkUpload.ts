import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../service/api';

/**
 * Hook for uploading bulk transactions via CSV
 */
export const useBulkUpload = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => api.uploadBulkTransactions(file),
        onSuccess: () => {
            // Invalidate transactions list when upload completes
            // Note: We'll invalidate again when the job actually completes
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });
};

/**
 * Hook for tracking bulk upload status
 * Polls the status endpoint every 2 seconds while processing
 */
export const useUploadStatus = (jobId: string | null, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['upload-status', jobId],
        queryFn: () => api.getBulkUploadStatus(jobId!),
        enabled: enabled && !!jobId,
        refetchInterval: (query) => {
            const status = query.state.data?.status;
            // Poll every 2 seconds while PENDING or PROCESSING
            if (status === 'PENDING' || status === 'PROCESSING') {
                return 2000;
            }
            // Stop polling when COMPLETED or FAILED
            return false;
        },
    });
};
