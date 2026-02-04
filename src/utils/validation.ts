// Validation regex patterns
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const MOBILE_REGEX = /^[0-9]{10}$/;

// Validation messages
const VALIDATION_MESSAGES = {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_TOO_SHORT: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    PASSWORD_WEAK: 'Password must contain uppercase, lowercase, number, and special character',
    NAME_REQUIRED: 'Name is required',
    MOBILE_REQUIRED: 'Mobile number is required',
    MOBILE_INVALID: 'Please enter a valid mobile number',
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

export const validateMobile = (mobile: string): ValidationResult => {
    if (!mobile || mobile.trim() === '') {
        return { isValid: false, error: VALIDATION_MESSAGES.MOBILE_REQUIRED };
    }

    if (!MOBILE_REGEX.test(mobile)) {
        return { isValid: false, error: VALIDATION_MESSAGES.MOBILE_INVALID };
    }

    return { isValid: true };
};
