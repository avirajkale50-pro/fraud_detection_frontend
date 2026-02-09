// Validation regex patterns
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Transaction validation constants
export const MAX_TRANSACTION_AMOUNT = 10 ** 13; // 10 trillion

// Validation messages
export const VALIDATION_MESSAGES = {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_TOO_SHORT: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    PASSWORD_WEAK: 'Password must contain uppercase, lowercase, number, and special character',
    NAME_REQUIRED: 'Name is required',
    AMOUNT_REQUIRED: 'Amount is required',
    AMOUNT_INVALID: 'Amount must be greater than 0',
    AMOUNT_TOO_LARGE: `Amount cannot exceed ${MAX_TRANSACTION_AMOUNT.toLocaleString()}`,
} as const;
