import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../service/api';
import type { CreateTransactionRequest } from '../types';

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTransactionRequest) => api.createTransaction(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });
};
