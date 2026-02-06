

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
    SUMMARY: '/summary',
    TRANSACTION_DETAIL: (id: number | string) => `/transactions/${id}`,
} as const;
