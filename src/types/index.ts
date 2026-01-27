// User types
export interface User {
    id: number;
    name: string;
    email: string;
    mobile: string;
    created_at: string;
    updated_at: string;
}

// Auth types
export interface SignupRequest {
    name: string;
    email: string;
    mobile: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    data: {
        message: string;
        id: number;
        token?: string;
    };
}

export interface UserResponse {
    data: {
        message: string;
        id: number;
        name: string;
        email: string;
        mobile: string;
        created_at: string;
        updated_at: string;
    };
}

// Transaction types
export type TransactionMode = 'UPI' | 'CARD' | 'NET_BANKING' | 'WALLET';
export type TransactionDecision = 'ALLOW' | 'MFA_REQUIRED' | 'BLOCK';
export type RiskFactor = 'AMOUNT_DEVIATION' | 'FREQUENCY_SPIKE' | 'NEW_MODE' | 'TIME_DEVIATION';

export interface Transaction {
    id: number;
    user_id: number;
    amount: number;
    mode: TransactionMode;
    risk_score: number;
    triggered_factors: RiskFactor[];
    decision: TransactionDecision;
    amount_deviation_score?: number;
    frequency_deviation_score?: number;
    mode_deviation_score?: number;
    time_deviation_score?: number;
    created_at: string;
    updated_at: string;
}

export interface CreateTransactionRequest {
    amount: number;
    mode: TransactionMode;
}

export interface CreateTransactionResponse {
    data: {
        txn_id: number;
        decision: TransactionDecision;
        risk_score: number;
        triggered_factors: RiskFactor[];
    };
}

export interface TransactionListResponse {
    data: Transaction[];
}

export interface TransactionDetailResponse {
    data: Transaction;
}

export interface LogoutResponse {
    data: {
        message: string;
    };
}
