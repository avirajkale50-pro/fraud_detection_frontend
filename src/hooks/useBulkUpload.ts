import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../service/api';

/**
 * Hook for uploading bulk transactions via CSV
 * Now returns synchronous response with immediate results
 */
export const useBulkUpload = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => api.uploadBulkTransactions(file),
        onSuccess: () => {
            // Invalidate transactions list when upload completes
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });
};
