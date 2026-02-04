/**
 * Application route constants
 * Centralized route definitions to prevent hardcoded strings
 */

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
    /**
     * Generate transaction detail route
     * @param id - Transaction ID
     */
    TRANSACTION_DETAIL: (id: number | string) => `/transactions/${id}`,
} as const;
