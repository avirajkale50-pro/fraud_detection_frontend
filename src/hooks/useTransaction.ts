import { useQuery } from '@tanstack/react-query';
import { api } from '../service/api';
//to fetch transaction by id
export const useTransaction = (id?: number) => {
    return useQuery({
        queryKey: ['transaction', id],
        queryFn: () => api.getTransaction(id!),
        enabled: !!id, 
    });
};
