import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../service/api';
import type { CreateTransactionRequest } from '../types';

/**
 * Custom hook to create a new transaction
 * Automatically invalidates the transactions list on success
 */
export const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTransactionRequest) => api.createTransaction(data),
        onSuccess: () => {
            // Invalidate and refetch transactions list
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });
};
