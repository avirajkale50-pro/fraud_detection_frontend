import {
    EMAIL_REGEX,
    PASSWORD_MIN_LENGTH,
    PASSWORD_REGEX,
    MAX_TRANSACTION_AMOUNT,
    VALIDATION_MESSAGES,
} from '../constants/validation';

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
