import { useQuery } from '@tanstack/react-query';
import { api } from '../service/api';
import type { PaginationParams } from '../types';

// hook to fetch all transactions
export const useTransactions = (params?: PaginationParams) => {
    return useQuery({
        queryKey: ['transactions', params?.limit, params?.offset],
        queryFn: () => api.getTransactions(params),
    });
};
