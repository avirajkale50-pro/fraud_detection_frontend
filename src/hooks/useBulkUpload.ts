import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../service/api';

export const useBulkUpload = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file: File) => api.uploadBulkTransactions(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });
};
