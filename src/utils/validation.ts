// Validation regex patterns
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Transaction validation constants
const MAX_TRANSACTION_AMOUNT = 10 ** 13; // 10 trillion

// Validation messages
const VALIDATION_MESSAGES = {
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

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
    if (!email || email.trim() === '') {
        return { isValid: false, error: VALIDATION_MESSAGES.EMAIL_REQUIRED };
    }

    if (!EMAIL_REGEX.test(email)) {
        return { isValid: false, error: VALIDATION_MESSAGES.EMAIL_INVALID };
    }

    return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
    if (!password || password.trim() === '') {
        return { isValid: false, error: VALIDATION_MESSAGES.PASSWORD_REQUIRED };
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
        return { isValid: false, error: VALIDATION_MESSAGES.PASSWORD_TOO_SHORT };
    }

    if (!PASSWORD_REGEX.test(password)) {
        return { isValid: false, error: VALIDATION_MESSAGES.PASSWORD_WEAK };
    }

    return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
    if (!name || name.trim() === '') {
        return { isValid: false, error: VALIDATION_MESSAGES.NAME_REQUIRED };
    }

    return { isValid: true };
};

export const validateTransactionAmount = (amount: number | string): ValidationResult => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numAmount) || numAmount <= 0) {
        return { isValid: false, error: VALIDATION_MESSAGES.AMOUNT_INVALID };
    }

    if (numAmount > MAX_TRANSACTION_AMOUNT) {
        return { isValid: false, error: VALIDATION_MESSAGES.AMOUNT_TOO_LARGE };
    }

    return { isValid: true };
};
