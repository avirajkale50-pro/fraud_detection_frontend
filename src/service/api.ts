import axios, { type AxiosInstance } from 'axios';
import type {
    SignupRequest,
    SignupResponse,
    LoginResponse,
    CreateTransactionRequest,
    CreateTransactionResponse,
    Transaction,
    PaginationParams,
    BulkUploadResponse,
    BulkUploadStatusResponse,
    LogoutResponse
} from '../types';


const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

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
    signup: async (data: SignupRequest): Promise<SignupResponse> => {
        const response = await axiosInstance.post<{ data: SignupResponse }>('/signup', data);
        return response.data.data;
    },

    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await axiosInstance.post<{ data: LoginResponse }>('/login', {
            email,
            password,
        });
        return response.data.data;
    },

    // Transaction endpoints
    createTransaction: async (data: CreateTransactionRequest): Promise<CreateTransactionResponse> => {
        const response = await axiosInstance.post<{ data: CreateTransactionResponse }>('/api/transactions', data);
        return response.data.data;
    },

    getTransactions: async (params?: PaginationParams): Promise<Transaction[]> => {
        const response = await axiosInstance.get<{ data: Transaction[] }>('/api/transactions', {
            params: {
                limit: params?.limit,
                offset: params?.offset,
            },
        });
        return response.data.data;
    },

    getTransaction: async (id: number): Promise<Transaction> => {
        const response = await axiosInstance.get<{ data: Transaction }>(`/api/transactions/${id}`);
        return response.data.data;
    },

    // Bulk upload endpoints
    uploadBulkTransactions: async (file: File): Promise<BulkUploadResponse> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axiosInstance.post<{ data: BulkUploadResponse }>(
            '/api/transactions/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data.data;
    },

    getBulkUploadStatus: async (jobId: string): Promise<BulkUploadStatusResponse> => {
        const response = await axiosInstance.get<{ data: BulkUploadStatusResponse }>(
            `/api/transactions/upload/${jobId}/status`
        );
        return response.data.data;
    },

    logout: async (): Promise<LogoutResponse> => {
        const response = await axiosInstance.post<{ data: LogoutResponse }>('/api/logout');
        return response.data.data;
    },
};

