import axios, { type AxiosInstance } from 'axios';
import type {
    SignupRequest,
    AuthResponse,
    CreateTransactionRequest,
    CreateTransactionResponse,
    TransactionListResponse,
    TransactionDetailResponse,
    LogoutResponse,
    User
} from '../types';


const BASE_URL = 'http://localhost:8080';

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add Bearer token to protected routes
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        // Add token to all /api/* routes (protected routes)
        if (token && config.url?.startsWith('/api')) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized - token expired or invalid
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Optionally redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const api = {
    // Auth endpoints
    signup: async (data: SignupRequest): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/signup', data);
        return response.data;
    },

    login: async (email: string, password: string): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/login', {
            email,
            password,
        });
        return response.data;
    },

    // Transaction endpoints
    createTransaction: async (data: CreateTransactionRequest): Promise<CreateTransactionResponse> => {
        const response = await axiosInstance.post<CreateTransactionResponse>('/api/transactions', data);
        return response.data;
    },

    getTransactions: async (): Promise<TransactionListResponse> => {
        const response = await axiosInstance.get<TransactionListResponse>('/api/transactions');
        return response.data;
    },

    getTransaction: async (id: number): Promise<TransactionDetailResponse> => {
        const response = await axiosInstance.get<TransactionDetailResponse>(`/api/transactions/${id}`);
        return response.data;
    },

    logout: async (): Promise<LogoutResponse> => {
        const response = await axiosInstance.post<LogoutResponse>('/api/logout');
        return response.data;
    },
};

// Export User type for backward compatibility
export type { User };
