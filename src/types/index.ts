// User types
export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

// Auth types
export interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

export interface SignupResponse {
    message: string;
    id: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
}

// Transaction types
export type TransactionMode = 'UPI' | 'CARD' | 'NETBANKING';
export type TransactionDecision = 'ALLOW' | 'FLAG' | 'BLOCK' | 'MFA_REQUIRED';
export type TriggerFactor = 'AMOUNT_DEVIATION' | 'FREQUENCY_SPIKE' | 'NEW_MODE' | 'TIME_ANOMALY';

export interface Transaction {
    id: number;
    user_id: number;
    amount: number;
    mode: TransactionMode;
    risk_score: number;
    triggered_factors: TriggerFactor[];
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
    id: number;
    decision: TransactionDecision;
    risk_score: number;
    triggered_factors: TriggerFactor[];
}

// Pagination
export interface PaginationParams {
    limit?: number;
    offset?: number;
}

// Bulk Upload types
export interface BulkUploadResponse {
    message: string;
    data: {
        total_rows: number;
        processed_rows: number;
        failed_rows: number;
        errors: string[];
    };
}

export interface LogoutResponse {
    message: string;
}

// Transaction Summary types
export interface TransactionSummary {
    total_transactions: number;
    allowed_transactions: number;
    flagged_transactions: number;
    blocked_transactions: number;
    triggered_factors_breakdown: Record<string, number>;
    recent_daily_activity: Record<string, number>;
}

export interface TransactionSummaryResponse {
    data: TransactionSummary;
}

// Error response
export interface ErrorResponse {
    error: string;
}
