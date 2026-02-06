import { useQuery } from '@tanstack/react-query';
import { api } from '../service/api';

export const useTransactionSummary = () => {
    return useQuery({
        queryKey: ['transaction-summary'],
        queryFn: () => api.getTransactionSummary(),
    });
};
