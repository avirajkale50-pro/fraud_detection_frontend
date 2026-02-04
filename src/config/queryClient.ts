import { QueryClient } from '@tanstack/react-query';

// Create a client with default options
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Data is considered fresh for 1 minute
            staleTime: 1000 * 60,
            // Cache data for 5 minutes
            gcTime: 1000 * 60 * 5,
            // Retry failed requests 1 time
            retry: 1,
            // Refetch on window focus for fresh data
            refetchOnWindowFocus: true,
        },
        mutations: {
            // Retry failed mutations 0 times (don't retry by default)
            retry: 0,
        },
    },
});
