

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
    TRANSACTION_DETAIL: (id: number | string) => `/transactions/${id}`,
} as const;
